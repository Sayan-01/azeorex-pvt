"use client";

import React from "react";
import { useEditor } from "../../../../../providers/editor/editor-provider";

type ResizeHandlesProps = {
  rect: DOMRect;
  selectedId: string;
  setResizing: (value: boolean) => void;
};

export default function ResizeHandles({ rect, selectedId, setResizing }: ResizeHandlesProps) {
  const { updateElementStyle } = useEditor();
  const handles = ["nw", "n", "ne", "e", "se", "s", "sw", "w"];

  const handleMouseDown = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    e.preventDefault();
    setResizing(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = Math.round(rect.width);
    const startHeight = Math.round(rect.height);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;

      console.log("H",newHeight,"W", newWidth);
      
      if (direction.includes("e")) newWidth = startWidth + deltaX;
      if (direction.includes("w")) newWidth = startWidth - deltaX;
      if (direction.includes("s")) newHeight = startHeight + deltaY;
      if (direction.includes("n")) newHeight = startHeight - deltaY;

      if (newWidth > 20) updateElementStyle(selectedId, "width", `${newWidth}px`);
      if (newHeight > 20) updateElementStyle(selectedId, "height", `${newHeight}px`);
    };

    const handleMouseUp = () => {
      setResizing(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const getHandleStyle = (direction: string): React.CSSProperties => {
    const style: any = {
      position: "absolute",
      width: "8px",
      height: "8px",
      backgroundColor: "var(--color-blue-500)",
      border: "1px solid white",
      borderRadius: "10px",
      pointerEvents: "auto",
      zIndex: 1009,
    };

    const positions: any = {
      nw: { top: "-5px", left: "-5px" , cursor: "nw-resize"},
      n: { top: "-3px", left: "50%", transform: "translateX(-50%)", width: "28px", height: "4px", cursor: "n-resize" },
      ne: { top: "-5px", right: "-5px" , cursor: "ne-resize"},
      e: { top: "50%", right: "-3px", transform: "translateY(-50%)", width: "4px", height: "28px", cursor: "e-resize" },
      se: { bottom: "-5px", right: "-5px" , cursor: "se-resize"},
      s: { bottom: "-3px", left: "50%", transform: "translateX(-50%)", width: "28px", height: "4px", cursor: "s-resize" },
      sw: { bottom: "-5px", left: "-5px" , cursor: "sw-resize"},
      w: { top: "50%", left: "-3px", transform: "translateY(-50%)", width: "4px", height: "28px", cursor: "w-resize" },
    };

    return { ...style, ...positions[direction] };
  };

  return (
    <>
      {handles.map((direction) => (
        <div
          key={direction}
          style={getHandleStyle(direction)}
          onMouseDown={(e) => handleMouseDown(e, direction)}
        />
      ))}
    </>
  );
}
