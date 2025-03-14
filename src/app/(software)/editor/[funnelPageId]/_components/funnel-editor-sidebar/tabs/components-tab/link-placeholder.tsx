import { EditorContentType } from "@/types/types";
import { Link2Icon } from "lucide-react";
import React from "react";

const LinkPlaceholder = () => {
  const handleDragStart = (e: React.DragEvent, type: EditorContentType) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "link")}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <Link2Icon
        strokeWidth={1.1}
        size={40}
        className="text-muted-foreground rotate-45"
      />
    </div>
  );
};

export default LinkPlaceholder;
