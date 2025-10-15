"use client";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, Loader2 } from "lucide-react";
import React, { useState } from "react";

const Chats = ({ messages, onSend, loading }: { messages: { role: string; content: string }[]; onSend: (message: string) => void; loading: boolean }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      onSend(input.trim());
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-3">
        <h3 className="text-lg font-semibold mb-3">Your all collections</h3>
      </div>
      <section className="flex-1 p-3 overflow-y-auto box space-y-4 flex flex-col mb-3 ">
        {messages?.length === 0 ? (
          <p className="text-center text-zinc-500">Chat with AI</p>
        ) : (
          messages?.map((msg, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <p className={`text-[#111111] p-2 rounded-lg max-w-[80%] text-xs ${msg.role === "user" ? "bg-zinc-300" : "bg-zinc-400 text-black"}`}>{msg.content}</p>
            </div>
          ))
        )}

        {/* 🩵 Show AI is typing... when loading */}
        {loading && (
          <div className="flex items-center gap-2 justify-start">
            <p className="text-[#111111] p-2 rounded-lg max-w-[80%] text-xs bg-zinc-500 animate-pulse">AI is typing...</p>
          </div>
        )}
      </section>
      <div className="sticky bottom-0 p-3 py-0">
        <div className="flex flex-col items-center gap-2 bg-zinc-900 border rounded-lg p-2 relative z-20">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border-none dark:bg-transparent bg-transparent p-0 pb-2"
          />
          <button
            className="h-8 w-8 flex items-center justify-center ml-auto bg-gradient-to-br from-zinc-50 to-zinc-200 rounded-full"
            onClick={handleSend}
          >
            {loading ? (
              <Loader2
                className="animate-spin text-[#444444]"
                size={16}
              />
            ) : (
              <ArrowUp
                color="#444444"
                size={16}
              />
            )}
          </button>
        </div>
        <div className="bg-editor-bcgc h-5 -mt-2"/>
      </div>
    </div>
  );
};

export default Chats;
