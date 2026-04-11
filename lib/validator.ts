export interface ValidationFlags {
  has_intent: boolean;
  has_context: boolean;
  has_style: boolean;
  has_constraints: boolean;
  has_output_spec: boolean;
}

export interface ValidationResult {
  flags: ValidationFlags;
  score: number; // 0–1
}

// ── Rule sets ──────────────────────────────────────────────────

const INTENT_VERBS = [
  "create", "generate", "design", "write", "make", "build",
  "draw", "produce", "compose", "draft", "develop", "illustrate",
];

const OUTPUT_WORDS = [
  "poster", "image", "photo", "picture", "story", "list",
  "essay", "article", "report", "logo", "banner", "flyer",
  "caption", "description", "summary", "email", "blog",
];

const STYLE_WORDS = [
  "minimal", "minimalist", "modern", "realistic", "cartoon",
  "cinematic", "vintage", "retro", "flat", "bold", "elegant",
  "dark", "light", "colorful", "monochrome", "abstract",
  "professional", "playful", "serious", "casual", "formal",
];

const CONSTRAINT_WORDS = [
  "size", "audience", "color", "format", "resolution",
  "dimension", "width", "height", "words", "characters",
  "length", "limit", "max", "minimum", "tone", "language",
  "age", "budget",
];

const CONTEXT_CONNECTORS = ["for", "about", "regarding", "concerning", "related to"];

const CONTEXT_MIN_WORDS = 12;

// ── Core validator ─────────────────────────────────────────────

export function validatePrompt(prompt: string): ValidationResult {
  const lower = prompt.toLowerCase();
  const words = lower.split(/\s+/).filter(Boolean);

  const has_intent = INTENT_VERBS.some((v) => words.includes(v));

  const has_output_spec = OUTPUT_WORDS.some((w) => lower.includes(w));

  const has_context =
    words.length >= CONTEXT_MIN_WORDS ||
    CONTEXT_CONNECTORS.some((c) => lower.includes(c));

  const has_style = STYLE_WORDS.some((w) => lower.includes(w));

  const has_constraints = CONSTRAINT_WORDS.some((w) => lower.includes(w));

  const flags: ValidationFlags = {
    has_intent,
    has_context,
    has_style,
    has_constraints,
    has_output_spec,
  };

  const score = Object.values(flags).filter(Boolean).length / 5;

  return { flags, score };
}

// ── Guided prompt enhancer ────────────────────────────────────
// Only called when CHAT_MODE=GUIDED + ENABLE_PROMPT_ENHANCEMENT=true

export function enhancePrompt(raw: string, flags: ValidationFlags): string {
  const lines: string[] = [raw, ""];
  lines.push("Please ensure your response:");
  lines.push(
    flags.has_output_spec
      ? "- Delivers the requested output format"
      : "- Provides a clear, structured output"
  );
  lines.push(
    flags.has_style
      ? "- Applies the style preferences mentioned"
      : "- Uses a clean, professional style"
  );
  lines.push(
    flags.has_constraints
      ? "- Respects all specified constraints"
      : "- Keeps the response concise and focused"
  );
  lines.push(
    flags.has_context
      ? "- Uses the provided context"
      : "- Applies reasonable general context"
  );
  return lines.join("\n");
}
