"use client";

import { useState } from "react";
import { Copy, ThumbsUp, ThumbsDown, RotateCcw, Check, CheckCircle2, AlertCircle, Loader2, X, Sparkles } from "lucide-react";
import { Message } from "@/types";
import { EnergyLabel } from "./energy-label";
import { cn } from "@/lib/utils";

const CHAT_MODE = process.env.NEXT_PUBLIC_CHAT_MODE ?? "AWARENESS";

interface Suggestion {
  improved: string;
  tips: { label: string; example: string }[];
}

function PromptQualityBadge({
  score,
  rawPrompt,
  validationFlags,
}: {
  score: number;
  rawPrompt: string;
  validationFlags: Message["validation_flags"];
}) {
  if (CHAT_MODE !== "GUIDED") return null;

  const good = score >= 0.7;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const hoverTimer = useState<ReturnType<typeof setTimeout> | null>(null);

  async function handleOpen() {
    setOpen(true);
    if (suggestion) return; // already fetched
    setLoading(true);
    try {
      const res = await fetch("/api/suggest-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: rawPrompt, flags: validationFlags }),
      });
      if (res.ok) setSuggestion(await res.json());
    } finally {
      setLoading(false);
    }
  }

  function handleMouseEnter() {
    hoverTimer[1](setTimeout(handleOpen, 600));
  }

  function handleMouseLeave() {
    if (hoverTimer[0]) {
      clearTimeout(hoverTimer[0]);
      hoverTimer[1](null);
    }
  }

  return (
    <>
      <button
        onClick={handleOpen}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        title={`Prompt quality: ${Math.round(score * 100)}%`}
        className={cn(
          "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full cursor-pointer transition-colors",
          good
            ? "bg-green-50 text-green-700 hover:bg-green-100"
            : "bg-amber-50 text-amber-700 hover:bg-amber-100"
        )}
      >
        {good ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
        {good ? "Good prompt" : "Could be clearer"}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setOpen(false)}>
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h2 className="text-sm font-semibold text-gray-900">Prompt Suggestion</h2>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-5 py-4 space-y-4">
              {loading ? (
                <div className="flex items-center justify-center py-8 gap-2 text-sm text-gray-500">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating suggestion…
                </div>
              ) : suggestion ? (
                <>
                  {/* Improved prompt */}
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Improved Version</p>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 leading-relaxed">
                      {suggestion.improved}
                    </div>
                  </div>

                  {/* Framework tips */}
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Prompt Framework</p>
                    <div className="space-y-2">
                      {suggestion.tips.map((tip) => (
                        <div key={tip.label} className="flex gap-3 items-start">
                          <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full whitespace-nowrap mt-0.5">
                            {tip.label}
                          </span>
                          <span className="text-xs text-gray-600 leading-relaxed">{tip.example}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Score */}
                  <div className={cn(
                    "text-xs text-center px-3 py-2 rounded-lg",
                    good ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
                  )}>
                    Quality score: <span className="font-semibold">{Math.round(score * 100)}%</span>
                    {!good && " — adding the missing elements above would improve this"}
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-500 text-center py-6">Could not load suggestion.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

interface MessageBubbleProps {
  message: Message;
  onRetry?: () => void;
}

export function MessageBubble({ message, onRetry }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState<"up" | "down" | null>(null);

  const isUser = message.role === "user";

  async function handleCopy() {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={cn("flex gap-3 px-3 py-2 md:px-4 md:py-3 group", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-black flex-shrink-0 flex items-center justify-center mt-0.5">
          <span className="text-white text-xs font-bold">AI</span>
        </div>
      )}

      <div className={cn("max-w-[85%] md:max-w-[75%] flex flex-col gap-1.5", isUser && "items-end")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
            isUser
              ? "bg-black text-white rounded-br-sm"
              : "bg-gray-100 text-gray-900 rounded-bl-sm"
          )}
        >
          {message.content}
        </div>

        {!isUser && (
          <div className="flex items-center gap-1">
            {message.energy_used != null && message.energy_used > 0 && (
              <EnergyLabel energyUsed={message.energy_used} />
            )}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleCopy}
                className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                title="Copy"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setLiked(liked === "up" ? null : "up")}
                className={cn(
                  "p-1 rounded hover:bg-gray-100 transition-colors",
                  liked === "up" ? "text-green-600" : "text-gray-400 hover:text-gray-600"
                )}
                title="Good response"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setLiked(liked === "down" ? null : "down")}
                className={cn(
                  "p-1 rounded hover:bg-gray-100 transition-colors",
                  liked === "down" ? "text-red-500" : "text-gray-400 hover:text-gray-600"
                )}
                title="Bad response"
              >
                <ThumbsDown className="w-3.5 h-3.5" />
              </button>
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Retry"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {isUser && message.prompt_quality_score != null && (
          <PromptQualityBadge
            score={message.prompt_quality_score}
            rawPrompt={message.raw_prompt ?? message.content}
            validationFlags={message.validation_flags}
          />
        )}
      </div>

      {isUser && (
        <div className="w-7 h-7 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center mt-0.5">
          <span className="text-gray-600 text-xs font-bold">You</span>
        </div>
      )}
    </div>
  );
}
