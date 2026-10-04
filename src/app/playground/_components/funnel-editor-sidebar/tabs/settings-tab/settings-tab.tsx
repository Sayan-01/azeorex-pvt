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
import SrcHrefSection from "./src-href-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      <Tabs defaultValue="style" className="w-[240px] select-none bg-editor-bcgc">
        <TabsList className="w-full grid grid-cols-2 bg-transparent h-10 px-4 rounded-none">
          <TabsTrigger 
            value="style" 
            className="data-[state=active]:bg-editor-bcgc data-[state=active]:text-white rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500"
          >
            Style
          </TabsTrigger>
          <TabsTrigger 
            value="settings"
            className="data-[state=active]:bg-editor-bcgc data-[state=active]:text-white rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500"
          >
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="style" className="m-0 overflow-y-auto" style={{ height: "calc(100vh - 40px)" }}>
          <Accordion
            type="multiple"
            className="w-full pb-10"
            defaultValue={["Dimensions", "Typography", "Spacing", "Position", "Background", "Decorations", "Flexbox"]}
          >
            <SrcHrefSection selectedElement={selectedElement} />
            <DiamentionSection selectedElement={selectedElement} />
            {(selectedElement?.type === "text" ||
              selectedElement?.type === "link" ||
              selectedElement?.type === "button" ||
              selectedElement?.type === "h1" ||
              selectedElement?.type === "h2" ||
              selectedElement?.type === "h3" ||
              selectedElement?.type === "h4" ||
              selectedElement?.type === "h5" ||
              selectedElement?.type === "h6" ||
              selectedElement?.type === "input" ||
              selectedElement?.type === "textarea" ||
              selectedElement?.type === "select") && <TypographySection selectedElement={selectedElement} />}
            <SpacingSection selectedElement={selectedElement} />
            <PositionSection selectedElement={selectedElement} />
            <BackgroundSection selectedElement={selectedElement} />
            <FlexboxSection selectedElement={selectedElement} />
            <BorderShadowSection selectedElement={selectedElement} />
            <div className="h-20"></div>
          </Accordion>
        </TabsContent>

        <TabsContent value="settings" className="m-0 overflow-y-auto" style={{ height: "calc(100vh - 40px)" }}>
          <Accordion
            type="multiple"
            className="w-full pb-10"
            defaultValue={["Classes (responcive)"]}
          >
            <TailwindClassesSection selectedElement={selectedElement} />
            <div className="h-20"></div>
          </Accordion>
        </TabsContent>
      </Tabs>
    );
  }
}

export default SettingsTab;
