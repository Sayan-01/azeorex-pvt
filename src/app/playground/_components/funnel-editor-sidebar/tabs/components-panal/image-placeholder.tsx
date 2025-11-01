import { EditorContentType } from "@/types/types";
import { Image, TvMinimalPlay } from "lucide-react";
import React from "react";

const ImagePlaceholder = () => {
  const handleDragStart = (e: React.DragEvent, type: EditorContentType) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "image")}
      className="h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <Image
        strokeWidth={1.1}
        size={40}
        className="text-muted-foreground"
      />
    </div>
  );
};

export default ImagePlaceholder;
