import React, { useEffect, useState } from "react";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Input } from "@/components/ui/custom-input";
import { Button } from "@/components/ui/button";
import { useEditor } from "../../../../../../../providers/editor/editor-provider";
import { EditorElement } from "../../../../../../../providers/editor/editor-actions";

const TailwindClassesSection = ({ selectedElement }: { selectedElement: EditorElement }) => {
  const { updateElementAttribute } = useEditor();
  const [classes, setClasses] = useState<string[]>([]);
  const [newClass, setNewClass] = useState("");

  //load initial classes
  useEffect(() => {
    if (!selectedElement) return;

    const currentClasses = selectedElement?.attributes?.className?.split(" ").filter((c) => c.trim() !== "") || [];
    setClasses(currentClasses);
  }, [selectedElement, selectedElement?.attributes?.className]);

  const updateElementClasses = (updatedClasses: string[]) => {
    const classString = updatedClasses.join(" ");
    updateElementAttribute(selectedElement.id, "className", classString);
  };

  //Remove a class
  const removeClass = (cls: string) => {
    const updated = classes.filter((c) => c !== cls);
    setClasses(updated);
    updateElementClasses(updated);
  };

  //Add new class
  const addClass = () => {
    const trimmed = newClass.trim();
    if (!trimmed) return;
    if (!classes.includes(trimmed)) {
      const updated = [...classes, trimmed];
      setClasses(updated);
      updateElementClasses(updated);
    }
    setNewClass("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addClass();
    }
  };

  return (
    <AccordionItem
      value="Classes (responcive)"
      className="px-3 py-0 border-none"
    >
      <AccordionTrigger className="!no-underline font-semibold">Classes</AccordionTrigger>

      <AccordionContent className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          {classes.length > 0 ? (
            classes.map((cls) => (
              <span
                key={cls}
                className="flex text-xs items-center gap-1 px-2 py-1 rounded-full bg-zinc-800 border border-zinc-700"
              >
                {cls}
                <button
                  onClick={() => removeClass(cls)}
                  className="ml-1 text-red-500 hover:text-red-700 text-base leading-none"
                  aria-label={`Remove ${cls} class`}
                >
                  ×
                </button>
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-xs">No classes applied</span>
          )}
        </div>

        <div className="flex gap-2">
          <Input
            className="h-[30px] flex-1"
            value={newClass}
            onChange={(e) => setNewClass(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add Tailwind class..."
          />
          <Button
            className="h-[30px]"
            type="button"
            onClick={addClass}
          >
            Add
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default TailwindClassesSection;
