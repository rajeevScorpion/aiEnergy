export interface Thread {
  id: string;
  user_id: string;
  title: string;
  total_energy: number;
  created_at: string;
}

export interface Message {
  id: string;
  thread_id: string;
  role: "user" | "assistant";
  content: string;
  energy_used: number | null;
  tokens_used: number | null;
  created_at: string;
}
