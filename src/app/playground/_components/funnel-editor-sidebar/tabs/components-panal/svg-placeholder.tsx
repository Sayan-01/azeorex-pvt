import { EditorContentType } from "@/types/types";
import {  Palette } from "lucide-react";
import React from "react";

const SvgPlaceholder = () => {
  const handleDragStart = (e: React.DragEvent, type: EditorContentType) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "svg")}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <Palette
        strokeWidth={1.1}
        size={40}
        className="text-muted-foreground"
      />
    </div>
  );
};

export default SvgPlaceholder;
