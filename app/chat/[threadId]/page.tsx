"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { Message } from "@/types";
import { MessageBubble } from "@/components/message-bubble";
import { ChatInput } from "@/components/chat-input";
import { Zap, Globe } from "lucide-react";

export default function ChatPage() {
  const params = useParams();
  const threadId = params.threadId as string;

  const [messages, setMessages] = useState<Message[]>([]);
  const [streamingContent, setStreamingContent] = useState<string | null>(null);
  const [searchingQuery, setSearchingQuery] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const loadMessages = useCallback(async () => {
    const res = await fetch(`/api/threads/${threadId}/messages`);
    if (res.ok) {
      const data = await res.json();
      setMessages(data);
    }
  }, [threadId]);

  useEffect(() => {
    setMessages([]);
    setStreamingContent(null);
    setSearchingQuery(null);
    loadMessages();
  }, [threadId, loadMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent]);

  async function handleSend(content: string) {
    const tempUserMsg: Message = {
      id: `temp-${Date.now()}`,
      thread_id: threadId,
      role: "user",
      content,
      energy_used: null,
      tokens_used: null,
      created_at: new Date().toISOString(),
    };

    const updatedMessages = [...messages, tempUserMsg];
    setMessages(updatedMessages);
    setLoading(true);
    setStreamingContent("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          threadId,
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) throw new Error("Failed to get response");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6).trim();
          if (!raw) continue;

          let event: { type: string; content?: string; message?: Message; energyUsed?: number; tokensUsed?: number };
          try {
            event = JSON.parse(raw);
          } catch {
            continue;
          }

          if (event.type === "searching" && event.query) {
            setSearchingQuery(event.query);
          }

          if (event.type === "delta" && event.content) {
            setSearchingQuery(null);
            setStreamingContent((prev) => (prev ?? "") + event.content);
          }

          if (event.type === "done" && event.message) {
            setStreamingContent(null);
            setSearchingQuery(null);
            await loadMessages();
          }

          if (event.type === "error") {
            console.error("Stream error from server");
            setStreamingContent(null);
            setSearchingQuery(null);
            setMessages((prev) => prev.filter((m) => m.id !== tempUserMsg.id));
          }
        }
      }
    } catch (err) {
      console.error(err);
      setStreamingContent(null);
      setMessages((prev) => prev.filter((m) => m.id !== tempUserMsg.id));
    } finally {
      setLoading(false);
    }
  }

  async function handleRetry() {
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUserMsg) return;
    const withoutLastAssistant = messages.filter(
      (m, i) => !(i === messages.length - 1 && m.role === "assistant")
    );
    setMessages(withoutLastAssistant);
    await handleSend(lastUserMsg.content);
  }

  const isEmpty = messages.length === 0 && !loading && streamingContent === null;

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="bg-black rounded-2xl p-4 mb-4">
              <Zap className="w-8 h-8 text-yellow-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              How can I help you today?
            </h2>
            <p className="text-sm text-gray-500 max-w-sm">
              Ask me anything. Your energy usage will be tracked and shown after each response.
            </p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto py-4">
            {messages.map((msg, i) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                onRetry={
                  msg.role === "assistant" && i === messages.length - 1 && !loading
                    ? handleRetry
                    : undefined
                }
              />
            ))}

            {/* Web search indicator */}
            {searchingQuery && (
              <div className="flex gap-3 px-3 py-2 md:px-4 md:py-3">
                <div className="w-7 h-7 rounded-full bg-black flex-shrink-0 flex items-center justify-center mt-0.5">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm">
                  <Globe className="w-3.5 h-3.5 animate-pulse flex-shrink-0" />
                  <span>Searching: <span className="font-medium">{searchingQuery}</span></span>
                </div>
              </div>
            )}

            {/* Streaming assistant bubble */}
            {streamingContent !== null && (
              <div className="flex gap-3 px-4 py-3">
                <div className="w-7 h-7 rounded-full bg-black flex-shrink-0 flex items-center justify-center mt-0.5">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
                <div className="max-w-[75%]">
                  <div className="bg-gray-100 text-gray-900 rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap">
                    {streamingContent}
                    <span className="inline-block w-0.5 h-4 bg-gray-500 ml-0.5 animate-pulse align-middle" />
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
}
