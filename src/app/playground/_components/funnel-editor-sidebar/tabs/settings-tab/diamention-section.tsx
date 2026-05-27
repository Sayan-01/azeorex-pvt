"use client";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/custom-input";
import { BoxSelect, Eye, EyeClosed, MoveHorizontal, MoveVertical, Spline } from "lucide-react";
import { Angle } from "@/icons/angle";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEditor } from "../../../../../../../providers/editor/editor-provider";
import { EditorElement } from "../../../../../../../providers/editor/editor-types";

const DiamentionSection = ({selectedElement}: {selectedElement: EditorElement}) => {
  const { updateStyle } = useEditor();

  return (
    <AccordionItem
      value="Dimensions"
      className="px-3 py-0  "
    >
      <AccordionTrigger className="!no-underline font-semibold">Dimensions</AccordionTrigger>
      <AccordionContent>
        <div className="flex gap-2 mb-2">
          <div className="flex flex-col">
            <Input
              placeholder="Auto"
              id="width"
              value={selectedElement?.styles?.width || ""}
              onChange={(e) => updateStyle(selectedElement.id, "width", e.target.value)}
              children="W"
            />
          </div>
          <div className="flex flex-col">
            <Input
              id="height"
              placeholder="Auto"
              value={selectedElement?.styles?.height || ""}
              onChange={(e) => updateStyle(selectedElement.id, "height", e.target.value)}
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
              value={selectedElement?.styles?.maxWidth || ""}
              onChange={(e) => updateStyle(selectedElement.id, "maxWidth", e.target.value)}
            >
              <MoveHorizontal size={13} />
            </Input>
          </div>
          <div className="flex flex-col">
            <Input
              id="maxHeight"
              placeholder="Auto"
              onChange={(e) => updateStyle(selectedElement.id, "maxHeight", e.target.value)}
              value={selectedElement?.styles?.maxHeight || ""}
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
              value={selectedElement?.styles?.rotate || ""}
              onChange={(e) => updateStyle(selectedElement.id, "rotate", e.target.value)}
            >
              <Angle />
            </Input>
          </div>
          <div className="flex flex-col w-full">
            <Input
              id="borderRadius"
              placeholder="0px"
              value={selectedElement?.styles?.borderRadius || ""}
              onChange={(e) => updateStyle(selectedElement.id, "borderRadius", e.target.value)}
            >
              <Spline size={13} />
            </Input>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex flex-col w-full">
            <Input
              id="opacity"
              placeholder="100%"
              value={selectedElement?.styles?.opacity || ""}
              onChange={(e) => updateStyle(selectedElement.id, "opacity", e.target.value)}
            >
              <BoxSelect size={13} />
            </Input>
          </div>
          <div className="flex flex-col w-full">
            <Tabs
              value={selectedElement?.styles?.overflow || "visible"}
              onValueChange={(e) => updateStyle(selectedElement.id, "overflow", e)}
            >
              <TabsList className="p-[2px] flex items-center flex-row justify-between border-[1px] rounded-md bg-[#272727] h-fit gap-0">
                <TabsTrigger
                  value="visible"
                  className="w-10 h-[24.4px] p-0 data-[state=active]:bg-zinc-950"
                >
                  <Eye size={13} />
                </TabsTrigger>
                <TabsTrigger
                  value="hidden"
                  className="w-10 h-[24.4px] p-0 data-[state=active]:bg-zinc-950"
                >
                  <EyeClosed size={13} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default DiamentionSection;
