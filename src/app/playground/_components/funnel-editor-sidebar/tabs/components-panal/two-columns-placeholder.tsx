import { EditorContentType } from "@/types/types";
import { Columns2 } from "lucide-react";
import React from "react";

const TwoColumnsPlaceholder = () => {
  const handleDragStart = (e: React.DragEvent, type: EditorContentType) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "2Col")}
      className=" h-14 w-14 bg-muted/70 rounded-lg p-2 flex flex-row gap-[4px]"
    >
      <Columns2
        size={40}
        strokeWidth={1.1}
        className=" opacity-60"
      />
    </div>
  );
};

export default TwoColumnsPlaceholder;
