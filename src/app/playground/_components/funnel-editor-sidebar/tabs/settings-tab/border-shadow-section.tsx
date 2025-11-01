import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import Position from "@/icons/position";
import { useEditor } from "../../../../../../../providers/editor/editor-provider";
import { EditorElement } from "../../../../../../../providers/editor/editor-actions";

const BorderShadowSection = ({selectedElement}: {selectedElement: EditorElement}) => {
  const { updateElementStyle } = useEditor();
  return (
    <AccordionItem
      value="Border"
      className="px-3 py-0 border-none"
    >
      <AccordionTrigger className="!no-underline font-semibold">Border</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-3">
        {/* Border Width Controls for Each Side */}
        <div className="w-full relative">
          <div className="w-full opacity-60">
            <Position /> {/* Reuse the same visual representation as padding/margin */}
          </div>
          {/* Top Border */}
          <input
            className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1 left-1/2 -translate-x-1/2"
            id="borderTopWidth"
            placeholder="0px"
            onChange={(e) => updateElementStyle(selectedElement.id, "borderTopWidth", e.target.value)}
            defaultValue={selectedElement?.styles?.borderTopWidth || ""}
          />
          {/* Bottom Border */}
          <input
            className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none bottom-1 left-1/2 -translate-x-1/2"
            placeholder="0px"
            id="borderBottomWidth"
            onChange={(e) => updateElementStyle(selectedElement.id, "borderBottomWidth", e.target.defaultValue)}
            defaultValue={selectedElement?.styles?.borderBottomWidth || ""}
          />
          {/* Left Border */}
          <input
            className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1/2 -translate-y-1/2"
            placeholder="0px"
            id="borderLeftWidth"
            onChange={(e) => updateElementStyle(selectedElement.id, "borderLeftWidth", e.target.defaultValue)}
            defaultValue={selectedElement?.styles?.borderLeftWidth || ""}
          />
          {/* Right Border */}
          <input
            className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1/2 right-0 -translate-y-1/2"
            placeholder="0px"
            id="borderRightWidth"
            onChange={(e) => updateElementStyle(selectedElement.id, "borderRightWidth", e.target.defaultValue)}
            defaultValue={selectedElement?.styles?.borderRightWidth || ""}
          />
        </div>

        {/* Border Style */}
        <div className="flex items-center">
          <p className="text-muted-foreground text-xs w-20">Border Style</p>
          <Select
            onValueChange={(e) => updateElementStyle(selectedElement.id, "borderStyle", e)}
            defaultValue={selectedElement?.styles?.borderStyle || "solid"}
          >
            <SelectTrigger className="flex-1 px-2 h-[30px] border-2 border-[#272727] text-xs">
              <SelectValue placeholder="Select border style" />
            </SelectTrigger>
            <SelectContent className="text-xs">
              <SelectGroup className="text-xs">
                <SelectLabel className="text-xs">Border Styles</SelectLabel>
                {["solid", "dashed", "dotted", "double", "none"].map((style) => (
                  <SelectItem
                    key={style}
                    className="text-xs"
                    value={style}
                  >
                    {style}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Border Color */}
        <div className="flex items-center">
          <p className="text-muted-foreground text-xs w-20">Border Color</p>
          <div className="flex flex-1 h-[30px] rounded-md border-2 group hover:border-[#6A6A6A] pr-0.5 bg-[#272727] items-center text-xs shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
            <div className="overflow-hidden h-full rounded-l-[5px] w-[39px] mr-2">
              <input
                className="h-12 -mt-2 border-2 group-hover:border-[#6A6A6A] transition-colors border-r-0 hover:border-[#6A6A6A] bg-[#272727] -ml-[8px] rounded-l"
                type="color"
                id="borderColor"
                placeholder="transparent"
                onChange={(e) => updateElementStyle(selectedElement.id, "borderColor", e.target.value)}
                defaultValue={selectedElement?.styles?.borderColor || ""}
              />
            </div>
            <input
              className="h-[30px] w-20 border-y-2 group-hover:border-[#6A6A6A] bg-[#272727] items-center text-xs shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              id="borderColor"
              placeholder="transparent"
              onChange={(e) => updateElementStyle(selectedElement.id, "borderColor", e.target.defaultValue)}
              defaultValue={selectedElement?.styles?.borderColor || ""}
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default BorderShadowSection;
