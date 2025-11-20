"use client";

import React, { useState } from "react";
import { useEditor } from "../../../../../providers/editor/editor-provider";
import { getElementById } from "@/lib/utils";

type PaddingHandlesProps = {
  rect: DOMRect;
  selectedId: string;
  setResizing: (value: boolean) => void;
};

export default function PaddingHandles({ rect, selectedId, setResizing }: PaddingHandlesProps) {
  const { updateElementStyle, state } = useEditor();
  const [activeSide, setActiveSide] = useState<"top" | "right" | "bottom" | "left" | null>(null);

  const element = getElementById(selectedId, state.elements);
  if (!element) return null;

  const handleMouseDown = (e: React.MouseEvent, side: "top" | "right" | "bottom" | "left") => {
    e.stopPropagation();
    e.preventDefault();
    setActiveSide(side);
    setResizing(true);

    const startX = e.clientX;
    const startY = e.clientY;

    // Parse current padding
    const currentPadding = ((element.styles as any)[`padding-${side}`] as string) || "0px";
    const paddingValue = parseInt(currentPadding) || 0;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      let delta = 0;

      if (side === "top") delta = startY - moveEvent.clientY;
      if (side === "bottom") delta = moveEvent.clientY - startY;
      if (side === "left") delta = startX - moveEvent.clientX;
      if (side === "right") delta = moveEvent.clientX - startX;

      const newPadding = Math.max(0, paddingValue - delta);
      updateElementStyle(selectedId, `padding-${side}`, `${newPadding}px`);
    };

    const handleMouseUp = () => {
      setActiveSide(null);
      setResizing(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleStyle: React.CSSProperties = {
    position: "absolute",
    backgroundColor: activeSide ? "#10b981" : "rgba(16, 185, 129, 0.5)",
    pointerEvents: "auto",
    zIndex: 1008,
    cursor: "move",
  };

  return (
    <>
      <div className="pointer-events-auto ">
        <div
          style={{ height: (element.styles as any)?.["padding-top"] }}
          className="absolute z-[1008] left-0 right-0 flex items-end justify-center bg-green-500/20"
        >
          <div
            onMouseDown={(e) => handleMouseDown(e, "top")}
            className="w-5 hover:w-6  duration-200 h-1 bg-green-500 border-white border rounded-full cursor-ns-resize hover:bg-green-600 -mb-[12px]"
          />
        </div>

        <div
          style={{ width: (element.styles as any)?.["padding-right"] }}
          className="absolute z-[1008] top-0 right-0 bottom-0 flex items-center justify-start bg-green-500/20"
        >
          <div
            onMouseDown={(e) => handleMouseDown(e, "right")}
            className="h-5 w-1 hover:h-6 duration-200 bg-green-500 border-white border rounded-full cursor-ew-resize hover:bg-green-600 -ml-[12px]"
          />
        </div>

        <div
          style={{ height: (element.styles as any)?.["padding-bottom"] }}
          className="absolute z-[1008] bottom-0 left-0 right-0 flex items-start justify-center bg-green-500/20"
        >
          <div
            onMouseDown={(e) => handleMouseDown(e, "bottom")}
            className="w-5 hover:w-6 duration-200 h-1 bg-green-500 border-white border rounded-full cursor-ns-resize hover:bg-green-600 -mt-[12px]"
          />
        </div>

        <div
          style={{ width: (element.styles as any)?.["padding-left"] }}
          className="absolute z-[1008] top-0 left-0 bottom-0 flex items-center justify-end bg-green-500/20"
        >
          <div
            onMouseDown={(e) => handleMouseDown(e, "left")}
            className="h-5 w-1 hover:h-6 duration-200 bg-green-500 border-white border rounded-full cursor-ew-resize hover:bg-green-600 -mr-[12px]"
          />
        </div>
      </div>
    </>
  );
}
