import { EditorContentType } from "@/types/types";
import { TextSelect } from "lucide-react";
import React from "react";

const SectionPlaceholder = () => {
  const handleDragStart = (e: React.DragEvent, type: EditorContentType) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "section")}
      className=" h-14 w-14 bg-muted/70 rounded-lg p-2 flex flex-col gap-[4px]"
    >
      <TextSelect
        size={40}
        strokeWidth={1.1}
        className=" opacity-60"
      />
    </div>
  );
};

export default SectionPlaceholder;
