"use client";

import { useState } from "react";
import { Copy, ThumbsUp, ThumbsDown, RotateCcw, Check } from "lucide-react";
import { Message } from "@/types";
import { EnergyLabel } from "./energy-label";
import { cn } from "@/lib/utils";

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
            {message.energy_used != null && message.energy_used > 0 && (
              <EnergyLabel energyUsed={message.energy_used} />
            )}
          </div>
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
