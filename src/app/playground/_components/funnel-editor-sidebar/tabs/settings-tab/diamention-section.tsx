"use client";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/custom-input";
import { BoxSelect, Eye, EyeClosed, MoveHorizontal, MoveVertical, Spline } from "lucide-react";
import { Angle } from "@/icons/angle";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEditor } from "../../../../../../../providers/editor/editor-provider";

const DiamentionSection = () => {
  const { state, updateStyle } = useEditor();

  return (
    <AccordionItem
      value="Dimensions"
      className="px-3 py-0  "
    >
      <AccordionTrigger className="!no-underline font-semibold">Dimensions</AccordionTrigger>
      <AccordionContent>
        <p>Width: {state.selectedElement?.style.width}</p>
        <p>Height: {state.selectedElement?.style.height}</p>

        <div className="flex gap-2 mb-2">
          <div className="flex flex-col">
            <Input
              placeholder="Auto"
              id="width"
              value={state.selectedElement?.style["width"] || ""}
              onChange={(e) => updateStyle("width", e.target.value)}
              children="W"
            />
          </div>
          <div className="flex flex-col">
            <Input
              id="height"
              placeholder="Auto"
              onChange={(e) => updateStyle(e.target.id, e.target.value)}
              value={state.selectedElement?.style.height || ""}
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
              onChange={(e) => updateStyle(e.target.id, e.target.value)}
              defaultValue={state.selectedElement?.style.maxWidth || ""}
            >
              <MoveHorizontal size={13} />
            </Input>
          </div>
          <div className="flex flex-col">
            <Input
              id="maxHeight"
              placeholder="Auto"
              onChange={(e) => updateStyle(e.target.id, e.target.value)}
              defaultValue={state.selectedElement?.style.maxHeight || ""}
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
              onChange={(e) => updateStyle(e.target.id, e.target.value)}
              defaultValue={state.selectedElement?.style?.rotate || ""}
            >
              <Angle />
            </Input>
          </div>
          <div className="flex flex-col w-full">
            <Input
              id="borderRadius"
              placeholder="0px"
              onChange={(e) => updateStyle(e.target.id, e.target.value)}
              defaultValue={state.selectedElement?.style?.borderRadius || ""}
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
              onChange={(e) => updateStyle(e.target.id, e.target.value)}
              defaultValue={state.selectedElement?.style?.opacity || ""}
            >
              <BoxSelect size={13} />
            </Input>
          </div>
          <div className="flex flex-col w-full">
            <Tabs
              onValueChange={(e) => updateStyle("overflow", e)}
              defaultValue={state.selectedElement?.style?.overflow || "visible"}
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
