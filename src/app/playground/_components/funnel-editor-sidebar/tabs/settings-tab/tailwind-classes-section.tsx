import React, { useEffect, useState } from "react";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Input } from "@/components/ui/custom-input";
import { Button } from "@/components/ui/button";
import { useEditor } from "../../../../../../../providers/editor/editor-provider";
import { EditorElement } from "../../../../../../../providers/editor/editor-types";

const TailwindClassesSection = ({ selectedElement }: { selectedElement: EditorElement }) => {
  const { updateAttribute } = useEditor();
  const [classes, setClasses] = useState<string[]>([]);

  // States for different inputs
  const [inputs, setInputs] = useState({
    normal: "",
    hover: "",
    active: "",
    sm: "",
    md: "",
    lg: "",
  });

  //load initial classes
  useEffect(() => {
    if (!selectedElement) return;

    const currentClasses = selectedElement?.attributes?.className?.split(" ").filter((c) => c.trim() !== "") || [];
    setClasses(currentClasses);
  }, [selectedElement, selectedElement?.attributes?.className]);

  const updateElementClasses = (updatedClasses: string[]) => {
    const classString = updatedClasses.join(" ");
    updateAttribute(selectedElement.id, "className", classString);
  };

  //Remove a class
  const removeClass = (cls: string) => {
    const updated = classes.filter((c) => c !== cls);
    setClasses(updated);
    updateElementClasses(updated);
  };

  //Add new class
  const addClass = (type: keyof typeof inputs, prefix: string) => {
    let trimmed = inputs[type].trim();
    if (!trimmed) return;

    // Auto add prefix if not present
    if (prefix && !trimmed.startsWith(prefix + ":")) {
      trimmed = `${prefix}:${trimmed}`;
    }

    if (!classes.includes(trimmed)) {
      const updated = [...classes, trimmed];
      setClasses(updated);
      updateElementClasses(updated);
    }

    setInputs({ ...inputs, [type]: "" });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, type: keyof typeof inputs, prefix: string) => {
    if (e.key === "Enter") {
      addClass(type, prefix);
    }
  };

  const renderClassGroup = (title: string, type: keyof typeof inputs, prefix: string) => {
    const filteredClasses = prefix === "" ? classes.filter((c) => !c.includes(":")) : classes.filter((c) => c.startsWith(prefix + ":"));

    return (
      <div className="flex flex-col gap-2 mb-4 border border-zinc-800 p-2 rounded-md">
        <div className="text-xs font-semibold text-gray-300">{title}</div>
        <div className="flex flex-wrap gap-1">
          {filteredClasses.length > 0 ? (
            filteredClasses.map((cls) => (
              <span
                key={cls}
                className="flex text-[10px] items-center gap-1 px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700"
              >
                {cls}
                <button
                  onClick={() => removeClass(cls)}
                  className="ml-1 text-red-500 hover:text-red-700 text-sm leading-none"
                  aria-label={`Remove ${cls} class`}
                >
                  ×
                </button>
              </span>
            ))
          ) : (
            <span className="text-gray-500 text-[10px]">No {title.toLowerCase()} classes</span>
          )}
        </div>
        <div className="flex gap-2 mt-1">
          <Input
            value={inputs[type]}
            onChange={(e) => setInputs({ ...inputs, [type]: e.target.value })}
            onKeyPress={(e) => handleKeyPress(e, type, prefix)}
            placeholder={`Add class...`}
          />
          <Button
            className="h-[30px] text-xs px-2"
            type="button"
            onClick={() => addClass(type, prefix)}
          >
            Add
          </Button>
        </div>
      </div>
    );
  };

  return (
    <AccordionItem
      value="Classes (responcive)"
      className="px-3 py-0 border-none"
    >
      <AccordionTrigger className="!no-underline font-semibold">Tailwind Classes</AccordionTrigger>

      <AccordionContent className="flex flex-col gap-1">
        {renderClassGroup("Normal", "normal", "")}
        {renderClassGroup("Hover State", "hover", "hover")}
        {renderClassGroup("Click State", "active", "active")}
        {renderClassGroup("Small (sm)", "sm", "sm")}
        {renderClassGroup("Medium (md)", "md", "md")}
        {renderClassGroup("Large (lg)", "lg", "lg")}
      </AccordionContent>
    </AccordionItem>
  );
};

export default TailwindClassesSection;
