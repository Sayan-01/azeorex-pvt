import { EditorContentType } from "@/types/types";
import { BoxSelect } from "lucide-react";
import React from "react";

const ContainerPlaceholder = () => {
  const handleDragStart = (e: React.DragEvent, type: EditorContentType) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "container")}
      className=" h-14 w-14 bg-muted/70 rounded-lg p-2 flex flex-row gap-[4px]"
    >
      <BoxSelect
        size={40}
        strokeWidth={1.1}
        className=" opacity-60"
      />
    </div>
  );
};

export default ContainerPlaceholder;
