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
import { validateFlatMap } from "../../../../validators/ai-output-json-validator";

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
      // ── 1. API call ──────────────────────────────────────────────────────────
      const res = await fetch("/api/ai/ai-website-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userInput,
          selectedSections,
          userId,
          model,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to generate website elements");
      }

      const data = await res.json();
      if (!data.success || !data.elements) {
        throw new Error("Invalid response elements from AI generator");
      }

      const elements = data.elements;

      console.log("sayan-1st-playground page e ja dekhabe", elements);

      dispatch({
        type: "LOAD_DATA",
        payload: { elements, liveMode: false },
      });

      setMessages((prev) => [...prev, { role: "assistant", content: "✨ Your page is ready! Check the preview." }]);

      decrementCredits(userId, 100);

      console.log("AI_GENERATED_ELEMENT", elements);
      await savePage(JSON.stringify(elements));
    } catch (e: any) {
      console.error("AI generation error:", e);
      toast.error(e?.message || "Something went wrong. Please try again.");
      setMessages((prev) => [...prev, { role: "assistant", content: e?.message || "Something went wrong. Please try to regenerate." }]);
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
