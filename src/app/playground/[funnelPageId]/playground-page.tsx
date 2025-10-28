"use client";
import React, { useEffect, useState } from "react";
import FunnelEditorSidebar from "../_components/funnel-editor-sidebar";
import { Prompt } from "../../../../Ai/PromptForWebPage";
import { toast } from "sonner";
import FunnelEditorNavigation from "../_components/funnel-editor-navigation";
import Editor from "../_components/editor";
import { useEditor } from "../../../../providers/editor/editor-provider";
import { upsertFunnelPageForProject } from "@/lib/queries";

export type Messages = {
  role: string;
  content: string;
};

const PlaygroundPage = ({ funnelPageDetails, userId, projectId, chatMessages }: { funnelPageDetails: any; userId: string; projectId: string; chatMessages: Messages[] }) => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Messages[]>(chatMessages);
  const [code, setCode] = useState("");
  const { dispatch, state } = useEditor();

  useEffect(() => {
    if (funnelPageDetails.content) {
      const index = funnelPageDetails.content.indexOf("```html") + 7;
      const code = funnelPageDetails.content.slice(index);
      const cleanCode = code.replace("```", "");
      dispatch({ type: "SET_HTML", payload: { html: cleanCode } });
    }
  }, []);

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

        if (!isCode && aiResponse.includes("```html")) {
          isCode = true;

          const index = aiResponse.indexOf("```html") + 7;
          const code = aiResponse.slice(index);
          setCode(code);
        } else if (isCode) {
          setCode((prev) => prev + chunk);
        }
      }

      if (!isCode) {
        setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }]);
        setLoading(false);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "AI code is ready" }]);
        setLoading(false);
        await savePage(aiResponse);
      }
    } catch (error: any) {
      toast.error(error?.error || "Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatMessages?.length === 1) {
      sendMessage(chatMessages[0].content);
    }
    if (funnelPageDetails.content) {
      const designCode = funnelPageDetails.content;
      const index = designCode.indexOf("```html") + 7;
      const code = designCode.slice(index);
      setCode(code);
    }
  }, [funnelPageDetails.content]);

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
      const index = content.indexOf("```html") + 7;
      const code = content.slice(index);
      const cleanCode = code.replace("```", "");
      dispatch({ type: "SET_HTML", payload: { html: cleanCode } });
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
      <div className="h-full flex justify-center">
        <Editor code={code.replace("```", "")} funnelPageDetails={funnelPageDetails} />
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
