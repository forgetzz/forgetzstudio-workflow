import { useAuth, useUser } from "@clerk/nextjs";
import { Bot, SendHorizontal } from "lucide-react";
import React, { useState } from "react";

export default function Chat() {
  const [message, setMessage] = useState("");
  const {getToken} = useAuth()
  const [messages, setMessages] = useState<
    {
      role: "user" | "assistant";
      content: string;
    }[]
  >([]);



  const sendMessage = async () => {
    const text = message.trim();
    if (!getToken) return

    if (!text) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: text,
      },
    ]);

    setMessage("");

    

    try {
      const idToken = await getToken();
      const res = await fetch("http://localhost:3002/graph", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${idToken}`,
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
          content: "Something went wrong.",
        },
      ]);
    }
  };

  return (
    <main className="min-h-screen w-full =flex justify-center items-center p-2 flex-col">



      <div className="flex items-center gap-4 border-b border-white/10 px-6 py-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600">
          <Bot className="text-white" size={26} />
        </div>

        <div>
          <h1 className="text-xl font-semibold text-white">
            AI Assistant
          </h1>

          <p className="text-sm text-slate-400">
            Ask anything about your uploaded documents.
          </p>
        </div>
      </div>


      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 min-h-screen">

        {/* AI Message */}
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
            <Bot size={20} className="text-white" />
          </div>

          <div className="max-w-3xl rounded-2xl rounded-tl-sm bg-white/10 px-5 py-4">
            <p className="leading-7 text-slate-200">
              Hello! Upload a document and ask me anything about its
              contents. I'll search through it and answer using the embedded
              knowledge.
            </p>
          </div>
        </div>

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
              }`}
          >
            <div
              className={`max-w-3xl rounded-2xl px-5 py-3 ${msg.role === "user"
                ? "bg-blue-600 text-white"
                : "bg-white/10 text-slate-200"
                }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        <div className="border-t border-white/10 p-5 w-full">
          <div className="flex items-end gap-4 rounded-2xl border border-white/10 bg-slate-900/40 p-3">

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask anything..."
              className="max-h-40 flex-1 resize-none bg-transparent px-2 py-2 text-white placeholder:text-slate-500 outline-none"
            />

            <button
              onClick={sendMessage}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white transition hover:scale-105"
            >
              <SendHorizontal size={20} />
            </button>

          </div>
        </div>

      </div>



    </main>
  );
}