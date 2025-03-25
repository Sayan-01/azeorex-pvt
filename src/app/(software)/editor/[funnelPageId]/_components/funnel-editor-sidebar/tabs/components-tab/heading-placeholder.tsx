import { EditorContentType } from "@/types/types";
import { Heading } from "lucide-react";
import React from "react";

const HeadingPlaceholder = () => {
  const handleDragStart = (e: React.DragEvent, type: EditorContentType) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "heading")}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <Heading
        strokeWidth={1.1}
        size={40}
        className="text-muted-foreground"
      />
    </div>
  );
};

export default HeadingPlaceholder;
