import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import PM from "@/icons/p-m";
import React from "react";
import { useEditor } from "../../../../../../../providers/editor/editor-provider";
import { EditorElement } from "../../../../../../../providers/editor/editor-actions";
import { Input } from "@/components/ui/custom-input";

const SpacingSection = ({ selectedElement }: { selectedElement: EditorElement }) => {
  const { updateElementStyle } = useEditor();

  return (
    <AccordionItem
      value="Spacing"
      className=" px-3 py-0"
    >
      <AccordionTrigger className="!no-underline font-semibold">Spacing</AccordionTrigger>
      <AccordionContent>
        <div className="w-full relative">
          <div className="w-full opacity-60">
            <PM />
          </div>
          <input
            className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1 left-1/2 -translate-x-1/2"
            id="marginTop"
            placeholder="16px"
            value={(selectedElement?.styles as any)?.["margin-top"] || ""}
            onChange={(e) => updateElementStyle(selectedElement.id, "margin-top", e.target.value)}
          />
          <input
            className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none bottom-1 left-1/2 -translate-x-1/2"
            placeholder="16px"
            id="marginBottom"
            onChange={(e) => updateElementStyle(selectedElement.id, "margin-bottom", e.target.value)}
            value={(selectedElement?.styles as any)?.["margin-bottom"] || ""}
          />
          <input
            className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1/2 -translate-y-1/2"
            placeholder="16px"
            id="marginLeft"
            onChange={(e) => updateElementStyle(selectedElement.id, "margin-left", e.target.value)}
            value={(selectedElement?.styles as any)?.["margin-left"] || ""}
          />
          <input
            className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1/2 right-0 -translate-y-1/2"
            placeholder="16px"
            id="marginRight"
            onChange={(e) => updateElementStyle(selectedElement.id, "margin-right", e.target.value)}
            value={(selectedElement?.styles as any)?.["margin-right"] || ""}
          />
          <input
            className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-8 left-1/2 -translate-x-1/2"
            placeholder="16px"
            id="paddingTop"
            onChange={(e) => updateElementStyle(selectedElement.id, "padding-top", e.target.value)}
            value={(selectedElement?.styles as any)?.["padding-top"] || ""}
          />
          <input
            className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none bottom-8 left-1/2 -translate-x-1/2"
            placeholder="16px"
            id="paddingBottom"
            onChange={(e) => updateElementStyle(selectedElement.id, "padding-bottom", e.target.value)}
            value={(selectedElement?.styles as any)?.["padding-bottom"] || ""}
          />
          <input
            className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1/2 left-9 -translate-y-1/2"
            placeholder="16px"
            id="paddingLeft"
            onChange={(e) => updateElementStyle(selectedElement.id, "padding-left", e.target.value)}
            value={(selectedElement?.styles as any)?.["padding-left"] || ""}
          />
          <input
            className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1/2 right-9 -translate-y-1/2"
            placeholder="16px"
            id="paddingRight"
            onChange={(e) => updateElementStyle(selectedElement.id, "padding-right", e.target.value)}
            value={(selectedElement?.styles as any)?.["padding-right"] || ""}
          />
        </div>
        <div className="flex flex-col gap-3 mt-2">
          <div className="w-full flex items-center">
            <p className=" text-muted-foreground text-xs w-20">Padding</p>
            <Input
              className="flex-1"
              placeholder="px"
              id="padding"
              onChange={(e) => updateElementStyle(selectedElement.id, "padding", e.target.value)}
              value={(selectedElement?.styles as any)?.padding || ""}
            />
          </div>
          <div className="w-full flex items-center">
            <p className=" text-muted-foreground text-xs w-20">Margin</p>
            <Input
              className="flex-1"
              placeholder="px"
              id="margin"
              onChange={(e) => updateElementStyle(selectedElement.id, "margin", e.target.value)}
              value={(selectedElement?.styles as any)?.margin || ""}
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default SpacingSection;
