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

        // Try to detect and parse JSON continuously
        if (!isCode && aiResponse.includes("{")) {
          isCode = true;
        }

        if (isCode) {
          // Attempt to parse JSON progressively
          const trimmed = aiResponse.trim();

          // Check if we have a complete JSON object
          if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
            try {
              const parsedJSON = JSON.parse(trimmed);
              // Update editor with parsed JSON in real-time
              dispatch({ type: "SET_ELEMENT", payload: { elements: parsedJSON } });
            } catch (e) {
              // JSON not complete yet, continue accumulating
            }
          }
        }
      }

      // Final processing
      if (!isCode) {
        setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }]);
      } else {
        // Try one final parse
        try {
          const trimmed = aiResponse.trim();
          const parsedJSON = JSON.parse(trimmed);
          dispatch({ type: "SET_ELEMENT", payload: { elements: parsedJSON } });
          setMessages((prev) => [...prev, { role: "assistant", content: "AI code is ready" }]);
          await savePage(aiResponse);
        } catch (e) {
          toast.error("Failed to parse AI response");
          setMessages((prev) => prev.slice(0, -1));
        }
      }
    } catch (error: any) {
      toast.error(error?.error || "Network error occurred");
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
