"use client";

import React, { useState } from "react";
import { useEditor } from "../../../../../providers/editor/editor-provider";
import { getElementById } from "@/lib/utils";

type MarginHandlesProps = {
  rect: DOMRect;
  selectedId: string;
  setResizing: (value: boolean) => void;
};

export default function MarginHandles({ rect, selectedId, setResizing }: MarginHandlesProps) {
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

    // Parse current margin
    const currentMargin = ((element.styles as any)[`margin-${side}`] as string) || "0px";
    const marginValue = parseInt(currentMargin) || 0;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      let delta = 0;

      if (side === "top") delta = startY - moveEvent.clientY;
      if (side === "bottom") delta = moveEvent.clientY - startY;
      if (side === "left") delta = startX - moveEvent.clientX;
      if (side === "right") delta = moveEvent.clientX - startX;

      const newMargin = Math.max(0, marginValue - delta);
      updateElementStyle(selectedId, `margin-${side}`, `${newMargin}px`);
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
    backgroundColor: activeSide ? "#f59e0b" : "rgba(245, 158, 11, 0.5)",
    pointerEvents: "auto",
    zIndex: 1007,
    cursor: "move",
  };

  return (
    <>
      <div className="pointer-events-auto">
        {/* Top margin handle */}
        <div
          style={{ height: (element.styles as any)?.["margin-top"] || "0px", top: `-${(element.styles as any)?.["margin-top"]}` }}
          className={`absolute z-[1010] left-0 right-0 flex items-end justify-center bg-orange-500/20 `}
        >
          <div
            onMouseDown={(e) => handleMouseDown(e, "top")}
            className="w-5 hover:w-6 duration-200 h-1 bg-orange-400 border-white border rounded-full cursor-ns-resize hover:bg-orange-600 -translate-y-[12px]"
          />
        </div>

        {/* Right margin handle */}
        <div
          style={{ width: (element.styles as any)?.["margin-right"] || "0px", right: `-${(element.styles as any)?.["margin-right"]}` }}
          className={`absolute z-[1010] top-0 bottom-0 right-0 flex items-center justify-start bg-orange-500/20`}
        >
          <div className="translate-x-[12px]" onMouseDown={(e) => handleMouseDown(e, "right")}>

            <div className="h-5 hover:h-6 duration-200 w-1 bg-orange-400 border-white border rounded-full cursor-ew-resize hover:bg-orange-600" />
          </div>
        </div>

        {/* Bottom margin handle */}
        <div
          style={{ height: (element.styles as any)?.["margin-bottom"] || "0px", bottom: `-${(element.styles as any)?.["margin-bottom"]}` }}
          className={`absolute z-[1010] left-0 right-0  flex items-start justify-center bg-orange-500/20 `}
        >
          <div
            onMouseDown={(e) => handleMouseDown(e, "bottom")}
            className="w-5 hover:w-6 duration-200 h-1 bg-orange-400 border-white border rounded-full cursor-ns-resize hover:bg-orange-600 translate-y-[12px]"
          />
        </div>

        {/* Left margin handle */}
        <div
          style={{ width: (element.styles as any)?.["margin-left"] || "0px", left: `-${(element.styles as any)?.["margin-left"]}` }}
          className={`absolute z-[1010] top-0 bottom-0 left-0 flex items-center justify-end bg-orange-500/20`}
        >
          <div
            className="-translate-x-[12px]"
            onMouseDown={(e) => handleMouseDown(e, "left")}
          >
            <div className="h-5 hover:h-6 duration-200 w-1 bg-orange-400 border-white border rounded-full cursor-ew-resize hover:bg-orange-600 " />
          </div>
        </div>
      </div>
    </>
  );
}
