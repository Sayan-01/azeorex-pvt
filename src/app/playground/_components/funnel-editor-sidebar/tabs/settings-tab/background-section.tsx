import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import React from "react";
import { Input } from "@/components/ui/custom-input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlignVerticalJustifyCenter, ChevronsLeftRightIcon, LucideImageDown } from "lucide-react";
import { useEditor } from "../../../../../../../providers/editor/editor-provider";
import { EditorElement } from "../../../../../../../providers/editor/editor-actions";

const BackgroundSection = ({ selectedElement }: { selectedElement: EditorElement }) => {
  const { updateElementStyle } = useEditor();

  return (
    <AccordionItem
      value="Background"
      className="px-3 py-0"
    >
      <AccordionTrigger className="!no-underline font-semibold">Background</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-3">
        {/* 1st */}
        {/* bcgc */}
        <div className="flex items-center w-full ">
          <p className=" text-muted-foreground text-xs w-20">Fill</p>
          <div
            className={
              "flex flex-1 h-[30px] rounded-md border-2 group hover:border-[#6A6A6A] pr-0.5 bg-[#272727] items-center text-xs shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none    disabled:cursor-not-allowed disabled:opacity-50 "
            }
          >
            <div className=" overflow-hidden h-full rounded-l-[7px] w-[39px] mr-2">
              <input
                className="h-12 -mt-2 border-2 group-hover:border-[#6A6A6A] transition-colors border-r-0 hover:border-[#6A6A6A] bg-[#272727] -ml-[8px] rounded-l"
                type="color"
                id="backgroundColor"
                placeholder="transparent"
                onChange={(e) => updateElementStyle(selectedElement.id, "backgroundColor", e.target.value)}
                value={selectedElement?.styles?.backgroundColor || ""}
              />
            </div>
            <input
              className="h-[30px] w-20 border-y-2  group-hover:border-[#6A6A6A] bg-[#272727] items-center text-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none   disabled:cursor-not-allowed disabled:opacity-50 "
              id="backgroundColor"
              placeholder="transparent"
              onChange={(e) => updateElementStyle(selectedElement.id, "backgroundColor", e.target.value)}
              value={selectedElement?.styles?.backgroundColor || ""}
            />
          </div>
        </div>

        {/* 2rd blur*/}
        <div className="w-full flex items-center">
          <p className=" text-muted-foreground text-xs w-20">Blur</p>
          <Input
            className="flex-1"
            placeholder="px"
            id="filter"
            onChange={(e) => updateElementStyle(selectedElement.id, "filter", e.target.value)}
            value={selectedElement?.styles?.filter || 0}
          />
        </div>
        {/* 3rd bcg image */}
        <div className="flex items-center">
          <p className=" text-muted-foreground text-xs w-20">Image</p>
          <div className="flex flex-1  rounded-md group">
            <div
              className="w-10 border-2 group-hover:border-[#6a6a6a]  transition-colors border-main-black !rounded-l-md border-r-0"
              style={{
                backgroundImage: selectedElement?.styles?.backgroundImage,
              }}
            />
            <Input
              placeholder="url()"
              className="mt-0 flex-1 !rounded-l-[0px] hover:border-l-none group-hover:border-[#6a6a6a]"
              id="backgroundImage"
              onChange={(e) => updateElementStyle(selectedElement.id, "backgroundImage", e.target.value)}
              value={selectedElement?.styles?.backgroundImage || ""}
            />
          </div>
        </div>
        {/* image position */}
        <div className="flex items-center">
          <p className=" text-muted-foreground text-xs w-20">Position</p>
          <Tabs
            className="flex-1"
            onValueChange={(e) => updateElementStyle(selectedElement.id, "backgroundSize", e)}
            value={selectedElement?.styles?.backgroundSize?.toString() || "cover"}
          >
            <TabsList className="p-[2px] flex items-center flex-row justify-between border-[2px] rounded-md bg-[#272727] h-fit flex-1">
              <TabsTrigger
                value="cover"
                className="w-full h-[24.4px] p-0 data-[state=active]:bg-zinc-950"
              >
                <ChevronsLeftRightIcon size={18} />
              </TabsTrigger>
              <TabsTrigger
                value="contain"
                className="w-full h-[24.4px] p-0 data-[state=active]:bg-zinc-950"
              >
                <AlignVerticalJustifyCenter size={15} />
              </TabsTrigger>
              <TabsTrigger
                value="auto"
                className="w-full h-[24.4px] p-0 data-[state=active]:bg-zinc-950"
              >
                <LucideImageDown size={15} />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default BackgroundSection;
