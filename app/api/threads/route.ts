import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("threads")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Accept optional mode and task_id in request body
  let mode: "AWARENESS" | "GUIDED" = "AWARENESS";
  let task_id: string | null = null;

  try {
    const body = await req.json();
    if (body?.mode === "GUIDED") mode = "GUIDED";
    if (body?.task_id) task_id = body.task_id;
  } catch {
    // No body or invalid JSON — use defaults
  }

  const { data, error } = await supabase
    .from("threads")
    .insert({ user_id: user.id, title: "New Chat", total_energy: 0, mode, task_id })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
