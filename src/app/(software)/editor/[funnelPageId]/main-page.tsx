"use client";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import FunnelEditor from "./_components/funnel-editor";
import FunnelEditorNavigation from "./_components/funnel-editor-navigation";
import FunnelEditorSidebar from "./_components/funnel-editor-sidebar";
import { Inter } from "next/font/google";
import EditorProvider from "../../../../../providers/editor/editor-provider";
import { Chat, FunnelPage } from "@prisma/client";
import { useState, useEffect } from "react";
import { v4 } from "uuid";
import { AiForFindType, AiPromptForCode, AiPromptForText } from "../../../../../Ai/PromptForWebPage";
import { toast } from "sonner";

type Props = {
  projectId: string;
  funnelPageDetails: FunnelPage;
  userId: string;
  chatMessages: Messages[];
};

export type Messages = {
  role: string;
  content: string;
};

const MainPage = ({ projectId, funnelPageDetails, userId, chatMessages }: Props) => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Messages[]>(chatMessages);
  const [pageDetails, setPageDetails] = useState(funnelPageDetails);
  const [changeId, setChangeId] = useState("");

  const sendMessage = async (userInput: string) => {
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: userInput }]);

    try {
      const result = await fetch("/api/ai-model", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: AiForFindType({ userInput }) }],
          userId,
        }),
      });

      const data = await result.json();
      if (!result.ok) {
        toast.error(data.error || "Failed to process your request");
        setLoading(false);
        return;
      }

      const aiResponseType = data?.choices?.[0]?.message?.content?.trim() || ""; // json string

      let aiResponse = "";

      if (aiResponseType === "txt") {
        const result = await fetch("/api/ai-model", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "user", content: AiPromptForText({ userInput }) }],
            userId,
          }),
        });

        const data = await result.json();

        if (!result.ok) {
          toast.error(data.error || "AI generation failed");
          setLoading(false);
          return;
        }

        aiResponse = data?.choices?.[0]?.message?.content?.trim() || "";
      } else if (aiResponseType === "code") {
        const result = await fetch("/api/ai-model", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "user", content: AiPromptForCode({ userInput }) }],
            userId,
          }),
        });

        const data = await result.json();

        if (!result.ok) {
          toast.error(data.error || "AI generation failed");
          setLoading(false);
          return;
        }
        aiResponse = data?.choices?.[0]?.message?.content?.trim() || "";
      }
      console.log("das", aiResponse);
      if (aiResponse.startsWith("[")) {
        try {
          await fetch("/api/funnel/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              funnelPageId: funnelPageDetails.id,
              content: aiResponse,
            }),
          });

          setChangeId(v4());
          setMessages((prev) => [...prev, { role: "assistant", content: "AI response is ready" }]);
        } catch (err) {
          toast.error("AI returned invalid JSON.");
          setMessages((prev) => [...prev, { role: "assistant", content: "AI returned invalid JSON." }]);
        }
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: aiResponse || "Fail to generate response" }]);
      }
    } catch (error:any) {
      toast.error(error?.message || "Network error occurred");
    } finally {
      setLoading(false);
    }
  };

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
    if (!loading) saveMessages();
  }, [messages]);

  return (
    <>
      <FunnelEditorNavigation
        projectId={projectId}
        funnelPageDetails={pageDetails}
        userId={userId}
      />
      <div className="h-full flex justify-center ">
        <FunnelEditor
          funnelPageId={pageDetails?.id}
          id={changeId}
        />
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

export default MainPage;
