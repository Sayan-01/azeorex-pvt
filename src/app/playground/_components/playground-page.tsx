"use client";

import React, { useEffect, useState } from "react";
import FunnelEditorSidebar from "../_components/funnel-editor-sidebar";
import FunnelEditorNavigation from "../_components/funnel-editor-navigation";
import { PromptForWebPage } from "../../../../Ai/prompt-v2";
import { toast } from "sonner";
import { useEditor } from "../../../../providers/editor/editor-provider";
import { decrementCredits, upsertFunnelPageForProject } from "@/lib/queries";
import { WebsiteBuilder } from "./website-builder";
import AiLoadingAnimation from "@/components/global/ai-loading-animation/AiLoadingAnimation";
import { useCredits } from "@/hooks/credit-provider";
import { flattenStructure } from "@/lib/flattenStructure";
import { htmlToElementMap, validateElementMap } from "@/lib/html-to-element-map";

export type Messages = {
  role: string;
  content: string;
};

type Props = {
  funnelPageDetails: any;
  userId: string;
  projectId: string;
  chatMessages: Messages[];
};

const PlaygroundPage = ({ funnelPageDetails, userId, projectId, chatMessages }: Props) => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Messages[]>(chatMessages);
  const [model, setModel] = useState("poolside/laguna-s-2.1:free");

  const { dispatch, state } = useEditor();
  const { credits } = useCredits();

  // ── AI generate ─────────────────────────────────────────────────────────────

  const sendMessage = async (userInput: string, selectedSections: string[] = ["nav", "hero", "features", "cta-banner", "footer"]) => {
    if (credits < 100) {
      toast.error("Not enough credits");
      return;
    }

    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: userInput }]);

    try {
      const res = await fetch("/api/ai/ai-website-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userInput, selectedSections, userId, model }),
      });

      if (!res.ok || !res.body) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to generate");
      }

      // ── Read OpenRouter SSE stream, accumulate delta tokens ──────────────────
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let accumulated = "";
      let lastPreviewTime = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const payload = line.slice(6).trim();
          if (payload === "[DONE]") continue;
          try {
            const chunk = JSON.parse(payload);
            const delta = chunk?.choices?.[0]?.delta?.content ?? "";
            if (delta) {
              accumulated += delta;

              // Live preview every ~400ms
              const now = Date.now();
              if (now - lastPreviewTime > 400) {
                lastPreviewTime = now;
                let rawHTML = accumulated;
                // Strip markdown code blocks if present
                const match = rawHTML.match(/```(?:html)?\s*([\s\S]*?)```/);
                if (match) rawHTML = match[1].trim();
                else rawHTML = rawHTML.replace(/^```(?:html)?\s*/, ""); // Strip opening fence if partial

                try {
                  const elements = htmlToElementMap(rawHTML);
                  if (elements && elements["__body"]) {
                    validateElementMap(elements);
                    dispatch({ type: "LOAD_DATA", payload: { elements, liveMode: true } });
                  }
                } catch (e) {
                  /* ignore parse errors during live preview */
                }
              }
            }
          } catch {
            /* skip malformed */
          }
        }
      }

      // ── Parse the accumulated HTML ───────────────────────────────────────────
      if (!accumulated.trim()) throw new Error("Empty response from AI");

      // Strip markdown code blocks if model wraps output
      let raw = accumulated.trim();
      const match = raw.match(/```(?:html)?\s*([\s\S]*?)```/);
      if (match) raw = match[1].trim();

      const elements = htmlToElementMap(raw);
      validateElementMap(elements);

      if (!elements?.__body) throw new Error("Invalid structure: missing __body");

      console.log("AI_GENERATED_ELEMENT", elements);

      dispatch({ type: "LOAD_DATA", payload: { elements, liveMode: false } });
      setMessages((prev) => [...prev, { role: "assistant", content: "✨ Your page is ready! Check the preview." }]);

      decrementCredits(userId, 100);
      await savePage(JSON.stringify(elements));
    } catch (e: any) {
      let errMsg = e?.message || "Something went wrong. Please try again.";
      try {
        const parsed = JSON.parse(errMsg);
        if (parsed?.error) {
          errMsg = parsed.error.metadata?.raw || parsed.error.message || errMsg;
        }
      } catch (parseError) {
        
      }
      toast.error(errMsg);
      setMessages((prev) => [...prev, { role: "assistant", content: errMsg }]);
    } finally {
      setLoading(false);
    }
  };

  // ── Auto-send first message ──────────────────────────────────────────────────
  // Auto-send removed: users must choose sections from the checklist first.

  // ── Save chat messages ───────────────────────────────────────────────────────

  useEffect(() => {
    if (loading || messages.length <= 1) return;
    fetch("/api/chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages,
        funnelPageId: funnelPageDetails.id,
        userId,
        projectId,
      }),
    });
  }, [messages]);

  // ── Save page to DB ──────────────────────────────────────────────────────────

  const savePage = async (content: string) => {
    try {
      await upsertFunnelPageForProject({ ...funnelPageDetails, content }, projectId);
      toast.success("✨ Page saved successfully");
    } catch {
      toast.error("😫 Could not save page");
    }
  };

  // ── Prevent link navigation in editor mode ───────────────────────────────────

  useEffect(() => {
    if (state.previewMode || state.liveMode) return;
    const stopLink = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a")) e.preventDefault();
    };
    document.addEventListener("click", stopLink, true);
    return () => document.removeEventListener("click", stopLink, true);
  }, [state.previewMode, state.liveMode]);

  // ─────────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <>
      <FunnelEditorNavigation
        projectId={projectId}
        funnelPageDetails={funnelPageDetails}
        userId={userId}
      />

      <div className="h-full container-query flex justify-center overflow-x-auto bg-[#191919] relative bg-[#191919] bg-[radial-gradient(#3a3a3a_1px,transparent_1px)] [background-size:16px_16px]">
        <WebsiteBuilder funnelPageId={funnelPageDetails.id} />
        {/* {loading && <AiLoadingAnimation loading={loading} />} */}
      </div>

      <FunnelEditorSidebar
        messages={messages}
        sendMessage={sendMessage}
        model={model}
        setModel={setModel}
        userId={userId}
        projectId={projectId}
        loading={loading}
      />
    </>
  );
};

export default PlaygroundPage;
