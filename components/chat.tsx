
"use client";

import { useAuth } from "@clerk/nextjs";
import { Bot, SendHorizontal } from "lucide-react";
import React, { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chat() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { getToken } = useAuth();

  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async () => {
    const text = message.trim();

    if (!text || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: text,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const idToken = await getToken();

      if (!idToken) {
        throw new Error("Unauthorized");
      }

      const res = await fetch("http://localhost:3002/graph", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          question: text,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <main className="flex h-[100dvh] w-full flex-col overflow-hidden bg-[#08090c] text-white">
      {/* Header */}
      <header className="shrink-0 border-b border-white/10 bg-[#08090c]/90 px-4 py-4 backdrop-blur-xl sm:px-6 sm:py-5">
        <div className="mx-auto flex w-full max-w-5xl items-center gap-3 sm:gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-blue-500/10 sm:h-12 sm:w-12 sm:rounded-2xl">
            <Bot className="text-white" size={22} />

          </div>

          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold text-white sm:text-xl">
              AI Assistant
            </h1>

            <p className="truncate text-xs text-slate-400 sm:text-sm">
              Ask anything about your uploaded documents.
            </p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-5xl px-3 py-5 sm:px-6 sm:py-8">
          {/* Welcome Message */}
          <div className="mb-6 flex items-start gap-3 sm:gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 sm:h-10 sm:w-10">
              <Bot size={18} className="text-white sm:h-5 sm:w-5" />
            </div>

            <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/10 px-4 py-3 sm:max-w-3xl sm:px-5 sm:py-4">
              <p className="text-sm leading-6 text-slate-200 sm:text-base sm:leading-7">
                Hello! Upload a document and ask me anything about its
                contents. I'll search through it and answer using the
                embedded knowledge.
              </p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="space-y-5">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 sm:gap-4 ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {/* Assistant Icon */}
                {msg.role === "assistant" && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 sm:h-10 sm:w-10">
                    <Bot size={18} className="text-white sm:h-5 sm:w-5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-3xl sm:px-5 sm:py-3 sm:text-base sm:leading-7 ${
                    msg.role === "user"
                      ? "rounded-br-sm bg-blue-600 text-white"
                      : "rounded-tl-sm bg-white/10 text-slate-200"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing Skeleton */}
            {loading && (
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 sm:h-10 sm:w-10">
                  <Bot size={18} className="text-white sm:h-5 sm:w-5" />
                </div>

                <div className="rounded-2xl rounded-tl-sm bg-white/10 px-4 py-4 sm:px-5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="shrink-0 border-t border-white/10 bg-[#08090c]/95 px-3 py-3 backdrop-blur-xl sm:px-6 sm:py-5">
        <div className="mx-auto w-full max-w-5xl">
          <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-slate-900/60 p-2 transition focus-within:border-blue-500/40 sm:gap-3 sm:p-3">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              rows={1}
              placeholder={
                loading ? "AI is thinking..." : "Ask anything..."
              }
              className="max-h-32 min-h-[42px] flex-1 resize-none bg-transparent px-2 py-2.5 text-sm leading-6 text-white outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50 sm:max-h-40 sm:text-base"
            />

            <button
              onClick={sendMessage}
              disabled={loading || !message.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 sm:h-12 sm:w-12"
            >
              <SendHorizontal size={18} className="sm:h-5 sm:w-5" />
            </button>
          </div>

          <p className="mt-2 hidden text-center text-[11px] text-slate-600 sm:block">
            Press Enter to send · Shift + Enter for a new line
          </p>
        </div>
      </div>
    </main>
  );
}

