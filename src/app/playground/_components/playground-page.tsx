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
  const [model, setModel] = useState("x-ai/grok-4.1-fast");

  const { dispatch, state } = useEditor();
  const { credits } = useCredits();

  // ── AI generate ─────────────────────────────────────────────────────────────

  const sendMessage = async (userInput: string) => {
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
        body: JSON.stringify({
          messages: [{ role: "user", content: PromptForWebPage({ userInput }) }],
          userId,
          model,
        }),
      });

      if (!res.ok || !res.body) throw new Error("No response stream");

      // ── stream read ──────────────────────────────────────────────────────
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let aiResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        aiResponse += decoder.decode(value, { stream: true });
      }

      // ── parse + flatten ──────────────────────────────────────────────────
      // AI generates nested JSON → flattenStructure() → flat ElementMap
      const trimmed = aiResponse.trim();

      // strip accidental markdown code fences if model adds them
      const jsonStr = trimmed.startsWith("```") ? trimmed.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "") : trimmed;

      const parsed = JSON.parse(jsonStr);
      const elements = flattenStructure(parsed);

      if (Object.keys(elements).length === 0) {
        throw new Error("Empty elements after flatten");
      }

      dispatch({
        type: "LOAD_DATA",
        payload: { elements, liveMode: false },
      });

      setMessages((prev) => [...prev, { role: "assistant", content: "✨ Your page is ready! Check the preview." }]);

      decrementCredits(userId, 100);
      await savePage(JSON.stringify({ elements }));
    } catch (e) {
      console.error("AI generation error:", e);
      toast.error("Something went wrong. Please try again.");
      setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong. Please try to regenerate." }]);
    } finally {
      setLoading(false);
    }
  };

  // ── Auto-send first message ──────────────────────────────────────────────────

  useEffect(() => {
    if (chatMessages?.length === 1 && !loading) {
      sendMessage(chatMessages[0].content);
    }
  }, []);

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

      <div className="h-full container-query flex justify-center overflow-x-auto bg-[#191919] relative">
        <WebsiteBuilder funnelPageId={funnelPageDetails.id} />
        {loading && <AiLoadingAnimation loading={loading} />}
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
