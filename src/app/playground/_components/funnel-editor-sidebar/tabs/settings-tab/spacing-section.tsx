import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import PM from "@/icons/p-m";
import React from "react";
import { useEditor } from "../../../../../../../providers/editor/editor-provider";
import { EditorElement } from "../../../../../../../providers/editor/editor-actions";

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
            value={selectedElement?.styles?.marginTop || ""}
            onChange={(e) => updateElementStyle(selectedElement.id, "marginTop", e.target.value)}
          />
          <input
            className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none bottom-1 left-1/2 -translate-x-1/2"
            placeholder="16px"
            id="marginBottom"
            onChange={(e) => updateElementStyle(selectedElement.id, "marginBottom", e.target.value)}
            value={selectedElement?.styles?.marginBottom || ""}
          />
          <input
            className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1/2 -translate-y-1/2"
            placeholder="16px"
            id="marginLeft"
            onChange={(e) => updateElementStyle(selectedElement.id, "marginLeft", e.target.value)}
            value={selectedElement?.styles?.marginLeft || ""}
          />
          <input
            className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1/2 right-0 -translate-y-1/2"
            placeholder="16px"
            id="marginRight"
            onChange={(e) => updateElementStyle(selectedElement.id, "marginRight", e.target.value)}
            value={selectedElement?.styles?.marginRight || ""}
          />
          <input
            className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-8 left-1/2 -translate-x-1/2"
            placeholder="16px"
            id="paddingTop"
            onChange={(e) => updateElementStyle(selectedElement.id, "paddingTop", e.target.value)}
            value={selectedElement?.styles?.paddingTop || ""}
          />
          <input
            className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none bottom-8 left-1/2 -translate-x-1/2"
            placeholder="16px"
            id="paddingBottom"
            onChange={(e) => updateElementStyle(selectedElement.id, "paddingBottom", e.target.value)}
            value={selectedElement?.styles?.paddingBottom || ""}
          />
          <input
            className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1/2 left-9 -translate-y-1/2"
            placeholder="16px"
            id="paddingLeft"
            onChange={(e) => updateElementStyle(selectedElement.id, "paddingLeft", e.target.value)}
            value={selectedElement?.styles?.paddingLeft || ""}
          />
          <input
            className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1/2 right-9 -translate-y-1/2"
            placeholder="16px"
            id="paddingRight"
            onChange={(e) => updateElementStyle(selectedElement.id, "paddingRight", e.target.value)}
            value={selectedElement?.styles?.paddingRight || ""}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default SpacingSection;
