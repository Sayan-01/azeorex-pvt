"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Ai } from "@/icons/ai";
import { Warframe } from "@/types/types";
import { Sparkles } from "lucide-react";
import React, { useState } from "react";
import AiPrompt from "../../../../../../../../../Ai/Prompt";

const AiTab = () => {
  const [userInput, setUserInput] = useState("Generate the Website template for ");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>();
  const OnGenerate = async () => {
    const prompt = AiPrompt.TEMPLATE_PROMPT + "/n- " + userInput;
    setLoading(true);
    try {
      const res = await fetch("/api/ai-template-generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch AI template.");
      }

      const data = await res.json();
      if (data) {
        setResult(data);
        console.log("sayan", data);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className=" p-4">
      <div className="border-b border-main-black pb-3">
        <h3 className="text-lg font-semibold mb-3">Component Generator</h3>
        <p className="text-sm text-muted-foreground mb-1">You can write prompt for generate template conponents threough AI</p>
      </div>
      <div className="my-4">
        <Textarea
          value={userInput}
          className="mb-4 min-h-32 text-muted-foreground border-[#21db6554] border-2 outline-none rounded-lg"
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
        />
        <Button
          disabled={userInput?.length == 0 || loading}
          size="sm"
          className="bg-[#22dd6626] hover:bg-[#22dd6626]  text-[#21DB66] w-full editor_text"
          onClick={OnGenerate}
        >
          Generate Template with AI
          <Sparkles
            size={13}
            strokeWidth={2.3}
            className="ml-1"
          />
        </Button>
      </div>
      <div>
        {result ? (
          <div
            onDragStart={(e) => {
              //json string pathabo
              e.dataTransfer.setData("componentType", result);
              console.log("ankan", result);
            }}
            draggable
            className="mb-2 rounded-md bg-zinc-800 text-xs p-2 px-3 h-20 flex items-center justify-center relative border-2 border-zinc-700 border-dashed"
          >
            <p>Ai generated template</p>
            <div className="absolute top-2 right-2 opacity-60 flex gap-1"></div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default AiTab;
