"use client";
import React, { useEffect, useState } from "react";
import FunnelEditorSidebar from "../_components/funnel-editor-sidebar";
import { Prompt } from "../../../../Ai/PromptForWebPage";
import { toast } from "sonner";
import FunnelEditorNavigation from "../_components/funnel-editor-navigation";
import { useEditor } from "../../../../providers/editor/editor-provider";
import { upsertFunnelPageForProject } from "@/lib/queries";
import { WebsiteBuilder } from "./website-builder";

export type Messages = {
  role: string;
  content: string;
};

const PlaygroundPage = ({ funnelPageDetails, userId, projectId, chatMessages }: { funnelPageDetails: any; userId: string; projectId: string; chatMessages: Messages[] }) => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Messages[]>(chatMessages);
  const [code, setCode] = useState("");
  const { dispatch, state } = useEditor();

 

  const sendMessage = async (userInput: string) => {
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: userInput }]);

    try {
      const res = await fetch("/api/ai-website-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: Prompt({userInput}) }],
          userId,
        }),
      });

      if (!res.ok || !res.body) throw new Error("No response stream");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let aiResponse = "";

      // 🔹 Stream chunks progressively
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        aiResponse += chunk;
        setCode((prev) => prev + chunk);
      }

      // 🔹 Log complete response
      console.log("Complete AI response:", aiResponse);

      // 🔹 Try to parse as JSON (for structured output)
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

  useEffect(() =>{
    console.log(code);
    
  }, [code])

  return (
    <>
      <FunnelEditorNavigation
        projectId={projectId}
        funnelPageDetails={funnelPageDetails}
        userId={userId}
      />
      <div className="h-full flex justify-center overflow-x-hidden bg-[#191919]">
        <WebsiteBuilder funnelPageId={funnelPageDetails.id} />
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
