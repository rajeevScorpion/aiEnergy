import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@/lib/supabase/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface SuggestPromptResponse {
  improved: string;
  tips: { label: string; example: string }[];
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { prompt, flags } = await req.json();
  if (!prompt) return NextResponse.json({ error: "prompt required" }, { status: 400 });

  const missing: string[] = [];
  if (!flags?.has_intent) missing.push("a clear action verb (create, generate, design, write)");
  if (!flags?.has_context) missing.push("context (for whom, about what, or where)");
  if (!flags?.has_style) missing.push("style preference (minimal, realistic, cinematic, etc.)");
  if (!flags?.has_constraints) missing.push("constraints (length, format, audience, color, etc.)");
  if (!flags?.has_output_spec) missing.push("output type (poster, image, story, list, etc.)");

  const systemPrompt = `You are a prompt engineering coach. Given a user's prompt,
rewrite it as a better, more specific prompt, then provide short framework tips.

Missing elements in the original: ${missing.length > 0 ? missing.join("; ") : "none — prompt is already solid"}.

Respond in this exact JSON format:
{
  "improved": "<rewritten prompt that naturally incorporates missing elements>",
  "tips": [
    { "label": "Act As", "example": "<one-line example for this prompt>" },
    { "label": "Context", "example": "<one-line example for this prompt>" },
    { "label": "Specificity", "example": "<one-line example for this prompt>" },
    { "label": "Output Format", "example": "<one-line example for this prompt>" },
    { "label": "Style / Tone", "example": "<one-line example for this prompt>" }
  ]
}

Keep the improved prompt under 80 words. Keep each tip example under 15 words. Be concrete, not generic.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
    ],
    response_format: { type: "json_object" },
    max_tokens: 400,
  });

  try {
    const result = JSON.parse(completion.choices[0].message.content ?? "{}");
    return NextResponse.json(result as SuggestPromptResponse);
  } catch {
    return NextResponse.json({ error: "Failed to parse suggestion" }, { status: 500 });
  }
}
