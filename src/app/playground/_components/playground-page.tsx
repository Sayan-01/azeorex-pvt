"use client";
import React, { useEffect, useState } from "react";
import FunnelEditorSidebar from "./funnel-editor-sidebar";
import { Prompt } from "../../../../Ai/PromptForWebPage";
import { toast } from "sonner";
import FunnelEditorNavigation from "./funnel-editor-navigation";
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

  //Load existing content
  useEffect(() => {
    if (funnelPageDetails.content) {
      try {
        const parsedContent = JSON.parse(funnelPageDetails.content);
        dispatch({ type: "SET_ELEMENT", payload: { elements: parsedContent } });
      } catch (error) {
        console.error("Failed to parse existing content:", error);
      }
    }
  }, [funnelPageDetails.content]);

  const sendMessage = async (userInput: string) => {
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: userInput }]);

    try {
      const result = await fetch("/api/ai-website-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: Prompt({ userInput }) }],
          userId,
        }),
      });

      if (!result.ok) {
        toast.error("Network error occurred");
        setMessages((prev) => prev.slice(0, -1));

        return;
      }

      const reader = result.body?.getReader();
      const decoder = new TextDecoder();
      let aiResponse = "";
      let isCode = false;

      while (true) {
        //@ts-ignore
        const { done, value } = await reader?.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        aiResponse += chunk;

        try {
          const cleanJSON = aiResponse.trim();
          // Check if JSON is complete (starts with { and ends with })
          if (cleanJSON.startsWith("{") && cleanJSON.endsWith("}")) {
            const parsedJSON = JSON.parse(cleanJSON);
            // Update editor with parsed JSON in real-time
            dispatch({ type: "SET_ELEMENT", payload: { elements: parsedJSON } });
          }
        } catch (e) {
          // Ignore parsing errors
        }
      }

      try {
        const cleanJSON = aiResponse.trim();
        const parsedJSON = JSON.parse(cleanJSON);

        // Save to database
        await savePage(JSON.stringify(parsedJSON, null, 2));

        setMessages((prev) => [...prev, { role: "assistant", content: "✨ Webpage generated successfully!" }]);
        toast.success("Webpage generated successfully!");
      } catch (error) {
        console.error("Failed to parse JSON:", error);
        console.log("Raw AI Response:", aiResponse);
        toast.error("Failed to parse AI response. Please try again.");
        setMessages((prev) => [...prev, { role: "assistant", content: "Failed to generate webpage. Invalid JSON format." }]);
      }
    } catch (error: any) {
      toast.error(error?.error || "Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Auto-send first message if exists
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
  }, [messages, loading]);

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
