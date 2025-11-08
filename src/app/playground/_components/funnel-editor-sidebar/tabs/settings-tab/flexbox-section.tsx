import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/custom-input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlignHorizontalJustifyCenterIcon, AlignHorizontalJustifyEndIcon, AlignHorizontalJustifyStart, AlignHorizontalSpaceAround, AlignHorizontalSpaceBetween, AlignVerticalJustifyCenter, AlignVerticalJustifyEnd, AlignVerticalJustifyStart, AlignVerticalSpaceBetween, ArrowRightLeft, MoveDown, MoveRight } from "lucide-react";
import { useEditor } from "../../../../../../../providers/editor/editor-provider";
import { EditorElement } from "../../../../../../../providers/editor/editor-actions";

const FlexboxSection = ({ selectedElement }: { selectedElement: EditorElement }) => {
  const {updateElementStyle} = useEditor();
  return (
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
            onValueChange={(e) => updateElementStyle(selectedElement.id, "display", e)}
            value={selectedElement?.styles?.display || ""}
          >
            <TabsList className="p-[2px] flex items-center flex-row justify-between border-[2px] rounded-md bg-[#272727] h-fit">
              <TabsTrigger
                value="flex"
                className="w-full h-[24.4px] text-xs p-0 data-[state=active]:bg-zinc-950"
              >
                F
              </TabsTrigger>
              <TabsTrigger
                value=""
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
            onValueChange={(e) => updateElementStyle(selectedElement.id, "flexFlow", e)}
            value={selectedElement?.styles?.flexFlow || "row"}
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
        <div className={`${selectedElement?.styles?.display === "flex" ? "block" : "hidden"} mt-3`}>
          <div className="flex items-center mb-3">
            <p className="text-muted-foreground text-xs w-20">{selectedElement?.styles?.flexFlow === "column" ? "Align Y" : "Align X"}</p>
            <Tabs
              className="flex-1"
              onValueChange={(e) => updateElementStyle(selectedElement.id, "justifyContent", e)}
              value={selectedElement?.styles?.justifyContent || "center"}
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
            <p className="text-muted-foreground text-xs w-20">{selectedElement?.styles?.flexFlow === "column" ? "Align X" : "Align Y"}</p>
            <Tabs
              className="flex-1"
              onValueChange={(e) => updateElementStyle(selectedElement.id, "alignItems", e)}
              value={selectedElement?.styles?.alignItems || "normal"}
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
              onChange={(e) => updateElementStyle(selectedElement.id, "gap", e.target.value)}
              value={selectedElement?.styles?.gap || ""}
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default FlexboxSection;
