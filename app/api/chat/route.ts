import { NextRequest } from "next/server";
import OpenAI from "openai";
import { tavily } from "@tavily/core";
import { createClient } from "@/lib/supabase/server";
import { calculateEnergy } from "@/lib/config";

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
  // Format results into a compact context block
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

  // Save user message
  const userMessage = messages[messages.length - 1];
  await supabase.from("messages").insert({
    thread_id: threadId,
    role: "user",
    content: userMessage.content,
    energy_used: null,
    tokens_used: null,
  });

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      const send = (data: object) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));

      try {
        let openaiMessages: OpenAI.Chat.ChatCompletionMessageParam[] = messages.map(
          (m: { role: string; content: string }) => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          })
        );

        // ── Step 1: Check if the model wants to search ──────────────────
        if (webSearchEnabled) {
          const probe = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: openaiMessages,
            tools: [searchTool],
            tool_choice: "auto",
            // No streaming here — we need to inspect the full response
          });

          const probeChoice = probe.choices[0];

          if (probeChoice.finish_reason === "tool_calls") {
            const toolCall = probeChoice.message.tool_calls![0];
            const { query } = JSON.parse(toolCall.function.arguments);

            // Let the client know a search is running
            send({ type: "searching", query });

            const searchResults = await runSearch(query);

            // Append tool call + result to the message history
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
          // If no tool call, fall through and stream normally
        }

        // ── Step 2: Stream the final answer ─────────────────────────────
        const stream = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          stream: true,
          stream_options: { include_usage: true },
          messages: openaiMessages,
        });

        let fullContent = "";
        let tokensUsed = 0;

        for await (const chunk of stream) {
          const delta = chunk.choices[0]?.delta?.content ?? "";
          if (delta) {
            fullContent += delta;
            send({ type: "delta", content: delta });
          }
          if (chunk.usage) {
            tokensUsed = chunk.usage.total_tokens;
          }
        }

        const energyUsed = calculateEnergy(tokensUsed);

        // Save assistant message
        const { data: savedMsg } = await supabase
          .from("messages")
          .insert({
            thread_id: threadId,
            role: "assistant",
            content: fullContent,
            energy_used: energyUsed,
            tokens_used: tokensUsed,
          })
          .select()
          .single();

        // Update thread
        const { data: thread } = await supabase
          .from("threads")
          .select("total_energy, title")
          .eq("id", threadId)
          .single();

        const newTotal = (thread?.total_energy || 0) + energyUsed;
        const updatePayload: Record<string, unknown> = { total_energy: newTotal };
        if (thread?.title === "New Chat") {
          updatePayload.title = userMessage.content.slice(0, 60);
        }
        await supabase.from("threads").update(updatePayload).eq("id", threadId);

        send({ type: "done", message: savedMsg, energyUsed, tokensUsed });
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
