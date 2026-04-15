"use client";

import React, { useState } from "react";
import { Copy, ThumbsUp, ThumbsDown, RotateCcw, Check, CheckCircle2, AlertCircle, Loader2, X, Sparkles, ClipboardCopy, MessageSquarePlus, RefreshCw } from "lucide-react";
import { Message } from "@/types";
import { EnergyLabel } from "./energy-label";
import { cn } from "@/lib/utils";

const CHAT_MODE = process.env.NEXT_PUBLIC_CHAT_MODE ?? "AWARENESS";

interface Suggestion {
  improved: string;
  tips: { label: string; example: string }[];
}

const FRAMEWORK_LABELS = ["Act As", "Context", "Specificity", "Output Format", "Style / Tone"] as const;

function PromptQualityBadge({
  score,
  rawPrompt,
  validationFlags,
  onUseInChat,
}: {
  score: number;
  rawPrompt: string;
  validationFlags: Message["validation_flags"];
  onUseInChat?: (prompt: string) => void;
}) {
  if (CHAT_MODE !== "GUIDED") return null;

  const good = score >= 0.7;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  // Editable state
  const [editedPrompt, setEditedPrompt] = useState("");
  const [frameworkInputs, setFrameworkInputs] = useState<Record<string, string>>({});
  const [validating, setValidating] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleOpen() {
    setOpen(true);
    if (suggestion) return;
    setLoading(true);
    try {
      const res = await fetch("/api/suggest-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: rawPrompt, flags: validationFlags }),
      });
      if (res.ok) {
        const data: Suggestion = await res.json();
        setSuggestion(data);
        setEditedPrompt(data.improved);
      }
    } finally {
      setLoading(false);
    }
  }


  function buildFinalPrompt(): string {
    const extras = FRAMEWORK_LABELS
      .map((label) => frameworkInputs[label]?.trim())
      .filter(Boolean);
    if (extras.length === 0) return editedPrompt.trim();
    return `${editedPrompt.trim()}\n\n${extras.join(". ")}.`;
  }

  async function handleValidate() {
    const combined = buildFinalPrompt();
    if (!combined) return;
    setValidating(true);
    try {
      const res = await fetch("/api/suggest-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: combined, flags: null }),
      });
      if (res.ok) {
        const data: Suggestion = await res.json();
        setSuggestion(data);
        setEditedPrompt(data.improved);
        setFrameworkInputs({});
      }
    } finally {
      setValidating(false);
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(buildFinalPrompt());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleUseInChat() {
    onUseInChat?.(buildFinalPrompt());
    setOpen(false);
  }

  return (
    <>
      <button
        onClick={handleOpen}
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
                  {/* Editable improved prompt with inline copy */}
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Improved Version</p>
                    <div className="relative">
                      <textarea
                        value={editedPrompt}
                        onChange={(e) => setEditedPrompt(e.target.value)}
                        rows={4}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-9 text-sm text-gray-800 leading-relaxed resize-none outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-200 transition-colors"
                      />
                      <button
                        onClick={handleCopy}
                        className="absolute top-2.5 right-2.5 p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Copy prompt"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <ClipboardCopy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Framework inputs — tip examples as placeholders */}
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Refine with Framework</p>
                    <div className="grid grid-cols-[6rem_1fr] gap-x-2 gap-y-2 items-center">
                      {suggestion.tips.map((tip) => (
                        <React.Fragment key={tip.label}>
                          <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-1 rounded-full text-left whitespace-nowrap">
                            {tip.label}
                          </span>
                          <input
                            type="text"
                            placeholder={tip.example}
                            value={frameworkInputs[tip.label] ?? ""}
                            onChange={(e) => setFrameworkInputs((prev) => ({ ...prev, [tip.label]: e.target.value }))}
                            className="w-full text-xs border border-gray-200 rounded-lg px-3 py-1.5 outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-200 transition-colors placeholder-gray-400"
                          />
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Validate button */}
                  <button
                    onClick={handleValidate}
                    disabled={validating}
                    className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white text-sm font-medium py-2 rounded-lg transition-colors"
                  >
                    {validating ? (
                      <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Validating…</>
                    ) : (
                      <><RefreshCw className="w-3.5 h-3.5" /> Validate & Improve</>
                    )}
                  </button>

                  {/* Score + Use in Chat */}
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "text-xs px-3 py-2 rounded-lg flex-1",
                      good ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
                    )}>
                      Quality: <span className="font-semibold">{Math.round(score * 100)}%</span>
                    </div>
                    <button
                      onClick={handleUseInChat}
                      className="flex items-center gap-1.5 bg-black hover:bg-gray-800 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors"
                    >
                      <MessageSquarePlus className="w-3.5 h-3.5" /> Use in Chat
                    </button>
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
  userInitials?: string;
  onRetry?: () => void;
  onUseInChat?: (prompt: string) => void;
}

export function MessageBubble({ message, userInitials, onRetry, onUseInChat }: MessageBubbleProps) {
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
        <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center mt-0.5">
          <span className="text-gray-500 text-xs font-bold">AI</span>
        </div>
      )}

      <div className={cn("max-w-[85%] md:max-w-[75%] flex flex-col gap-1.5", isUser && "items-end")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
            isUser
              ? "bg-gray-200 text-gray-800 rounded-br-sm"
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
            onUseInChat={onUseInChat}
          />
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center mt-0.5">
          <span className="text-gray-600 text-xs font-semibold">{userInitials || "You"}</span>
        </div>
      )}
    </div>
  );
}
