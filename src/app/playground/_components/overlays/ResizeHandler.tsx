"use client";

import React, { useState } from "react";
import { useEditor } from "../../../../../providers/editor/editor-provider";
import { getElementById } from "@/lib/utils";

type ResizeHandlesProps = {
  rect: DOMRect;
  selectedId: string;
  setResizing: (value: boolean) => void;
};

export default function ResizeHandles({ rect, selectedId, setResizing }: ResizeHandlesProps) {
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

    // Parse current width/height based on side
    let currentValue: string;
    let styleProperty: string;

    if (side === "top" || side === "bottom") {
      currentValue = ((element.styles as any)?.height as string) || `${rect.height}px`;
      styleProperty = "height";
    } else {
      currentValue = ((element.styles as any)?.width as string) || `${rect.width}px`;
      styleProperty = "width";
    }

    const dimensionValue = parseInt(currentValue) || 0;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      let delta = 0;

      if (side === "top") delta = startY - moveEvent.clientY;
      if (side === "bottom") delta = moveEvent.clientY - startY;
      if (side === "left") delta = startX - moveEvent.clientX;
      if (side === "right") delta = moveEvent.clientX - startX;

      const newDimension = Math.max(20, dimensionValue + delta);
      updateElementStyle(selectedId, styleProperty, `${newDimension}px`);
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

  return (
    <>
      <div className="pointer-events-auto">
        {/* Top Handle */}
        <div className="absolute z-[1009] left-0 right-0  flex items-center justify-center">
          <div
            onMouseDown={(e) => handleMouseDown(e, "top")}
            className={`w-7 h-1 bg-blue-500 border-white border rounded-full -translate-y-[3px] cursor-ns-resize hover:bg-blue-600 hover:w-8 duration-200 ${
              String(element.styles?.height ?? "").includes("%") ? "hidden" : ""
            }`}
          />
        </div>

        {/* Right Handle */}
        <div className="absolute z-[1009] top-0 bottom-0 right-0 flex items-center justify-center">
          <div
            onMouseDown={(e) => handleMouseDown(e, "right")}
            className={`h-7 w-1 bg-blue-500 border-white border rounded-full translate-x-[3px] cursor-ew-resize hover:bg-blue-600 hover:h-8 duration-200 ${
              String(element.styles?.width ?? "").includes("%") ? "hidden" : ""
            }`}
          />
        </div>

        {/* Bottom Handle */}
        <div className="absolute z-[1009] bottom-0 left-0 right-0  flex items-center justify-center">
          <div
            onMouseDown={(e) => handleMouseDown(e, "bottom")}
            className={`w-7 h-1 bg-blue-500 border-white border rounded-full translate-y-[3px] cursor-ns-resize hover:bg-blue-600 hover:w-8 duration-200    ${
              String(element.styles?.height ?? "").includes("%") ? "hidden" : ""
            }`}
          />
        </div>

        {/* Left Handle */}
        <div className="absolute z-[1009] top-0 bottom-0 left-0 flex items-center justify-center">
          <div
            onMouseDown={(e) => handleMouseDown(e, "left")}
            className={`h-7 w-1 bg-blue-500 border-white border rounded-full -translate-x-[3px] cursor-ew-resize hover:bg-blue-600 hover:h-8 duration-200 ${
              String(element.styles?.width ?? "").includes("%") ? "hidden" : ""
            }`}
          />
        </div>
      </div>
    </>
  );
}
