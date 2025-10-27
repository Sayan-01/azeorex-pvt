"use client";
import React, { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  AlignCenter,
  AlignHorizontalJustifyCenterIcon,
  AlignHorizontalJustifyEndIcon,
  AlignHorizontalJustifyStart,
  AlignHorizontalSpaceAround,
  AlignHorizontalSpaceBetween,
  AlignJustify,
  AlignLeft,
  AlignRight,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyEnd,
  AlignVerticalJustifyStart,
  AlignVerticalSpaceBetween,
  ArrowRightLeft,
  Blinds,
  BoxSelect,
  ChevronsLeftRightIcon,
  CircleOff,
  DraftingCompass,
  Eye,
  EyeClosed,
  Link,
  LucideImageDown,
  Mouse,
  MoveDown,
  MoveHorizontal,
  MoveRight,
  MoveVertical,
  Spline,
  Underline,
  X,
} from "lucide-react";
import { PiAngleBold, PiAngleDuotone } from "react-icons/pi";
import { Tabs, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useEditor } from "../../../../../../providers/editor/editor-provider";
import PM from "@/icons/p-m";
import Position from "@/icons/position";
import { Angle } from "@/icons/angle";
import { Input } from "@/components/ui/custom-input";

import { SwatchBook } from "lucide-react";
import { useNewEditor } from "../../../../../../providers/newPeovider";
import { Button } from "@/components/ui/button";
// import { overlayEvent } from "../../editor";

function SettingsTab() {
  const { selectedElement } = useNewEditor();
  const [classes, setClasses] = useState<string[]>([]);
  const [newClass, setNewClass] = useState("");
  const [align, setAlign] = React.useState(selectedElement?.style?.textAlign);
  const { state, dispatch } = useEditor();

  const handleOnChanges = (property: string, value: string) => {
    if (selectedElement) {
      selectedElement.style[property as any] = value;

      // Force overlay after style change
      requestAnimationFrame(() => {
        // Trigger a custom event that the editor can listen to
        if (selectedElement) {
          selectedElement.dispatchEvent(new CustomEvent('styleChanged', {
            detail: { property, value }
          }));
        }
      });
    }
  };

  // Update alignment style when toggled
  React.useEffect(() => {
    if (selectedElement && align) {
      selectedElement.style.textAlign = align;
    }
  }, [align, selectedElement]);

  // Keep in sync if element classes are modified elsewhere
  useEffect(() => {
    if (!selectedElement) return;

    // set initial classes
    const currentClasses = selectedElement.className.split(" ").filter((c) => c.trim() !== "");
    setClasses(currentClasses);

    // watch for future class changes
    const observer = new MutationObserver(() => {
      const updated = selectedElement.className.split(" ").filter((c) => c.trim() !== "");
      setClasses(updated);
    });

    observer.observe(selectedElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [selectedElement]);

  // Remove a class
  const removeClass = (cls: string) => {
    const updated = classes.filter((c) => c !== cls);
    setClasses(updated);
    // selectedElement?.className = updated.join(" ");
  };

  // Add new class
  const addClass = () => {
    const trimmed = newClass.trim();
    if (!trimmed) return;
    if (!classes.includes(trimmed)) {
      const updated = [...classes, trimmed];
      setClasses(updated);
    //   selectedElement?.className = updated.join(" ");
    }
    setNewClass("");
  };

  if (!state.selectedElement) {
    return (
      <div className="h-full flex items-center justify-center bg-editor-bcgc p-4">
        <p className="text-center opacity-80 text-sm">For sidebar access plese select item at first</p>
      </div>
    );
  } else {
    return (
      <Accordion
        type="multiple"
        className={`w-[240px] select-none bg-editor-bcgc pb-10 `}
        defaultValue={["Dimensions", "Typography", "Spacing", "Position", "Background", "Decorations", "Flexbox", "Special element", "Classes"]}
      >
        <div>
          {/* <AccordionItem
          value="Special element"
          className="px-3 py-0  "
        >
          <AccordionTrigger className="!no-underline font-semibold">Special element</AccordionTrigger>
          <AccordionContent className="pb-0">
            {state.selectedElementOuterHTML.type === "link" && !Array.isArray(state.selectedElementOuterHTML.content) && (
              <div className="flex gap-2">
                <div className="flex items-center pb-4">
                  <p className="text-muted-foreground text-xs w-20">Link Path</p>
                  <Input
                    id="href"
                    placeholder="https:domain.example.com/pathname"
                    onChange={handleChangeCustomValues}
                    value={state.selectedElementOuterHTML.content.href}
                  />
                </div>
              </div>
            )}
          </AccordionContent>
          <AccordionContent className="pb-0">
            {state.selectedElementOuterHTML.type === "image" && !Array.isArray(state.selectedElementOuterHTML.content) && (
              <div className="flex gap-2">
                <div className="flex items-center pb-4">
                  <p className="text-muted-foreground text-xs w-20">Link Path</p>
                  <Input
                    id="src"
                    placeholder="https:domain.example.com/pathname"
                    onChange={handleChangeCustomValues}
                    value={state.selectedElementOuterHTML.content.src}
                  >
                    <Link size={13} />
                  </Input>
                </div>
              </div>
            )}
          </AccordionContent>
        </AccordionItem> */}
        </div>
        <AccordionItem
          value="Dimensions"
          className="px-3 py-0  "
        >
          <AccordionTrigger className="!no-underline font-semibold">Dimensions</AccordionTrigger>
          <AccordionContent>
            {/* width nad height */}
            <div className="flex gap-2 mb-2">
              <div className="flex flex-col">
                <Input
                  placeholder="Auto"
                  id="width"
                  defaultValue={selectedElement?.style.width || ""}
                  onChange={(e) => handleOnChanges("width", e.target.value)}
                  children="W"
                />
              </div>
              <div className="flex flex-col">
                <Input
                  id="height"
                  placeholder="Auto"
                  onChange={(e) => handleOnChanges(e.target.id, e.target.value)}
                  defaultValue={selectedElement?.style.height || ""}
                  children="H"
                />
              </div>
            </div>
            {/* max W and H */}
            <div className="flex gap-2 mb-2">
              <div className="flex flex-col">
                <Input
                  placeholder="Auto"
                  id="maxWidth"
                  onChange={(e) => handleOnChanges(e.target.id, e.target.value)}
                  defaultValue={selectedElement?.style.maxWidth || ""}
                  // children="X"
                >
                  <MoveHorizontal size={13} />
                </Input>
              </div>
              <div className="flex flex-col">
                <Input
                  id="maxHeight"
                  placeholder="Auto"
                  onChange={(e) => handleOnChanges(e.target.id, e.target.value)}
                  defaultValue={selectedElement?.style.maxHeight || ""}
                  // children="Y"
                >
                  <MoveVertical size={13} />
                </Input>
              </div>
            </div>
            {/* Angle and rotation */}
            <div className="flex gap-2 mb-2">
              <div className="flex flex-col w-full">
                <Input
                  id="rotate"
                  placeholder="0deg"
                  onChange={(e) => handleOnChanges(e.target.id, e.target.value)}
                  defaultValue={selectedElement?.style?.rotate || ""}
                >
                  <Angle />
                </Input>
              </div>
              <div className="flex flex-col w-full">
                <Input
                  id="borderRadius"
                  placeholder="0px"
                  onChange={(e) => handleOnChanges(e.target.id, e.target.value)}
                  defaultValue={selectedElement?.style?.borderRadius || ""}
                >
                  <Spline size={13} />
                </Input>
              </div>
            </div>
            {/* 3rd radius and opacity*/}
            {/* <div className="flex gap-2 mb-4">
            <div className="flex flex-col w-full">
              <p className="text-muted-foreground text-xs">Border Radius</p>
              <Input
                id="borderRadius"
                placeholder="0px"
                                  onChange={(e) => handleOnChanges(e.target.id, e.target.value)}

                defaultValue={selectedElement?.style?.borderRadius || ""}
              />
            </div>
            <div className="w-full">
              <p className="text-muted-foreground text-xs w-full">B Radius</p>
              <div className="flex items-center justify-end">
                <small className="pb-[16px] pt-[9px] -mt-[26px] text-xs">
                  {typeof selectedElement??style?..borderRadius === "number"
                    ? selectedElement??style?..borderRadius
                    : parseFloat((selectedElement??style?..borderRadius || "0").replace("px", "")) || 0}
                  px
                </small>
              </div>
              <Slider
                onValueChange={(e) => {
                  handleOnChanges({
                    target: {
                      id: "borderRadius",
                      value: `${e[0]}px`,
                    },
                  });
                }}
                defaultValue={[
                  typeof selectedElement??style?..borderRadius === "number"
                    ? selectedElement??style?..borderRadius
                    : parseFloat((selectedElement??style?..borderRadius || "0").replace("%", "")) || 0,
                ]}
                max={100}
                step={1}
              />
            </div>

            <div className="w-full">
              <p className="text-muted-foreground text-xs">Opacity</p>
              <div className="flex items-center justify-end">
                <small className="pb-[16px] pt-[9px] -mt-[26px] text-xs">
                  {typeof selectedElement??style?..opacity === "number"
                    ? selectedElement??style?..opacity
                    : parseFloat((selectedElement??style?..opacity || "100").replace("%", "")) || 0}
                  %
                </small>
              </div>
              <Slider
                onValueChange={(e) => {
                  handleOnChanges({
                    target: {
                      id: "opacity",
                      value: `${e[0]}%`,
                    },
                  });
                }}
                defaultValue={[
                  typeof selectedElement??style?..opacity === "number"
                    ? selectedElement??style?..opacity
                    : parseFloat((selectedElement??style?..opacity || "100").replace("%", "")) || 0,
                ]}
                max={100}
                step={1}
              />
            </div>
          </div> */}
            <div className="flex gap-2">
              <div className="flex flex-col w-full">
                <Input
                  id="opacity"
                  placeholder="100%"
                  onChange={(e) => handleOnChanges(e.target.id, e.target.value)}
                  defaultValue={selectedElement?.style?.opacity || ""}
                >
                  <BoxSelect size={13} />
                </Input>
              </div>
              <div className="flex flex-col w-full">
                <Tabs
                  onValueChange={(e) => handleOnChanges("overflow", e)}
                  defaultValue={selectedElement?.style?.overflow || "visible"}
                >
                  <TabsList className="p-[2px] flex items-center flex-row justify-between border-[1px] rounded-md bg-[#272727] h-fit gap-0">
                    <TabsTrigger
                      value="visible"
                      className="w-10 h-[24.4px] p-0 data-[state=active]:bg-zinc-950"
                    >
                      <Eye
                        size={13}
                        // color="#a1a1aa"
                      />
                    </TabsTrigger>
                    <TabsTrigger
                      value="hidden"
                      className="w-10 h-[24.4px] p-0 data-[state=active]:bg-zinc-950"
                    >
                      <EyeClosed
                        size={13}
                        // color="#a1a1aa"
                      />
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            {/* overflow */}
            {/* <div className="flex flex-col">
            <p className="text-muted-foreground text-xs mb-2">Overflow</p>
            <Tabs
              onValueChange={(e) =>
                handleOnChanges({
                  target: {
                    id: "overflow",
                    value: e,
                  },
                })
              }
              value={selectedElement?.style?.overflow || "visible"}
            >
              <TabsList className="p-[2px] flex items-center flex-row justify-between border-[1px] rounded-md bg-[#272727] h-fit gap-0">
                <TabsTrigger
                  value="visible"
                  className="w-10 h-[24.4px] p-0 data-[state=active]:bg-zinc-950"
                >
                  <Eye size={15} />
                </TabsTrigger>
                <TabsTrigger
                  value="hidden"
                  className="w-10 h-[24.4px] p-0 data-[state=active]:bg-zinc-950"
                >
                  <EyeClosed size={15} />
                </TabsTrigger>
                <TabsTrigger
                  value="scroll"
                  className="w-10 h-[24.4px] p-0 data-[state=active]:bg-zinc-950"
                >
                  <Mouse size={15} />
                </TabsTrigger>
                <TabsTrigger
                  value="auto"
                  className="w-10 h-[24.4px] p-0 data-[state=active]:bg-zinc-950 "
                >
                  <Blinds size={15} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div> */}
          </AccordionContent>
        </AccordionItem>
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
                onValueChange={(e) => handleOnChanges("textAlign", e)}
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
                onChange={(e) => handleOnChanges(e.target.id, e.target.value)}
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
                    onChange={(e) => handleOnChanges(e.target.id, e.target.value)}
                    defaultValue={selectedElement?.style?.color || ""}
                  />
                </div>
                <input
                  className="h-[30px] w-20 border-y-2  group-hover:border-[#6A6A6A] bg-[#272727] items-center text-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none   disabled:cursor-not-allowed disabled:opacity-50 "
                  id="color"
                  placeholder="transparent"
                  onChange={(e) => handleOnChanges(e.target.id, e.target.value)}
                  defaultValue={selectedElement?.style?.color || ""}
                />
              </div>
            </div>
            {/* 4th weight and size */}
            <div className="w-full flex items-center">
              <p className="text-muted-foreground text-xs w-20">Weight</p>
              <Select
                onValueChange={(e) => {
                  handleOnChanges("fontWeight", e);
                }}
                defaultValue={selectedElement?.style?.fontWeight?.toString() || ""}
              >
                <SelectTrigger className="flex-1 px-2 !h-[30px] border-2 border-[#272727] text-xs">
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
                onChange={(e) => handleOnChanges(e.target.id, e.target.value)}
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
                onChange={(e) => handleOnChanges(e.target.id, e.target.value)}
                defaultValue={selectedElement?.style?.lineHeight || ""}
              />
            </div>
            <div className="flex items-start">
              <p className="text-muted-foreground text-xs w-20">Spaecing</p>
              <Input
                className="w-[136px]"
                placeholder="auto"
                id="letterSpacing"
                onChange={(e) => handleOnChanges(e.target.id, e.target.value)}
                defaultValue={selectedElement?.style?.letterSpacing || ""}
              />
            </div>
            <div className="flex items-center">
              <p className="text-muted-foreground text-xs w-20">Decoration</p>

              <Tabs
                className="flex-1"
                onValueChange={(e) => handleOnChanges("textDecoration", e)}
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
                onChange={(e) => handleOnChanges(e.target.id, e.target.value)}
                defaultValue={selectedElement?.style?.marginTop || ""}
              />
              <input
                className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none bottom-1 left-1/2 -translate-x-1/2"
                placeholder="16px"
                id="marginBottom"
                onChange={(e) => handleOnChanges(e.target.id, e.target.defaultValue)}
                defaultValue={selectedElement?.style?.marginBottom || ""}
              />
              <input
                className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1/2 -translate-y-1/2"
                placeholder="16px"
                id="marginLeft"
                onChange={(e) => handleOnChanges(e.target.id, e.target.defaultValue)}
                defaultValue={selectedElement?.style?.marginLeft || ""}
              />
              <input
                className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1/2 right-0 -translate-y-1/2"
                placeholder="16px"
                id="marginRight"
                onChange={(e) => handleOnChanges(e.target.id, e.target.defaultValue)}
                defaultValue={selectedElement?.style?.marginRight || ""}
              />
              <input
                className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-8 left-1/2 -translate-x-1/2"
                placeholder="16px"
                id="paddingTop"
                onChange={(e) => handleOnChanges(e.target.id, e.target.defaultValue)}
                defaultValue={selectedElement?.style?.paddingTop || ""}
              />
              <input
                className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none bottom-8 left-1/2 -translate-x-1/2"
                placeholder="16px"
                id="paddingBottom"
                onChange={(e) => handleOnChanges(e.target.id, e.target.defaultValue)}
                defaultValue={selectedElement?.style?.paddingBottom || ""}
              />
              <input
                className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1/2 left-9 -translate-y-1/2"
                placeholder="16px"
                id="paddingLeft"
                onChange={(e) => handleOnChanges(e.target.id, e.target.defaultValue)}
                defaultValue={selectedElement?.style?.paddingLeft || ""}
              />
              <input
                className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1/2 right-9 -translate-y-1/2"
                placeholder="16px"
                id="paddingRight"
                onChange={(e) => handleOnChanges(e.target.id, e.target.defaultValue)}
                defaultValue={selectedElement?.style?.paddingRight || ""}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="Position"
          className=" px-3 py-0"
        >
          <AccordionTrigger className="!no-underline font-semibold">Position</AccordionTrigger>
          <AccordionContent>
            <Tabs
              onValueChange={(e) => handleOnChanges("position", e)}
              defaultValue={selectedElement?.style?.position || "relative"}
            >
              <TabsList className="p-[2px] flex items-center flex-row justify-between border-[2px] rounded-md bg-[#272727] h-fit gap-2">
                {/* <TabsTrigger
                value="static"
                className="w-10 h-[24.4px] p-0 data-[state=active]:bg-zinc-950"
                // disabled
              >
                <X size={15} />
              </TabsTrigger> */}
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
                onChange={(e) => handleOnChanges(e.target.id, e.target.value)}
                defaultValue={selectedElement?.style?.top || ""}
              />
              <input
                className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none bottom-1 left-1/2 -translate-x-1/2"
                placeholder="auto"
                id="bottom"
                onChange={(e) => handleOnChanges(e.target.id, e.target.defaultValue)}
                defaultValue={selectedElement?.style?.bottom || ""}
              />
              <input
                className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1/2 -translate-y-1/2"
                placeholder="auto"
                id="left"
                onChange={(e) => handleOnChanges(e.target.id, e.target.defaultValue)}
                defaultValue={selectedElement?.style?.left || ""}
              />
              <input
                className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1/2 right-0 -translate-y-1/2"
                placeholder="auto"
                id="right"
                onChange={(e) => handleOnChanges(e.target.id, e.target.defaultValue)}
                defaultValue={selectedElement?.style?.right || ""}
              />
              <div className=" absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex ">
                <p className=" text-muted-foreground text-xs ">z-index: </p>
                <input
                  className="w-5 text-xs text-center text-sky-300 bg-transparent border-none outline-none"
                  placeholder="0"
                  id="zIndex"
                  onChange={(e) => handleOnChanges(e.target.id, e.target.defaultValue)}
                  defaultValue={selectedElement?.style?.zIndex || ""}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

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
                    onChange={(e) => handleOnChanges(e.target.id, e.target.value)}
                    defaultValue={selectedElement?.style?.backgroundColor || ""}
                  />
                </div>
                <input
                  className="h-[30px] w-20 border-y-2  group-hover:border-[#6A6A6A] bg-[#272727] items-center text-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none   disabled:cursor-not-allowed disabled:opacity-50 "
                  id="backgroundColor"
                  placeholder="transparent"
                  onChange={(e) => handleOnChanges(e.target.id, e.target.defaultValue)}
                  defaultValue={selectedElement?.style?.backgroundColor || ""}
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
                onChange={(e) => handleOnChanges(e.target.id, e.target.defaultValue)}
                defaultValue={selectedElement?.style?.filter || 0}
              />
            </div>
            {/* 3rd bcg image */}
            <div className="flex items-center">
              <p className=" text-muted-foreground text-xs w-20">Image</p>
              <div className="flex flex-1  rounded-md group">
                <div
                  className="w-10 border-2 group-hover:border-[#6a6a6a]  transition-colors border-main-black !rounded-l-md border-r-0"
                  style={{
                    backgroundImage: selectedElement?.style?.backgroundImage,
                  }}
                />
                <Input
                  placeholder="url()"
                  className="mt-0 flex-1 !rounded-l-[0px] hover:border-l-none group-hover:border-[#6a6a6a]"
                  id="backgroundImage"
                  onChange={(e) => handleOnChanges(e.target.id, e.target.defaultValue)}
                  defaultValue={selectedElement?.style?.backgroundImage || ""}
                />
              </div>
            </div>
            {/* image position */}
            <div className="flex items-center">
              <p className=" text-muted-foreground text-xs w-20">Position</p>
              <Tabs
                className="flex-1"
                onValueChange={(e) => handleOnChanges("backgroundSize", e)}
                defaultValue={selectedElement?.style?.backgroundSize?.toString() || "cover"}
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
        <AccordionItem
          value="Flexbox"
          className="px-3 py-0"
        >
          <AccordionTrigger className="!no-underline font-semibold">Auto Layout</AccordionTrigger>
          <AccordionContent>
            <div className="w-full flex items-center mb-3">
              <p className=" text-muted-foreground text-xs w-20">Display</p>

              <Tabs
                className="flex-1"
                onValueChange={(e) => handleOnChanges("display", e)}
                defaultValue={selectedElement?.style?.display || "block"}
              >
                <TabsList className="p-[2px] flex items-center flex-row justify-between border-[2px] rounded-md bg-[#272727] h-fit">
                  <TabsTrigger
                    value="flex"
                    className="w-full h-[24.4px] text-xs p-0 data-[state=active]:bg-zinc-950"
                  >
                    F
                  </TabsTrigger>
                  <TabsTrigger
                    value="block"
                    className="w-full h-[24.4px] text-xs p-0 data-[state=active]:bg-zinc-950"
                  >
                    B
                  </TabsTrigger>
                  <TabsTrigger
                    value="grid"
                    className="w-full h-[24.4px] text-xs p-0 data-[state=active]:bg-zinc-950"
                  >
                    G
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="w-full flex items-center">
              <p className=" text-muted-foreground text-xs w-20"> Direction</p>
              <Tabs
                className="flex-1"
                onValueChange={(e) => handleOnChanges("flexFlow", e)}
                defaultValue={selectedElement?.style?.flexFlow || "row"}
              >
                <TabsList className="p-[2px] flex items-center flex-row justify-between border-[2px] rounded-md bg-[#272727] h-fit">
                  <TabsTrigger
                    value="row"
                    className="w-full h-[24.4px] p-0 data-[state=active]:bg-zinc-950"
                  >
                    <MoveRight size={13} />
                  </TabsTrigger>
                  <TabsTrigger
                    value="column"
                    className="w-full h-[24.4px] p-0 data-[state=active]:bg-zinc-950"
                  >
                    <MoveDown size={13} />
                  </TabsTrigger>
                  <TabsTrigger
                    value="wrap"
                    className="w-full h-[24.4px] p-0 data-[state=active]:bg-zinc-950"
                  >
                    <ArrowRightLeft size={13} />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className={`${selectedElement?.style?.display === "flex" ? "block" : "hidden"} mt-3`}>
              <div className="flex items-center mb-3">
                <p className="text-muted-foreground text-xs w-20">{selectedElement?.style?.flexFlow === "column" ? "Align Y" : "Align X"}</p>
                <Tabs
                  className="flex-1"
                  onValueChange={(e) => handleOnChanges("justifyContent", e)}
                  defaultValue={selectedElement?.style?.justifyContent || "center"}
                >
                  <TabsList className="p-[2px] flex items-center flex-row justify-between border-[2px] rounded-md bg-[#272727] h-fit">
                    <TabsTrigger
                      value="space-between"
                      className="w-6 h-[24.4px] p-0 data-[state=active]:bg-zinc-950"
                    >
                      <AlignHorizontalSpaceBetween size={13} />
                    </TabsTrigger>
                    <TabsTrigger
                      value="space-evenly"
                      className="w-6 h-[24.4px] p-0 data-[state=active]:bg-zinc-950"
                    >
                      <AlignHorizontalSpaceAround size={13} />
                    </TabsTrigger>
                    <TabsTrigger
                      value="center"
                      className="w-6 h-[24.4px] p-0 data-[state=active]:bg-zinc-950"
                    >
                      <AlignHorizontalJustifyCenterIcon size={13} />
                    </TabsTrigger>
                    <TabsTrigger
                      value="start"
                      className="w-6 h-[24.4px] p-0 data-[state=active]:bg-zinc-950 "
                    >
                      <AlignHorizontalJustifyStart size={13} />
                    </TabsTrigger>
                    <TabsTrigger
                      value="end"
                      className="w-6 h-[24.4px] p-0 data-[state=active]:bg-zinc-950 "
                    >
                      <AlignHorizontalJustifyEndIcon size={13} />
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="flex items-center mb-3">
                <p className="text-muted-foreground text-xs w-20">{selectedElement?.style?.flexFlow === "column" ? "Align X" : "Align Y"}</p>
                <Tabs
                  className="flex-1"
                  onValueChange={(e) => handleOnChanges("alignItems", e)}
                  defaultValue={selectedElement?.style?.alignItems || "normal"}
                >
                  <TabsList className="p-[2px] flex items-center flex-row justify-between border-[2px] rounded-md bg-[#272727] h-fit ">
                    <TabsTrigger
                      value="center"
                      className="w-6 h-[24.4px] p-0 data-[state=active]:bg-zinc-950"
                    >
                      <AlignVerticalJustifyCenter size={13} />
                    </TabsTrigger>
                    <TabsTrigger
                      value="normal"
                      className="w-6 h-[24.4px] p-0 data-[state=active]:bg-zinc-950"
                    >
                      <AlignVerticalJustifyStart size={13} />
                    </TabsTrigger>
                    <TabsTrigger
                      value="end"
                      className="w-6 h-[24.4px] p-0 data-[state=active]:bg-zinc-950"
                    >
                      <AlignVerticalJustifyEnd size={13} />
                    </TabsTrigger>
                    <TabsTrigger
                      value="stretch"
                      className="w-6 h-[24.4px] p-0 data-[state=active]:bg-zinc-950 "
                    >
                      <AlignVerticalSpaceBetween size={13} />
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="w-full flex items-center">
                <p className=" text-muted-foreground text-xs w-20">Gap</p>
                <Input
                  className="w-[136px]"
                  placeholder="0"
                  id="gap"
                  onChange={(e) => handleOnChanges(e.target.id, e.target.value)}
                  defaultValue={selectedElement?.style?.gap || ""}
                />
              </div>
              {/* <FlexBoxComponent/> */}
              <div className="w-[136px] h-[68px] bg-[#272727] rounded-md grid grid-cols-3 p-1">
                <Tabs
                  onValueChange={(e) => {
                    switch (e) {
                      case "justify-start-align-start":
                        handleOnChanges("justifyContent", "start");
                        handleOnChanges("alignItems", "start");

                        break;

                      case "justify-center-align-start":
                        handleOnChanges("justifyContent", "center");
                        handleOnChanges("alignItems", "start");
                        break;

                      case "justify-end-align-start":
                        handleOnChanges("justifyContent", "end");
                        handleOnChanges("alignItems", "start");
                        break;

                      case "justify-start-align-center":
                        handleOnChanges("justifyContent", "start");
                        handleOnChanges("alignItems", "center");
                        break;

                      case "justify-center-align-center":
                        handleOnChanges("justifyContent", "center");
                        handleOnChanges("alignItems", "center");
                        break;

                      case "justify-end-align-center":
                        handleOnChanges("justifyContent", "end");
                        handleOnChanges("alignItems", "center");
                        break;

                      case "justify-start-align-end":
                        handleOnChanges("justifyContent", "start");
                        handleOnChanges("alignItems", "end");
                        break;

                      case "justify-center-align-end":
                        handleOnChanges("justifyContent", "center");
                        handleOnChanges("alignItems", "end");
                        break;

                      case "justify-end-align-end":
                        handleOnChanges("justifyContent", "end");
                        handleOnChanges("alignItems", "end");
                        break;

                      default:
                        break;
                    }
                  }}
                >
                  <TabsList className="border-[2px] w-[136px] h-[68px] bg-[#272727] rounded-md grid grid-cols-3 p-1">
                    <TabsTrigger
                      value="justify-start-align-start"
                      className="w-10 h-[24.4px] p-0"
                    >
                      <AlignHorizontalJustifyStart size={13} />
                    </TabsTrigger>
                    <TabsTrigger
                      value="justify-center-align-start"
                      className="w-10 h-[24.4px] p-0"
                    >
                      <AlignHorizontalSpaceBetween size={13} />
                    </TabsTrigger>
                    <TabsTrigger
                      value="justify-end-align-start"
                      className="w-10 h-[24.4px] p-0"
                    >
                      <AlignHorizontalSpaceAround size={13} />
                    </TabsTrigger>
                    <TabsTrigger
                      value="justify-start-align-center"
                      className="w-10 h-[24.4px] p-0"
                    >
                      <AlignHorizontalJustifyCenterIcon size={13} />
                    </TabsTrigger>
                    <TabsTrigger
                      value="justify-center-align-center"
                      className="w-10 h-[24.4px] p-0"
                    >
                      <AlignHorizontalJustifyEndIcon size={13} />
                    </TabsTrigger>
                    <TabsTrigger
                      value="justify-end-align-center"
                      className="w-10 h-[24.4px] p-0"
                    >
                      <AlignHorizontalJustifyStart size={13} />
                    </TabsTrigger>
                    <TabsTrigger
                      value="justify-start-align-end"
                      className="w-10 h-[24.4px] p-0"
                    >
                      <AlignHorizontalSpaceBetween size={13} />
                    </TabsTrigger>
                    <TabsTrigger
                      value="justify-center-align-end"
                      className="w-10 h-[24.4px] p-0"
                    >
                      <AlignHorizontalSpaceAround size={13} />
                    </TabsTrigger>
                    <TabsTrigger
                      value="justify-end-align-end"
                      className="w-10 h-[24.4px] p-0"
                    >
                      <AlignHorizontalJustifyCenterIcon size={13} />
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="Classes"
          className="px-3 py-0 border-none"
        >
          <AccordionTrigger className="!no-underline font-semibold">Classes</AccordionTrigger>
          <AccordionContent className="flex flex-wrap gap-2 mt-2">
            {classes.length > 0 ? (
              classes.map((cls) => (
                <span
                  key={cls}
                  className="flex text-xs items-center gap-1 px-2 py-1 rounded-full bg-zinc-800 border"
                >
                  {cls}
                  <button
                    onClick={() => removeClass(cls)}
                    className="ml-1 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-sm">No classes applied</span>
            )}
          </AccordionContent>

          <div className="flex gap-2 mt-3">
            <Input
              className="h-[30px]"
              value={newClass}
              onChange={(e) => setNewClass(e.target.value)}
              placeholder="Add class..."
            />
            <Button
              className="h-[30px]"
              type="button"
              onClick={addClass}
            >
              Add
            </Button>
          </div>
        </AccordionItem>
        {/* border & shadow */}
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
                onChange={(e) => handleOnChanges(e.target.id, e.target.value)}
                defaultValue={selectedElement?.style?.borderTopWidth || ""}
              />
              {/* Bottom Border */}
              <input
                className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none bottom-1 left-1/2 -translate-x-1/2"
                placeholder="0px"
                id="borderBottomWidth"
                onChange={(e) => handleOnChanges(e.target.id, e.target.defaultValue)}
                defaultValue={selectedElement?.style?.borderBottomWidth || ""}
              />
              {/* Left Border */}
              <input
                className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1/2 -translate-y-1/2"
                placeholder="0px"
                id="borderLeftWidth"
                onChange={(e) => handleOnChanges(e.target.id, e.target.defaultValue)}
                defaultValue={selectedElement?.style?.borderLeftWidth || ""}
              />
              {/* Right Border */}
              <input
                className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1/2 right-0 -translate-y-1/2"
                placeholder="0px"
                id="borderRightWidth"
                onChange={(e) => handleOnChanges(e.target.id, e.target.defaultValue)}
                defaultValue={selectedElement?.style?.borderRightWidth || ""}
              />
            </div>

            {/* Border Style */}
            <div className="flex items-center">
              <p className="text-muted-foreground text-xs w-20">Border Style</p>
              <Select
                onValueChange={(e) => handleOnChanges("borderStyle", e)}
                defaultValue={selectedElement?.style?.borderStyle || "solid"}
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
                    onChange={(e) => handleOnChanges(e.target.id, e.target.value)}
                    defaultValue={selectedElement?.style?.borderColor || ""}
                  />
                </div>
                <input
                  className="h-[30px] w-20 border-y-2 group-hover:border-[#6A6A6A] bg-[#272727] items-center text-xs shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  id="borderColor"
                  placeholder="transparent"
                  onChange={(e) => handleOnChanges(e.target.id, e.target.defaultValue)}
                  defaultValue={selectedElement?.style?.borderColor || ""}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <div className="h-10"></div>
      </Accordion>
    );
  }
}

export default SettingsTab;