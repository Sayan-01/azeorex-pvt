"use client";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, Loader, Loader2, Pencil } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

const Chats = ({
  messages,
  onSend,
  loading,
  model,
  setModel,
}: {
  messages: { role: string; content: string }[];
  onSend: (message: string) => void;
  loading: boolean;
  model: string;
  setModel: any;
}) => {
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
                <div className="w-2 h-2 rounded-2xl bg-green-400 mt-3"></div>
                <p className={`text-[#111111] p-2 rounded-lg max-w-[176px] text-xs ${msg.role === "user" ? "bg-green-500/10 text-green-500" : "text-white/80"}`}>{msg.content}</p>
              </div>
            </div>
          ))
        )}

        {/* 🩵 Show AI is typing... when loading */}
        {loading && (
          <div className="flex items-center gap-2 justify-start">
            <div className="w-2 h-2 rounded-2xl bg-purple-400 "></div>

            <p className="text-purple-500 p-2 rounded-lg max-w-[80%] text-xs bg-purple-500/10 animate-pulse flex items-center gap-2">
              <span>
                <Loader
                  className="animate-spin"
                  size={16}
                />
              </span>
              AI is generating...
            </p>
          </div>
        )}
      </section>
      <div className="sticky bottom-0 p-3 py-0 ">
        <div className="flex flex-col items-center gap-2 bg-zinc-800/40 border-2 rounded-lg p-2 relative z-20 text-xs">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border-none dark:bg-transparent bg-transparent p-0 pb-2 text-xs "
            placeholder="Imagine Something...✦˚"
          />
          <div className="flex items-center gap-2 w-full justify-end">
            <Select
              value={model}
              onValueChange={setModel}
            >
              <SelectTrigger className="relative p-1 text-sm">
                <SelectValue
                  placeholder="Select a model"
                  className="border-none dark:bg-transparent bg-transparent p-0 pb-2 text-xs"
                />
              </SelectTrigger>
              <SelectContent className="text-sm">
                <SelectGroup>
                  <SelectItem
                    className="text-sm"
                    value="qwen/qwen3-coder:free"
                  >
                    <Image
                      src={"/ai/qwen.png"}
                      alt={"Qwen"}
                      width={300}
                      height={300}
                      className="rounded-full bg-white w-6 h-6 border border-zinc-600"
                    />
                    Qwen 3
                  </SelectItem>
                  <SelectItem
                    className="text-sm"
                    value="x-ai/grok-4.1-fast:free"
                  >
                    <Image
                      src={"/ai/grok.png"}
                      alt={"Grok"}
                      width={300}
                      height={300}
                      className="rounded-full bg-white w-6 h-6 border border-zinc-600"
                    />
                    {"Grok (free)"}
                  </SelectItem>
                  <SelectItem
                    className="text-sm"
                    value="x-ai/grok-4.1-fast"
                  >
                    <Image
                      src={"/ai/grok.png"}
                      alt={"Grok"}
                      width={300}
                      height={300}
                      className="rounded-full bg-white w-6 h-6 border border-zinc-600"
                    />
                    {"Grok (paid)"}
                  </SelectItem>
                  <SelectItem
                    className="text-sm"
                    value="tngtech/deepseek-r1t2-chimera:free"
                  >
                    <Image
                      src={"/ai/deepseek.webp"}
                      alt={"Deepseek"}
                      width={300}
                      height={300}
                      className="rounded-full bg-white w-6 h-6 border border-zinc-600"
                    />
                    Deepseek r1t2
                  </SelectItem>
                  <SelectItem
                    className="text-sm"
                    value="google/gemini-2.0-flash-exp:free"
                  >
                    <Image
                      src={"/ai/gemini.png"}
                      alt={"Gemini"}
                      width={300}
                      height={300}
                      className="rounded-full bg-white w-6 h-6 border border-zinc-600"
                    />
                    Gemini
                  </SelectItem>
                  <SelectItem
                    className="text-sm"
                    value="openai/gpt-oss-20b:free"
                  >
                    <Image
                      src={"/ai/gpt.png"}
                      alt={"GPT"}
                      width={300}
                      height={300}
                      className="rounded-full bg-white w-6 h-6 border border-zinc-600"
                    />
                    GPT-20B
                  </SelectItem>
                </SelectGroup>
                <SelectSeparator className="mt-2" />
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter custom model name"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="px-2"
                  />
                  <Pencil
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    size={14}
                  />
                </div>
              </SelectContent>
            </Select>

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
        </div>
        <div className="bg-editor-bcgc h-5 -mt-2" />
      </div>
    </div>
  );
};

export default Chats;
