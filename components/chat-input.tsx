"use client";

import { useState, useRef, useEffect, useImperativeHandle, forwardRef, KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export interface ChatInputHandle {
  setDraft: (text: string) => void;
}

export const ChatInput = forwardRef<ChatInputHandle, ChatInputProps>(function ChatInput({ onSend, disabled }, ref) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleSend() {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  useImperativeHandle(ref, () => ({
    setDraft(text: string) {
      setValue(text);
      // Resize textarea after value update
      setTimeout(() => {
        const el = textareaRef.current;
        if (el) {
          el.style.height = "auto";
          el.style.height = Math.min(el.scrollHeight, 200) + "px";
          el.focus();
        }
      }, 0);
    },
  }));

  function handleInput() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }

  return (
    <div className="sticky bottom-0 z-10">
      <div className="px-3 pb-3 pt-2 md:px-4 md:pb-4 md:pt-3 safe-bottom">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 md:px-5 md:py-2.5 focus-within:border-gray-400 transition-colors bg-white shadow-sm">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                handleInput();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Write prompt...responsibly"
              disabled={disabled}
              rows={1}
              className="flex-1 resize-none outline-none text-sm text-gray-900 placeholder-gray-400 bg-transparent max-h-[150px] leading-[2] disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={disabled || !value.trim()}
              className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                value.trim() && !disabled
                  ? "bg-gray-800 text-white hover:bg-gray-700"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              )}
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
