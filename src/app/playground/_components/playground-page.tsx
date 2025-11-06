"use client"; // streamming responce 5 e casual chat + code chat er option ache
import React, { useEffect, useState } from "react";
import FunnelEditorSidebar from "../_components/funnel-editor-sidebar";
import { PromptForWebPage } from "../../../../Ai/PromptForWebPage";
import { toast } from "sonner";
import FunnelEditorNavigation from "../_components/funnel-editor-navigation";
import { useEditor } from "../../../../providers/editor/editor-provider";
import { upsertFunnelPageForProject } from "@/lib/queries";
import { WebsiteBuilder } from "./website-builder";
import AiLoadingAnimation from "@/components/global/ai-loading-animation/AiLoadingAnimation";

export type Messages = {
  role: string;
  content: string;
};

const PlaygroundPage = ({ funnelPageDetails, userId, projectId, chatMessages }: { funnelPageDetails: any; userId: string; projectId: string; chatMessages: Messages[] }) => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Messages[]>(chatMessages);
  const { dispatch, state } = useEditor();

  const sendMessage = async (userInput: string) => {
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: userInput }]);

    try {
      const res = await fetch("/api/ai/ai-website-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: PromptForWebPage({ userInput }) }],
          userId,
        }),
      });

      if (!res.ok || !res.body) throw new Error("No response stream");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let aiResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        aiResponse += chunk;
      }

      try {
        const parsedJSON = JSON.parse(aiResponse.trim());

        dispatch({ type: "SET_ELEMENT", payload: { elements: parsedJSON } });
        setMessages((prev) => [...prev, { role: "assistant", content: "AI code is ready" }]);
        await savePage(aiResponse);
      } catch (e) {
        // If not JSON, treat as regular message
        setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }]);
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error?.message || "Network error occurred");
      // Remove the user message if request failed
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatMessages?.length === 1 && !loading) {
      sendMessage(chatMessages[0].content);
    }
  }, []);

  useEffect(() => {
    const saveMessages = async () => {
      await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages,
          funnelPageId: funnelPageDetails.id,
          userId,
          projectId,
        }),
      });
    };
    if (!loading && messages?.length > 1) saveMessages();
  }, [messages]);

  const savePage = async (content: string) => {
    try {
      await upsertFunnelPageForProject(
        {
          ...funnelPageDetails,
          content,
        },
        projectId
      );
      toast.success("✨Page saved successfully");
    } catch (e) {
      toast.error("😫Could not save page");
    }
  };

 useEffect(() => {
   if (state.previewMode || state.liveMode) return;

   const stopLink = (e: any) => {
     const link = e.target.closest("a");
     if (link) e.preventDefault();
   };

   document.addEventListener("click", stopLink, true);
   return () => document.removeEventListener("click", stopLink, true);
 }, [state.previewMode, state.liveMode]);

  return (
    <>
      <FunnelEditorNavigation
        projectId={projectId}
        funnelPageDetails={funnelPageDetails}
        userId={userId}
      />
      <div className="h-full container-query flex justify-center overflow-x-hidden bg-[#191919] relative">
        <WebsiteBuilder funnelPageId={funnelPageDetails.id} />
        {loading && <div>
          <AiLoadingAnimation loading={loading}/>
          </div>}
      </div>
      <FunnelEditorSidebar
        messages={messages}
        sendMessage={sendMessage}
        userId={userId}
        projectId={projectId}
        loading={loading}
      />
    </>
  );
};

export default PlaygroundPage;
