import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import PM from "@/icons/p-m";
import React from "react";
import { useNewEditor } from "../../../../../../../providers/newPeovider";

const SpacingSection = () => {
  const { selectedElement, updateStyle } = useNewEditor();

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
            onChange={(e) => updateStyle(e.target.id, e.target.value)}
            defaultValue={selectedElement?.style?.marginTop || ""}
          />
          <input
            className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none bottom-1 left-1/2 -translate-x-1/2"
            placeholder="16px"
            id="marginBottom"
            onChange={(e) => updateStyle(e.target.id, e.target.defaultValue)}
            defaultValue={selectedElement?.style?.marginBottom || ""}
          />
          <input
            className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1/2 -translate-y-1/2"
            placeholder="16px"
            id="marginLeft"
            onChange={(e) => updateStyle(e.target.id, e.target.defaultValue)}
            defaultValue={selectedElement?.style?.marginLeft || ""}
          />
          <input
            className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1/2 right-0 -translate-y-1/2"
            placeholder="16px"
            id="marginRight"
            onChange={(e) => updateStyle(e.target.id, e.target.defaultValue)}
            defaultValue={selectedElement?.style?.marginRight || ""}
          />
          <input
            className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-8 left-1/2 -translate-x-1/2"
            placeholder="16px"
            id="paddingTop"
            onChange={(e) => updateStyle(e.target.id, e.target.defaultValue)}
            defaultValue={selectedElement?.style?.paddingTop || ""}
          />
          <input
            className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none bottom-8 left-1/2 -translate-x-1/2"
            placeholder="16px"
            id="paddingBottom"
            onChange={(e) => updateStyle(e.target.id, e.target.defaultValue)}
            defaultValue={selectedElement?.style?.paddingBottom || ""}
          />
          <input
            className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1/2 left-9 -translate-y-1/2"
            placeholder="16px"
            id="paddingLeft"
            onChange={(e) => updateStyle(e.target.id, e.target.defaultValue)}
            defaultValue={selectedElement?.style?.paddingLeft || ""}
          />
          <input
            className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1/2 right-9 -translate-y-1/2"
            placeholder="16px"
            id="paddingRight"
            onChange={(e) => updateStyle(e.target.id, e.target.defaultValue)}
            defaultValue={selectedElement?.style?.paddingRight || ""}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default SpacingSection;
