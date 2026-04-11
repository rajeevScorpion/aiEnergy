import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Get or create a thread to redirect to
  const { data: threads } = await supabase
    .from("threads")
    .select("id")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1);

  if (threads && threads.length > 0) {
    redirect(`/chat/${threads[0].id}`);
  }

  // Create new thread
  const { data: newThread } = await supabase
    .from("threads")
    .insert({ user_id: user.id, title: "New Chat", total_energy: 0 })
    .select()
    .single();

  if (newThread) redirect(`/chat/${newThread.id}`);

  redirect("/login");
}
