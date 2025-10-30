"use client";
import { Accordion } from "@/components/ui/accordion";
import { useEditor } from "../../../../../../../providers/editor/editor-provider";

import DiamentionSection from "./diamention-section";
// import BackgroundSection from "./background-section";
// import FlexboxSection from "./flexbox-section";
// import PositionSection from "./position-section";
// import SpacingSection from "./spacing-section";
// import TailwindClassesSection from "./tailwind-classes-section";
// import TypographySection from "./typography-section";
// import { overlayEvent } from "../../editor";

function SettingsTab() {
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
        {/* <TypographySection />
        <SpacingSection />
        <PositionSection />
        <BackgroundSection/>
        <FlexboxSection/>
        <TailwindClassesSection/> */}
      
        <div className="h-10"></div>
      </Accordion>
    );
  }
}

export default SettingsTab;
