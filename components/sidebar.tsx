"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { Plus, Zap, BarChart2, LogOut, MessageSquare, X, BatteryMedium } from "lucide-react";
import { Thread } from "@/types";
import { createClient } from "@/lib/supabase/client";
import { config, formatEnergy } from "@/lib/config";
import { cn } from "@/lib/utils";
import { EnergyDashboard } from "./energy-dashboard";

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const router = useRouter();
  const params = useParams();
  const currentThreadId = params?.threadId as string;

  const [threads, setThreads] = useState<Thread[]>([]);
  const [showDashboard, setShowDashboard] = useState(false);

  const loadThreads = useCallback(async () => {
    const res = await fetch("/api/threads");
    if (res.ok) {
      const data = await res.json();
      setThreads(data);
    }
  }, []);

  useEffect(() => {
    loadThreads();
  }, [loadThreads, currentThreadId]);

  async function createThread() {
    const res = await fetch("/api/threads", { method: "POST" });
    if (res.ok) {
      const thread = await res.json();
      router.push(`/chat/${thread.id}`);
      onClose?.();
    }
  }

  function navigate(id: string) {
    router.push(`/chat/${id}`);
    onClose?.();
  }

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-400 rounded-lg p-1.5">
              <Zap className="w-4 h-4 text-gray-900" />
            </div>
            <span className="font-semibold text-sm">AI Energy Chat</span>
          </div>
          {/* Close button — mobile only */}
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-1 rounded hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          onClick={createThread}
          className="w-full flex items-center gap-2 bg-gray-800 hover:bg-gray-700 rounded-lg px-3 py-2 text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Chat
        </button>
      </div>

      {/* Thread list */}
      <div className="flex-1 overflow-y-auto py-2">
        {threads.length === 0 ? (
          <p className="text-gray-500 text-xs px-4 py-2">No conversations yet</p>
        ) : (
          threads.map((thread) => (
            <ThreadItem
              key={thread.id}
              thread={thread}
              isActive={thread.id === currentThreadId}
              onClick={() => navigate(thread.id)}
            />
          ))
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-700 p-2 space-y-1">
        {config.showEnergyDashboard && (
          <button
            onClick={() => setShowDashboard(true)}
            className="w-full flex items-center gap-2 hover:bg-gray-800 rounded-lg px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <BarChart2 className="w-4 h-4" />
            Energy Usage
          </button>
        )}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2 hover:bg-gray-800 rounded-lg px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>

      {showDashboard && <EnergyDashboard onClose={() => setShowDashboard(false)} />}
    </aside>
  );
}

function ThreadItem({
  thread,
  isActive,
  onClick,
}: {
  thread: Thread;
  isActive: boolean;
  onClick: () => void;
}) {
  const [hovering, setHovering] = useState(false);
  const hasEnergy = config.showEnergyThread && thread.total_energy > 0;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={cn(
        "w-full text-left px-4 py-2.5 text-sm transition-colors relative",
        isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
      )}
    >
      <div className="flex items-center gap-2">
        <MessageSquare className="w-3.5 h-3.5 flex-shrink-0 opacity-60" />
        <span className="truncate flex-1">{thread.title || "New Chat"}</span>
        {hasEnergy && (
          <Zap className={cn(
            "w-3 h-3 flex-shrink-0 transition-colors",
            hovering ? "text-amber-400" : "text-gray-600"
          )} />
        )}
      </div>

      {hovering && hasEnergy && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-900 border border-gray-600 rounded px-2 py-1 text-xs text-amber-400 whitespace-nowrap z-10">
          {formatEnergy(thread.total_energy, "numeric")}
        </div>
      )}
    </button>
  );
}
