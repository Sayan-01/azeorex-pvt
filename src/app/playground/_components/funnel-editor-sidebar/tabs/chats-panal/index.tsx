"use client";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, Loader, Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

const Chats = ({ messages, onSend, loading }: { messages: { role: string; content: string }[]; onSend: (message: string) => void; loading: boolean }) => {
  const [input, setInput] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = () => {
    if (input.trim() !== "") {
      onSend(input.trim());
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full ">
      <div className="p-3 border-b">
        <h3 className="text-lg font-semibold">Your all chats</h3>
      </div>
      <section
        ref={chatContainerRef}
        className="flex-1 p-3 pb-0 overflow-y-auto box space-y-4 flex flex-col mb-3 "
      >
        {messages?.length === 0 ? (
          <p className="text-center text-zinc-500">Chat with AI</p>
        ) : (
          messages?.map((msg, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 se ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex items-start gap-2 ${msg.role === "user" ? "!flex-row-reverse" : "flex-row"}`}>
                {/* <span className={`w-[32px] h-[32px] rounded-full ${msg.role === "user" ? "bg-green-500" : "bg-purple-500"}`}>
                  <Image
                    src={msg.role === "user" ? "/avater.svg" : "/icons/deepseek-logo.webp"}
                    alt={msg.role === "user" ? "User" : "AI"}
                    width={300}
                    height={300}
                    className="rounded-full"
                  />
                </span> */}
                <div className="w-2 h-2 rounded-2xl bg-green-400 mt-3"></div>
                <p className={`text-[#111111] p-2 rounded-lg max-w-[176px] text-xs ${msg.role === "user" ? "bg-green-500/10 text-green-500" : "text-white/80"}`}>{msg.content}</p>
              </div>
            </div>
          ))
        )}

        {/* 🩵 Show AI is typing... when loading */}
        {loading && (
          <div className="flex items-center gap-2 justify-start">
            <span className={`w-[32px] h-[32px] rounded-full bg-purple-500`}>
              <Image
                src={"/icons/deepseek-logo.webp"}
                alt={"AI"}
                width={300}
                height={300}
                className="rounded-full"
              />
            </span>
            <p className="text-purple-500 p-2 rounded-lg max-w-[80%] text-xs bg-purple-500/10 animate-pulse flex items-center gap-2">
              <span>
                <Loader
                  className="animate-spin"
                  size={16}
                />
              </span>
              AI is thinking...
            </p>
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
        <div className="bg-editor-bcgc h-5 -mt-2" />
      </div>
    </div>
  );
};

export default Chats;
