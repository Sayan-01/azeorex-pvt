import React from "react";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Position from "@/icons/position";
import { X } from "lucide-react";
import { useEditor } from "../../../../../../../providers/editor/editor-provider";
import { EditorElement } from "../../../../../../../providers/editor/editor-actions";

const PositionSection = ({ selectedElement }: { selectedElement: EditorElement }) => {
  const { updateElementStyle } = useEditor();
  return (
    <AccordionItem
      value="Position"
      className=" px-3 py-0"
    >
      <AccordionTrigger className="!no-underline font-semibold">Position</AccordionTrigger>
      <AccordionContent>
        <Tabs
          onValueChange={(e) => updateElementStyle(selectedElement.id, "position", e)}
          value={selectedElement?.styles?.position || "relative"}
        >
          <TabsList className="p-[2px] flex items-center flex-row justify-between border-[2px] rounded-md bg-[#272727] h-fit gap-2">
            <TabsTrigger
              value="relative"
              className="w-full h-[24.4px] text-xs p-0 data-[state=active]:bg-zinc-950"
            >
              R
            </TabsTrigger>
            <TabsTrigger
              value="absolute"
              className="w-full h-[24.4px] text-xs p-0 data-[state=active]:bg-zinc-950"
            >
              A
            </TabsTrigger>
            <TabsTrigger
              value="fixed"
              className="w-full h-[24.4px] text-xs p-0 data-[state=active]:bg-zinc-950 "
            >
              F
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="w-full relative mt-3">
          <div className="w-full opacity-60">
            <Position />
          </div>
          <input
            className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1 left-1/2 -translate-x-1/2"
            id="top"
            placeholder="auto"
            onChange={(e) => updateElementStyle(selectedElement.id, "top", e.target.value)}
            value={selectedElement?.styles?.top || ""}
          />
          <input
            className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none bottom-1 left-1/2 -translate-x-1/2"
            placeholder="auto"
            id="bottom"
            onChange={(e) => updateElementStyle(selectedElement.id, "bottom", e.target.value)}
            value={selectedElement?.styles?.bottom || ""}
          />
          <input
            className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1/2 -translate-y-1/2"
            placeholder="auto"
            id="left"
            onChange={(e) => updateElementStyle(selectedElement.id, "left", e.target.value)}
            value={selectedElement?.styles?.left || ""}
          />
          <input
            className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1/2 right-0 -translate-y-1/2"
            placeholder="auto"
            id="right"
            onChange={(e) => updateElementStyle(selectedElement.id, "right", e.target.value)}
            value={selectedElement?.styles?.right || ""}
          />
          <div className=" absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex ">
            <p className=" text-muted-foreground text-xs ">z-index: </p>
            <input
              className="w-5 text-xs text-center text-sky-300 bg-transparent border-none outline-none"
              placeholder="0"
              id="zIndex"
              onChange={(e) => updateElementStyle(selectedElement.id, "zIndex", e.target.value)}
              value={selectedElement?.styles?.zIndex || ""}
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PositionSection;
