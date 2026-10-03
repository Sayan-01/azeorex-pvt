"use client";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUp, Loader2, Pencil, X } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const modelOptions = [
  { value: "poolside/laguna-s-2.1:free", label: "Laguna M.1" },
  { value: "cohere/north-mini-code:free", label: "Cohere North" },
  { value: "nvidia/nemotron-3.5-lightning:free", label: "Nemotron Lightning" },
  { value: "qwen/qwen3-8b:free", label: "Qwen 3 (8B)" },
];

const CUSTOM = "__custom__";

const SECTIONS = [
  { value: "nav", label: "Navigation" },
  { value: "hero", label: "Hero" },
  { value: "features", label: "Features" },
  { value: "testimonials", label: "Testimonials" },
  { value: "pricing", label: "Pricing" },
  { value: "cta-banner", label: "CTA" },
  { value: "footer", label: "Footer" },
] as const;

type Props = {
  messages: { role: string; content: string }[];
  onSend: (message: string, selectedSections: string[]) => void;
  loading: boolean;
  model: string;
  setModel: (model: string) => void;
};

const Chats = ({ messages, onSend, loading, model, setModel }: Props) => {
  const [input, setInput] = useState("");
  const [customMode, setCustomMode] = useState(false);
  const [selectedSections, setSelectedSections] = useState<string[]>(["nav", "hero", "features", "cta-banner", "footer"]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, loading]);

  useEffect(() => {
    if (messages?.length === 1 && messages[0].role === "user" && input === "") {
      setInput(messages[0].content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  }, [input]);

  const toggleSection = (val: string) => setSelectedSections((prev) => (prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]));

  const canSend = input.trim() !== "" && selectedSections.length > 0 && !loading;

  const handleSend = () => {
    if (!canSend) return;
    onSend(input.trim(), selectedSections);
    setInput("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const onModelChange = (v: string) => {
    if (v === CUSTOM) {
      setCustomMode(true);
      setModel("");
    } else {
      setModel(v);
    }
  };

  return (
    <div className="flex h-full flex-col bg-[#0a0a0a] text-zinc-200">
      <div className="flex h-12 shrink-0 items-center border-b border-white/[0.08] px-4">
        <h3 className="text-sm font-medium text-zinc-100">Chat</h3>
      </div>

      <section
        ref={scrollRef}
        className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-4 box-1"
      >
        {messages?.length === 0 ? (
          <div className="m-auto max-w-[200px] text-center">
            <p className="text-sm text-zinc-300">Describe your website</p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-500">Choose the sections below, then write what it should look like.</p>
          </div>
        ) : (
          messages.map((msg, i) =>
            msg.role === "user" ? (
              <div
                key={i}
                className="flex justify-end"
              >
                <p className="max-w-[85%] rounded-2xl rounded-br-md bg-white/[0.08] px-3 py-2 text-[13px] leading-relaxed text-zinc-100">{msg.content}</p>
              </div>
            ) : (
              <p
                key={i}
                className="max-w-[85%] break-all text-[13px] leading-relaxed text-zinc-300"
              >
                {msg.content}
              </p>
            ),
          )
        )}
        {loading && <p className="animate-pulse text-[13px] text-zinc-500">Generating…</p>}
      </section>

      <div className="shrink-0 px-3 pb-3">
        <div className="rounded-2xl border border-white/[0.1] bg-[#141414] p-2 transition-colors focus-within:border-white/25">
          {/* Sections: always visible, tap to toggle */}
          <div className="flex flex-wrap gap-1 border-b border-white/[0.06] px-0.5 pb-2">
            {SECTIONS.map((sec) => {
              const active = selectedSections.includes(sec.value);
              return (
                <button
                  key={sec.value}
                  type="button"
                  onClick={() => toggleSection(sec.value)}
                  aria-pressed={active}
                  className={`rounded-full border px-2 py-0.5 text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 ${
                    active ? "border-zinc-100 bg-zinc-100 text-black" : "border-white/10 text-zinc-500 hover:border-white/20 hover:text-zinc-300"
                  }`}
                >
                  {sec.label}
                </button>
              );
            })}
          </div>

          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Describe the site you want"
            className="block max-h-36 min-h-[40px] w-full resize-none bg-transparent px-1.5 pt-2 text-[13px] leading-relaxed text-zinc-100 outline-none placeholder:text-zinc-600"
          />

          <div className="mt-1 flex items-center gap-2">
            <div className="min-w-0 flex-1">
              {customMode ? (
                <div className="flex items-center gap-1">
                  <Input
                    autoFocus
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="provider/model"
                    className="h-8 min-w-0 flex-1 border-white/10 bg-transparent px-2 text-xs text-zinc-200 placeholder:text-zinc-600"
                  />
                  <button
                    type="button"
                    aria-label="Back to model list"
                    onClick={() => {
                      setCustomMode(false);
                      setModel(modelOptions[0].value);
                    }}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-zinc-500 hover:bg-white/[0.06] hover:text-zinc-200"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <Select
                  value={model}
                  onValueChange={onModelChange}
                >
                  <SelectTrigger className="h-8 w-full max-w-full justify-start gap-1.5 rounded-full border-0 bg-transparent px-2 text-xs text-zinc-400 shadow-none hover:bg-white/[0.06] hover:text-zinc-200 focus:ring-0 dark:bg-transparent dark:hover:bg-white/[0.06] [&>span]:truncate [&>svg]:ml-auto [&>svg]:shrink-0">
                    <SelectValue placeholder="Model" />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#141414] text-sm">
                    {modelOptions.map((o) => (
                      <SelectItem
                        key={o.value}
                        value={o.value}
                        className="text-sm"
                      >
                        {o.label}
                      </SelectItem>
                    ))}
                    <SelectSeparator />
                    <SelectItem
                      value={CUSTOM}
                      className="text-sm"
                    >
                      <span className="flex items-center gap-2 text-zinc-400">
                        <Pencil size={14} /> Custom model
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>

            <button
              type="button"
              onClick={handleSend}
              disabled={!canSend}
              aria-label="Send"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-black transition-opacity hover:bg-white disabled:cursor-not-allowed disabled:opacity-20"
            >
              {loading ? (
                <Loader2
                  size={15}
                  className="animate-spin"
                />
              ) : (
                <ArrowUp size={15} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
