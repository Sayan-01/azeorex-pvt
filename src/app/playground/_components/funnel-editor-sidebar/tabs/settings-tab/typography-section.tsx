"use client";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/custom-input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  CircleOff,
  Underline
} from "lucide-react";
import { useNewEditor } from "../../../../../../../providers/newPeovider";

const TypographySection = () => {
  const { selectedElement, updateStyle } = useNewEditor();

  return (
    <AccordionItem
      value="Typography"
      className={`px-3 py-0 `}
    >
      <AccordionTrigger className="!no-underline font-semibold">Typography</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-3 ">
        {/* 1st Txt align */}
        <div className="flex items-center">
          <p className="text-muted-foreground text-xs w-20">Align</p>
          <Tabs
            className="flex-1"
            onValueChange={(e) => updateStyle("textAlign", e)}
            defaultValue={selectedElement?.style?.textAlign || "left"}
          >
            <TabsList className="p-[2px] flex items-center flex-row justify-between border-[1px] rounded-md bg-[#272727] h-fit flex-1">
              <TabsTrigger
                value="left"
                className="w-6 h-[24.4px] p-0 data-[state=active]:bg-zinc-950"
              >
                <AlignLeft size={15} />
              </TabsTrigger>
              <TabsTrigger
                value="right"
                className="w-6 h-[24.4px] p-0 data-[state=active]:bg-zinc-950"
              >
                <AlignRight size={15} />
              </TabsTrigger>
              <TabsTrigger
                value="center"
                className="w-6 h-[24.4px] p-0 data-[state=active]:bg-zinc-950"
              >
                <AlignCenter size={15} />
              </TabsTrigger>
              <TabsTrigger
                value="justify"
                className="w-6 h-[24.4px] p-0 data-[state=active]:bg-zinc-950 "
              >
                <AlignJustify size={15} />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        {/* 2nd font family */}
        <div className="flex items-center ">
          <p className="text-muted-foreground text-xs w-20">Font 🌟</p>
          <Input
            className="w-[136px]"
            placeholder="Default"
            id="DM Sans"
            onChange={(e) => updateStyle(e.target.id, e.target.value)}
            defaultValue={selectedElement?.style?.fontFamily}
          />
        </div>
        {/* 3rd color */}
        <div className="flex items-center">
          <p className="text-muted-foreground text-xs w-20">Color</p>
          <div
            className={
              "flex flex-1 h-[30px] rounded-md border-2 group hover:border-[#6A6A6A] pr-0.5 bg-[#272727] items-center text-xs shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none    disabled:cursor-not-allowed disabled:opacity-50 "
            }
          >
            <div className=" overflow-hidden h-full rounded-l-[7px] w-[39px] mr-2">
              <input
                className="h-12 -mt-2 border-2 group-hover:border-[#6A6A6A] transition-colors border-r-0 hover:border-[#6A6A6A] bg-[#272727] -ml-[8px] rounded-l"
                type="color"
                id="color"
                placeholder="transparent"
                onChange={(e) => updateStyle(e.target.id, e.target.value)}
                defaultValue={selectedElement?.style?.color || ""}
              />
            </div>
            <input
              className="h-[30px] w-20 border-y-2  group-hover:border-[#6A6A6A] bg-[#272727] items-center text-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none   disabled:cursor-not-allowed disabled:opacity-50 "
              id="color"
              placeholder="transparent"
              onChange={(e) => updateStyle(e.target.id, e.target.value)}
              defaultValue={selectedElement?.style?.color || ""}
            />
          </div>
        </div>
        {/* 4th weight and size */}
        <div className="w-full flex items-center">
          <p className="text-muted-foreground text-xs w-20">Weight</p>
          <Select
            onValueChange={(e) => {
              updateStyle("fontWeight", e);
            }}
            defaultValue={selectedElement?.style?.fontWeight?.toString() || ""}
          >
            <SelectTrigger className="flex-1 px-2 !h-[32px] border-2 border-[#272727] text-xs">
              <SelectValue placeholder={selectedElement?.style?.fontWeight || "Select a weight"} />
            </SelectTrigger>
            <SelectContent className="text-xs">
              <SelectGroup className="text-xs">
                <SelectLabel className="text-xs">Font Weights</SelectLabel>
                {[900, 800, 700, 600, 500, 400, 300, 200, 100].map((weight) => (
                  <SelectItem
                    key={weight}
                    className="text-xs"
                    value={weight.toString()}
                  >
                    {weight}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full flex items-center">
          <p className=" text-muted-foreground text-xs w-20">Size</p>
          <Input
            className="w-[136px]"
            placeholder="px"
            id="fontSize"
            onChange={(e) => updateStyle(e.target.id, e.target.value)}
            defaultValue={selectedElement?.style?.fontSize || ""}
          />
        </div>
        {/* line height and letter spaccing */}
        <div className="flex items-start">
          <p className="text-muted-foreground text-xs w-20">Height</p>
          <Input
            className="w-[136px]"
            id="lineHeight"
            placeholder="auto"
            onChange={(e) => updateStyle(e.target.id, e.target.value)}
            defaultValue={selectedElement?.style?.lineHeight || ""}
          />
        </div>
        <div className="flex items-start">
          <p className="text-muted-foreground text-xs w-20">Spaecing</p>
          <Input
            className="w-[136px]"
            placeholder="auto"
            id="letterSpacing"
            onChange={(e) => updateStyle(e.target.id, e.target.value)}
            defaultValue={selectedElement?.style?.letterSpacing || ""}
          />
        </div>
        <div className="flex items-center">
          <p className="text-muted-foreground text-xs w-20">Decoration</p>

          <Tabs
            className="flex-1"
            onValueChange={(e) => updateStyle("textDecoration", e)}
            defaultValue={String(selectedElement?.style?.textDecoration || "none")}
          >
            <TabsList className="p-[2px] flex items-center flex-row justify-between border-[2px] rounded-md bg-[#272727] h-fit flex-1">
              <TabsTrigger
                value="none"
                className="w-6 h-[24.4px] p-0 data-[state=active]:bg-zinc-950"
              >
                <CircleOff size={13} />
              </TabsTrigger>
              <TabsTrigger
                value="underline"
                className="w-6 h-[24.4px] p-0 data-[state=active]:bg-zinc-950"
              >
                <Underline size={15} />
              </TabsTrigger>
              <TabsTrigger
                value="italic"
                className="w-6 h-[24.4px] p-0 data-[state=active]:bg-zinc-950"
              >
                🌟
              </TabsTrigger>
              <TabsTrigger
                value="overline"
                className="w-6 h-[24.4px] p-0 data-[state=active]:bg-zinc-950"
              >
                <AlignCenter size={15} />
              </TabsTrigger>
              <TabsTrigger
                value="line-through"
                className="w-6 h-[24.4px] p-0 data-[state=active]:bg-zinc-950 "
              >
                <AlignJustify size={15} />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default TypographySection;
