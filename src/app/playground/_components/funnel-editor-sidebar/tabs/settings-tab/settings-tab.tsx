"use client";
import { Accordion } from "@/components/ui/accordion";
import { useEditor } from "../../../../../../../providers/editor/editor-provider";

import DiamentionSection from "./diamention-section";
import BackgroundSection from "./background-section";
import FlexboxSection from "./flexbox-section";
import PositionSection from "./position-section";
import SpacingSection from "./spacing-section";
import TypographySection from "./typography-section";
import BorderShadowSection from "./border-shadow-section";
import { getElementById } from "@/lib/utils";
import TailwindClassesSection from "./tailwind-classes-section";

function SettingsTab() {
  const { state } = useEditor();
  const selectedElement = state.selectedId ? getElementById(state.selectedId, state.elements) : null;

  if (!selectedElement) {
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
        <DiamentionSection selectedElement={selectedElement} />
        {selectedElement?.type === "p" && <TypographySection selectedElement={selectedElement} />}
        <SpacingSection selectedElement={selectedElement} />
        <PositionSection selectedElement={selectedElement} />
        <BackgroundSection selectedElement={selectedElement} />
        <FlexboxSection selectedElement={selectedElement} />
        <BorderShadowSection selectedElement={selectedElement} />
        <TailwindClassesSection selectedElement={selectedElement} />

        <div className="h-6"></div>
      </Accordion>
    );
  }
}

export default SettingsTab;
