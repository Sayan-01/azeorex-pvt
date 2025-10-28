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
import { useEditor } from "../../../../../../../providers/editor/editor-provider";
import PM from "@/icons/p-m";
import Position from "@/icons/position";
import { Angle } from "@/icons/angle";
import { Input } from "@/components/ui/custom-input";

import { SwatchBook } from "lucide-react";
import { useNewEditor } from "../../../../../../../providers/newPeovider";
import { Button } from "@/components/ui/button";
import DiamentionSection from "./diamention-section";
import TypographySection from "./typography-section";
import SpacingSection from "./spacing-section";
import PositionSection from "./position-section";
import BackgroundSection from "./background-section";
import FlexboxSection from "./flexbox-section";
import TailwindClassesSection from "./tailwind-classes-section";
// import { overlayEvent } from "../../editor";

function SettingsTab() {
  const { selectedElement } = useNewEditor();
  const { state } = useEditor();
  

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
        <DiamentionSection />       
        <TypographySection />
        <SpacingSection />
        <PositionSection />
        <BackgroundSection/>
        <FlexboxSection/>
        <TailwindClassesSection/>
      
        <div className="h-10"></div>
      </Accordion>
    );
  }
}

export default SettingsTab;
