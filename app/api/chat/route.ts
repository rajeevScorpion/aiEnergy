import { NextRequest } from "next/server";
import OpenAI from "openai";
import { tavily } from "@tavily/core";
import { createClient } from "@/lib/supabase/server";
import { calculateEnergy, config } from "@/lib/config";
import { validatePrompt, enhancePrompt } from "@/lib/validator";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const webSearchEnabled =
  process.env.ENABLE_WEB_SEARCH === "true" && !!process.env.TAVILY_API_KEY;

const tavilyClient = webSearchEnabled
  ? tavily({ apiKey: process.env.TAVILY_API_KEY! })
  : null;

// Tool definition passed to OpenAI
const searchTool: OpenAI.Chat.ChatCompletionTool = {
  type: "function",
  function: {
    name: "web_search",
    description:
      "Search the internet for current information, news, prices, events, or anything that may have changed recently.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "The search query" },
      },
      required: ["query"],
    },
  },
};

async function runSearch(query: string): Promise<string> {
  if (!tavilyClient) return "Search unavailable.";
  const result = await tavilyClient.search(query, {
    maxResults: 5,
    searchDepth: "basic",
  });
  return result.results
    .map((r, i) => `[${i + 1}] ${r.title}\n${r.url}\n${r.content}`)
    .join("\n\n");
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const { threadId, messages } = await req.json();
  const userMessage = messages[messages.length - 1];
  const rawPrompt: string = userMessage.content;

  // ── Fetch thread to get mode ─────────────────────────────────
  const { data: thread } = await supabase
    .from("threads")
    .select("total_energy, title, mode, total_prompts, total_tokens_in, total_tokens_out")
    .eq("id", threadId)
    .single();

  const threadMode: "AWARENESS" | "GUIDED" = thread?.mode ?? "AWARENESS";

  // ── Prompt validation (rule-based) ───────────────────────────
  let qualityScore: number | null = null;
  let validationFlags = null;
  let promptToSend = rawPrompt;
  let enhancedPrompt: string | null = null;

  if (config.enablePromptValidation) {
    const validation = validatePrompt(rawPrompt);
    qualityScore = validation.score;
    validationFlags = validation.flags;

    // ── Guided enhancement ───────────────────────────────────
    if (threadMode === "GUIDED" && config.enablePromptEnhancement) {
      enhancedPrompt = enhancePrompt(rawPrompt, validation.flags);
      promptToSend = enhancedPrompt;
    }
  }

  // ── Save user message (with validation metadata) ─────────────
  await supabase.from("messages").insert({
    thread_id: threadId,
    role: "user",
    content: rawPrompt,
    energy_used: null,
    tokens_used: null,
    raw_prompt: rawPrompt,
    enhanced_prompt: enhancedPrompt,
    prompt_quality_score: qualityScore,
    validation_flags: validationFlags,
  });

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      const send = (data: object) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));

      try {
        // Build OpenAI messages, substituting enhanced prompt for last user turn
        let openaiMessages: OpenAI.Chat.ChatCompletionMessageParam[] = messages.map(
          (m: { role: string; content: string }, idx: number) => ({
            role: m.role as "user" | "assistant",
            // Use enhanced prompt for the last message only
            content:
              idx === messages.length - 1 ? promptToSend : m.content,
          })
        );

        // ── Step 1: Check if the model wants to search ───────────
        if (webSearchEnabled) {
          const probe = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: openaiMessages,
            tools: [searchTool],
            tool_choice: "auto",
          });

          const probeChoice = probe.choices[0];

          if (probeChoice.finish_reason === "tool_calls") {
            const toolCall = probeChoice.message.tool_calls![0];
            const { query } = JSON.parse(toolCall.function.arguments);

            send({ type: "searching", query });

            const searchResults = await runSearch(query);

            openaiMessages = [
              ...openaiMessages,
              probeChoice.message,
              {
                role: "tool",
                tool_call_id: toolCall.id,
                content: searchResults,
              },
            ];
          }
        }

        // ── Step 2: Stream the final answer ──────────────────────
        const stream = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          stream: true,
          stream_options: { include_usage: true },
          messages: openaiMessages,
        });

        let fullContent = "";
        let tokensIn = 0;
        let tokensOut = 0;

        for await (const chunk of stream) {
          const delta = chunk.choices[0]?.delta?.content ?? "";
          if (delta) {
            fullContent += delta;
            send({ type: "delta", content: delta });
          }
          if (chunk.usage) {
            tokensIn = chunk.usage.prompt_tokens ?? 0;
            tokensOut = chunk.usage.completion_tokens ?? 0;
          }
        }

        const tokensUsed = tokensIn + tokensOut;
        const energyUsed = calculateEnergy(tokensUsed);

        // ── Save assistant message ────────────────────────────────
        const { data: savedMsg } = await supabase
          .from("messages")
          .insert({
            thread_id: threadId,
            role: "assistant",
            content: fullContent,
            energy_used: energyUsed,
            tokens_used: tokensUsed,
            tokens_in: tokensIn,
            tokens_out: tokensOut,
          })
          .select()
          .single();

        // ── Update thread (session) ───────────────────────────────
        const prevTotal = thread?.total_energy ?? 0;
        const prevPrompts = thread?.total_prompts ?? 0;
        const prevTokensIn = thread?.total_tokens_in ?? 0;
        const prevTokensOut = thread?.total_tokens_out ?? 0;

        const newTotalEnergy = prevTotal + energyUsed;
        const newTotalPrompts = prevPrompts + 1;
        const newTotalTokensIn = prevTokensIn + tokensIn;
        const newTotalTokensOut = prevTokensOut + tokensOut;
        const newAvgEnergy = newTotalEnergy / newTotalPrompts;

        const updatePayload: Record<string, unknown> = {
          total_energy: newTotalEnergy,
          ...(config.enableSessionTracking && {
            total_prompts: newTotalPrompts,
            total_tokens_in: newTotalTokensIn,
            total_tokens_out: newTotalTokensOut,
            avg_energy_per_prompt: newAvgEnergy,
          }),
        };

        if (thread?.title === "New Chat") {
          updatePayload.title = rawPrompt.slice(0, 60);
        }

        await supabase.from("threads").update(updatePayload).eq("id", threadId);

        send({
          type: "done",
          message: savedMsg,
          energyUsed,
          tokensUsed,
          tokensIn,
          tokensOut,
          promptQualityScore: qualityScore,
          validationFlags,
        });
      } catch (err) {
        console.error("Stream error:", err);
        send({ type: "error", error: "Stream failed" });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
