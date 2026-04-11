export interface Thread {
  id: string;
  user_id: string;
  title: string;
  total_energy: number;
  created_at: string;

  // Session extensions
  mode: "AWARENESS" | "GUIDED";
  task_id: string | null;
  end_time: string | null;
  total_prompts: number;
  total_tokens_in: number;
  total_tokens_out: number;
  avg_energy_per_prompt: number;
}

export interface Message {
  id: string;
  thread_id: string;
  role: "user" | "assistant";
  content: string;
  energy_used: number | null;
  tokens_used: number | null;
  created_at: string;

  // Interaction extensions
  raw_prompt: string | null;
  enhanced_prompt: string | null;
  tokens_in: number | null;
  tokens_out: number | null;
  prompt_quality_score: number | null;
  validation_flags: {
    has_intent: boolean;
    has_context: boolean;
    has_style: boolean;
    has_constraints: boolean;
    has_output_spec: boolean;
  } | null;
}
