"use client";
import React from "react";
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
import { useEditor } from "../../../../../../../../providers/editor/editor-provider";
import PM from "@/icons/p-m";
import Position from "@/icons/position";
import { Angle } from "@/icons/angle";
import { Input } from "@/components/ui/custom-input";
import FlexBoxComponent from "./flex-box-component";
import ColorPicker from "./ColorPicker";

const SettingsTab = () => {
  const { state, dispatch } = useEditor();
  const handleOnChanges = (e: any) => {
    const styleSettings = e.target.id;
    let value = e.target.value;
    const styleObject = {
      [styleSettings]: value,
    };

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          styles: {
            ...state.editor.selectedElement.styles,
            ...styleObject,
          },
        },
      },
    });
  };

  const handleChangeCustomValues = (e: any) => {
    const settingProperty = e.target.id;
    let value = e.target.value;
    const styleObject = {
      [settingProperty]: value,
    };

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          content: {
            ...state.editor.selectedElement.content,
            ...styleObject,
          },
        },
      },
    });
  };

  if (state.editor.selectedElement.type === null) {
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
        defaultValue={["Dimensions", "Typography", "Spacing", "Position", "Background", "Decorations", "Flexbox", "Special element"]}
      >
        <AccordionItem
          value="Special element"
          className="px-3 py-0  "
        >
          <AccordionTrigger className="!no-underline font-semibold">Special element</AccordionTrigger>
          <AccordionContent className="pb-0">
            {state.editor.selectedElement.type === "link" && !Array.isArray(state.editor.selectedElement.content) && (
              <div className="flex gap-2">
                <div className="flex items-center pb-4">
                  <p className="text-muted-foreground text-xs w-20">Link Path</p>
                  <Input
                    id="href"
                    placeholder="https:domain.example.com/pathname"
                    onChange={handleChangeCustomValues}
                    value={state.editor.selectedElement.content.href}
                  />
                </div>
              </div>
            )}
          </AccordionContent>
          <AccordionContent className="pb-0">
            {state.editor.selectedElement.type === "image" && !Array.isArray(state.editor.selectedElement.content) && (
              <div className="flex gap-2">
                <div className="flex items-center pb-4">
                  <p className="text-muted-foreground text-xs w-20">Link Path</p>
                  <Input
                    id="src"
                    placeholder="https:domain.example.com/pathname"
                    onChange={handleChangeCustomValues}
                    value={state.editor.selectedElement.content.src}
                  >
                    <Link size={13} />
                  </Input>
                </div>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
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
                  onChange={handleOnChanges}
                  value={state.editor.selectedElement.styles.width || ""}
                  children="W"
                />
              </div>
              <div className="flex flex-col">
                <Input
                  id="height"
                  placeholder="Auto"
                  onChange={handleOnChanges}
                  value={state.editor.selectedElement.styles.height || ""}
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
                  onChange={handleOnChanges}
                  value={state.editor.selectedElement.styles.maxWidth || ""}
                  // children="X"
                >
                  <MoveHorizontal size={13} />
                </Input>
              </div>
              <div className="flex flex-col">
                <Input
                  id="maxHeight"
                  placeholder="Auto"
                  onChange={handleOnChanges}
                  value={state.editor.selectedElement.styles.maxHeight || ""}
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
                  onChange={handleOnChanges}
                  value={state.editor.selectedElement.styles.rotate || ""}
                >
                  <Angle />
                </Input>
              </div>
              <div className="flex flex-col w-full">
                <Input
                  id="borderRadius"
                  placeholder="0px"
                  onChange={handleOnChanges}
                  value={state.editor.selectedElement.styles.borderRadius || ""}
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
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.borderRadius || ""}
              />
            </div>
            <div className="w-full">
              <p className="text-muted-foreground text-xs w-full">B Radius</p>
              <div className="flex items-center justify-end">
                <small className="pb-[16px] pt-[9px] -mt-[26px] text-xs">
                  {typeof state.editor.selectedElement.styles?.borderRadius === "number"
                    ? state.editor.selectedElement.styles?.borderRadius
                    : parseFloat((state.editor.selectedElement.styles?.borderRadius || "0").replace("px", "")) || 0}
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
                value={[
                  typeof state.editor.selectedElement.styles?.borderRadius === "number"
                    ? state.editor.selectedElement.styles?.borderRadius
                    : parseFloat((state.editor.selectedElement.styles?.borderRadius || "0").replace("%", "")) || 0,
                ]}
                max={100}
                step={1}
              />
            </div>

            <div className="w-full">
              <p className="text-muted-foreground text-xs">Opacity</p>
              <div className="flex items-center justify-end">
                <small className="pb-[16px] pt-[9px] -mt-[26px] text-xs">
                  {typeof state.editor.selectedElement.styles?.opacity === "number"
                    ? state.editor.selectedElement.styles?.opacity
                    : parseFloat((state.editor.selectedElement.styles?.opacity || "100").replace("%", "")) || 0}
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
                value={[
                  typeof state.editor.selectedElement.styles?.opacity === "number"
                    ? state.editor.selectedElement.styles?.opacity
                    : parseFloat((state.editor.selectedElement.styles?.opacity || "100").replace("%", "")) || 0,
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
                  onChange={handleOnChanges}
                  value={state.editor.selectedElement.styles.opacity || ""}
                >
                  <BoxSelect size={13} />
                </Input>
              </div>
              <div className="flex flex-col w-full">
                <Tabs
                  onValueChange={(e) =>
                    handleOnChanges({
                      target: {
                        id: "overflow",
                        value: e,
                      },
                    })
                  }
                  value={state.editor.selectedElement.styles.overflow || "visible"}
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
              value={state.editor.selectedElement.styles.overflow || "visible"}
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
        {state.editor.selectedElement.type === "text" || state.editor.selectedElement.type === "heading" ? (
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
                  onValueChange={(e) =>
                    handleOnChanges({
                      target: {
                        id: "textAlign",
                        value: e,
                      },
                    })
                  }
                  value={state.editor.selectedElement.styles.textAlign || "left"}
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
                  onChange={handleOnChanges}
                  value={state.editor.selectedElement.styles.fontFamily}
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
                  <div className=" overflow-hidden h-full rounded-l-[5px] w-[39px] mr-2">
                    <input
                      className="h-12 -mt-2 border-2 group-hover:border-[#6A6A6A] transition-colors border-r-0 hover:border-[#6A6A6A] bg-[#272727] -ml-[8px] rounded-l"
                      type="color"
                      id="color"
                      placeholder="transparent"
                      onChange={handleOnChanges}
                      value={state.editor.selectedElement.styles.color || ""}
                    />
                  </div>
                  <input
                    className="h-[30px] w-20 border-y-2  group-hover:border-[#6A6A6A] bg-[#272727] items-center text-xs shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none   disabled:cursor-not-allowed disabled:opacity-50 "
                    id="color"
                    placeholder="transparent"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.color || ""}
                  />
                </div>
              </div>
              {/* 4th weight and size */}
              <div className="w-full flex items-center">
                <p className="text-muted-foreground text-xs w-20">Weight</p>
                <Select
                  onValueChange={(e) => {
                    handleOnChanges({
                      target: {
                        id: "fontWeight",
                        value: e,
                      },
                    });
                  }}
                  value={state.editor.selectedElement.styles.fontWeight?.toString() || ""}
                >
                  <SelectTrigger className="flex-1 px-2 h-[30px] border-2 border-[#272727] text-xs">
                    <SelectValue placeholder={state.editor.selectedElement.styles.fontWeight || "Select a weight"} />
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
                  onChange={handleOnChanges}
                  value={state.editor.selectedElement.styles.fontSize || ""}
                />
              </div>
              {/* line height and letter spaccing */}
              <div className="flex items-start">
                <p className="text-muted-foreground text-xs w-20">Height</p>
                <Input
                  className="w-[136px]"
                  id="lineHeight"
                  placeholder="auto"
                  onChange={handleOnChanges}
                  value={state.editor.selectedElement.styles.lineHeight || ""}
                />
              </div>
              <div className="flex items-start">
                <p className="text-muted-foreground text-xs w-20">Spaecing</p>
                <Input
                  className="w-[136px]"
                  placeholder="auto"
                  id="letterSpacing"
                  onChange={handleOnChanges}
                  value={state.editor.selectedElement.styles.letterSpacing || ""}
                />
              </div>
              <div className="flex items-center">
                <p className="text-muted-foreground text-xs w-20">Decoration</p>

                <Tabs
                  className="flex-1"
                  onValueChange={(e) =>
                    handleOnChanges({
                      target: {
                        id: "textDecoration",
                        value: e,
                      },
                    })
                  }
                  value={String(state.editor.selectedElement.styles.textDecoration || "none")}
                >
                  <TabsList className="p-[2px] flex items-center flex-row justify-between border-[1px] rounded-md bg-[#272727] h-fit flex-1">
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
        ) : (
          <></>
        )}

        {/* ///////////////////////////////////////////////////////////////// */}
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
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.marginTop || ""}
              />
              <input
                className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none bottom-1 left-1/2 -translate-x-1/2"
                placeholder="16px"
                id="marginBottom"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.marginBottom || ""}
              />
              <input
                className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1/2 -translate-y-1/2"
                placeholder="16px"
                id="marginLeft"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.marginLeft || ""}
              />
              <input
                className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1/2 right-0 -translate-y-1/2"
                placeholder="16px"
                id="marginRight"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.marginRight || ""}
              />
              <input
                className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-8 left-1/2 -translate-x-1/2"
                placeholder="16px"
                id="paddingTop"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.paddingTop || ""}
              />
              <input
                className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none bottom-8 left-1/2 -translate-x-1/2"
                placeholder="16px"
                id="paddingBottom"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.paddingBottom || ""}
              />
              <input
                className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1/2 left-9 -translate-y-1/2"
                placeholder="16px"
                id="paddingLeft"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.paddingLeft || ""}
              />
              <input
                className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1/2 right-9 -translate-y-1/2"
                placeholder="16px"
                id="paddingRight"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.paddingRight || ""}
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
              onValueChange={(e) =>
                handleOnChanges({
                  target: {
                    id: "position",
                    value: e,
                  },
                })
              }
              value={state.editor.selectedElement.styles.position || "relative"}
            >
              <TabsList className="p-[2px] flex items-center flex-row justify-between border-[1px] rounded-md bg-[#272727] h-fit gap-2">
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
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.top || ""}
              />
              <input
                className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none bottom-1 left-1/2 -translate-x-1/2"
                placeholder="auto"
                id="bottom"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.bottom || ""}
              />
              <input
                className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1/2 -translate-y-1/2"
                placeholder="auto"
                id="left"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.left || ""}
              />
              <input
                className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1/2 right-0 -translate-y-1/2"
                placeholder="auto"
                id="right"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.right || ""}
              />
              <div className=" absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex ">
                <p className=" text-muted-foreground text-xs ">z-index: </p>
                <input
                  className="w-5 text-xs text-center text-sky-300 bg-transparent border-none outline-none"
                  placeholder="0"
                  id="zIndex"
                  onChange={handleOnChanges}
                  value={state.editor.selectedElement.styles.zIndex || ""}
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
                <div className=" overflow-hidden h-full rounded-l-[5px] w-[39px] mr-2">
                  <input
                    className="h-12 -mt-2 border-2 group-hover:border-[#6A6A6A] transition-colors border-r-0 hover:border-[#6A6A6A] bg-[#272727] -ml-[8px] rounded-l"
                    type="color"
                    id="backgroundColor"
                    placeholder="transparent"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.backgroundColor || ""}
                  />
                </div>
                <input
                  className="h-[30px] w-20 border-y-2  group-hover:border-[#6A6A6A] bg-[#272727] items-center text-xs shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none   disabled:cursor-not-allowed disabled:opacity-50 "
                  id="backgroundColor"
                  placeholder="transparent"
                  onChange={handleOnChanges}
                  value={state.editor.selectedElement.styles.backgroundColor || ""}
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
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles?.filter || 0}
              />
            </div>
            {/* 3rd bcg image */}
            <div className="flex items-center">
              <p className=" text-muted-foreground text-xs w-20">Image</p>
              <div className="flex flex-1  rounded-md group">
                <div
                  className="w-10 border-2 group-hover:border-[#6a6a6a]  transition-colors border-main-black !rounded-l-md border-r-0"
                  style={{
                    backgroundImage: state.editor.selectedElement.styles.backgroundImage,
                  }}
                />
                <Input
                  placeholder="url()"
                  className="mt-0 flex-1 !rounded-l-[0px] hover:border-l-none group-hover:border-[#6a6a6a]"
                  id="backgroundImage"
                  onChange={handleOnChanges}
                  value={state.editor.selectedElement.styles.backgroundImage || ""}
                />
              </div>
            </div>
            {/* image position */}
            <div className="flex items-center">
              <p className=" text-muted-foreground text-xs w-20">Position</p>
              <Tabs
                className="flex-1"
                onValueChange={(e) =>
                  handleOnChanges({
                    target: {
                      id: "backgroundSize",
                      value: e,
                    },
                  })
                }
                value={state.editor.selectedElement.styles.backgroundSize?.toString() || "cover"}
              >
                <TabsList className="p-[2px] flex items-center flex-row justify-between border-[1px] rounded-md bg-[#272727] h-fit flex-1">
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
                onValueChange={(e) =>
                  handleOnChanges({
                    target: {
                      id: "display",
                      value: e,
                    },
                  })
                }
                value={state.editor.selectedElement.styles.display || "block"}
              >
                <TabsList className="p-[2px] flex items-center flex-row justify-between border-[1px] rounded-md bg-[#272727] h-fit">
                  <TabsTrigger
                    value="flex"
                    className="w-full h-[24.4px] text-xs p-0 data-[state=active]:bg-zinc-950"
                  >
                    A
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
                onValueChange={(e) =>
                  handleOnChanges({
                    target: {
                      id: "flexFlow",
                      value: e,
                    },
                  })
                }
                value={state.editor.selectedElement.styles.flexFlow || "row"}
              >
                <TabsList className="p-[2px] flex items-center flex-row justify-between border-[1px] rounded-md bg-[#272727] h-fit">
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
            <div className={`${state.editor.selectedElement.styles.display === "flex" ? "block" : "hidden"} mt-3`}>
              <div className="flex items-center mb-3">
                <p className="text-muted-foreground text-xs w-20">{state.editor.selectedElement.styles.flexFlow === "column" ? "Align Y" : "Align X"}</p>
                <Tabs
                  className="flex-1"
                  onValueChange={(e) =>
                    handleOnChanges({
                      target: {
                        id: "justifyContent",
                        value: e,
                      },
                    })
                  }
                  value={state.editor.selectedElement.styles.justifyContent || "center"}
                >
                  <TabsList className="p-[2px] flex items-center flex-row justify-between border-[1px] rounded-md bg-[#272727] h-fit">
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
                <p className="text-muted-foreground text-xs w-20">{state.editor.selectedElement.styles.flexFlow === "column" ? "Align X" : "Align Y"}</p>
                <Tabs
                  className="flex-1"
                  onValueChange={(e) =>
                    handleOnChanges({
                      target: {
                        id: "alignItems",
                        value: e,
                      },
                    })
                  }
                  value={state.editor.selectedElement.styles.alignItems || "normal"}
                >
                  <TabsList className="p-[2px] flex items-center flex-row justify-between border-[1px] rounded-md bg-[#272727] h-fit ">
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
                  onChange={handleOnChanges}
                  value={state.editor.selectedElement.styles.gap || ""}
                />
              </div>
              {/* <FlexBoxComponent/> */}
              {/* <div className="w-[136px] h-[68px] bg-[#272727] rounded-md grid grid-cols-3 p-1">
                <Tabs
                  onValueChange={(e) => {
                    switch (e) {
                      case "justify-start-align-start":
                        handleOnChanges({ target: { id: "justifyContent", value: "start" } });
                        handleOnChanges({ target: { id: "alignItems", value: "start" } });
                        console.log("qqqq");

                        break;

                      case "justify-center-align-start":
                        handleOnChanges({ target: { id: "justifyContent", value: "center" } });
                        handleOnChanges({ target: { id: "alignItems", value: "start" } });
                        break;

                      case "justify-end-align-start":
                        handleOnChanges({ target: { id: "justifyContent", value: "end" } });
                        handleOnChanges({ target: { id: "alignItems", value: "start" } });
                        break;

                      case "justify-start-align-center":
                        handleOnChanges({ target: { id: "justifyContent", value: "start" } });
                        handleOnChanges({ target: { id: "alignItems", value: "center" } });
                        break;

                      case "justify-center-align-center":
                        handleOnChanges({ target: { id: "justifyContent", value: "center" } });
                        handleOnChanges({ target: { id: "alignItems", value: "center" } });
                        break;

                      case "justify-end-align-center":
                        handleOnChanges({ target: { id: "justifyContent", value: "end" } });
                        handleOnChanges({ target: { id: "alignItems", value: "center" } });
                        break;

                      case "justify-start-align-end":
                        handleOnChanges({ target: { id: "justifyContent", value: "start" } });
                        handleOnChanges({ target: { id: "alignItems", value: "end" } });
                        break;

                      case "justify-center-align-end":
                        handleOnChanges({ target: { id: "justifyContent", value: "center" } });
                        handleOnChanges({ target: { id: "alignItems", value: "end" } });
                        break;

                      case "justify-end-align-end":
                        handleOnChanges({ target: { id: "justifyContent", value: "end" } });
                        handleOnChanges({ target: { id: "alignItems", value: "  end" } });
                        break;

                      default:
                        break;
                    }
                  }}
                >
                  <TabsList className="border-[1px] w-[136px] h-[68px] bg-[#272727] rounded-md grid grid-cols-3 p-1">
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
              </div> */}
            </div>
          </AccordionContent>
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
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.borderTopWidth || ""}
              />
              {/* Bottom Border */}
              <input
                className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none bottom-1 left-1/2 -translate-x-1/2"
                placeholder="0px"
                id="borderBottomWidth"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.borderBottomWidth || ""}
              />
              {/* Left Border */}
              <input
                className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1/2 -translate-y-1/2"
                placeholder="0px"
                id="borderLeftWidth"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.borderLeftWidth || ""}
              />
              {/* Right Border */}
              <input
                className="w-10 text-xs absolute text-center text-sky-300 bg-transparent border-none outline-none top-1/2 right-0 -translate-y-1/2"
                placeholder="0px"
                id="borderRightWidth"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.borderRightWidth || ""}
              />
            </div>

            {/* Border Style */}
            <div className="flex items-center">
              <p className="text-muted-foreground text-xs w-20">Border Style</p>
              <Select
                onValueChange={(e) =>
                  handleOnChanges({
                    target: {
                      id: "borderStyle",
                      value: e,
                    },
                  })
                }
                value={state.editor.selectedElement.styles.borderStyle || "solid"}
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
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.borderColor || ""}
                  />
                </div>
                <input
                  className="h-[30px] w-20 border-y-2 group-hover:border-[#6A6A6A] bg-[#272727] items-center text-xs shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  id="borderColor"
                  placeholder="transparent"
                  onChange={handleOnChanges}
                  value={state.editor.selectedElement.styles.borderColor || ""}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <div className="h-10"></div>
      </Accordion>
    );
  }
};

export default SettingsTab;
