import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const today = new Date().toISOString().split("T")[0];

  const { data: allThreads } = await supabase
    .from("threads")
    .select("total_energy")
    .eq("user_id", user.id);

  // RLS already scopes messages to the authenticated user's threads
  const { data: todayMessages } = await supabase
    .from("messages")
    .select("energy_used")
    .eq("role", "assistant")
    .gte("created_at", `${today}T00:00:00.000Z`);

  const totalEnergy = allThreads?.reduce((sum, t) => sum + (t.total_energy || 0), 0) || 0;
  const todayEnergy = todayMessages?.reduce((sum, m) => sum + (m.energy_used || 0), 0) || 0;

  return NextResponse.json({ totalEnergy, todayEnergy });
}
