"use client";

import React, { useMemo, useState } from "react";
import { useEditor } from "../../../../../providers/editor/editor-provider";
import { getElementById } from "@/lib/utils";

type PaddingHandlesProps = {
  rect: DOMRect;
  selectedId: string;
  setResizing: (value: boolean) => void;
};

// Map side to both possible style key formats (camelCase and kebab-case)
const CAMEL: Record<string, string> = { top: "paddingTop", right: "paddingRight", bottom: "paddingBottom", left: "paddingLeft" };
const KEBAB: Record<string, string> = { top: "padding-top", right: "padding-right", bottom: "padding-bottom", left: "padding-left" };

/** Read padding value checking both camelCase and kebab-case keys */
function getPaddingValue(styles: any, side: string): string {
  return styles?.[CAMEL[side]] || styles?.[KEBAB[side]] || "0px";
}

export default function PaddingHandles({ rect, selectedId, setResizing }: PaddingHandlesProps) {
  const { updateStyle, state } = useEditor();
  const [activeSide, setActiveSide] = useState<"top" | "right" | "bottom" | "left" | null>(null);

  const element = useMemo(() => {
    return getElementById(selectedId, state.elements);
  }, [selectedId, state.elements]);
  if (!element) return null;

  const handleMouseDown = (e: React.MouseEvent, side: "top" | "right" | "bottom" | "left") => {
    e.stopPropagation();
    e.preventDefault();
    setActiveSide(side);
    setResizing(true);

    const startX = e.clientX;
    const startY = e.clientY;

    // Parse current padding (check both camelCase and kebab-case)
    const currentPadding = getPaddingValue(element.styles, side);
    const paddingValue = parseInt(currentPadding) || 0;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      let delta = 0;

      // For padding, dragging inward = positive delta = increase padding
      if (side === "top") delta = moveEvent.clientY - startY;
      if (side === "bottom") delta = startY - moveEvent.clientY;
      if (side === "left") delta = moveEvent.clientX - startX;
      if (side === "right") delta = startX - moveEvent.clientX;

      const newPadding = Math.max(0, paddingValue + delta);
      updateStyle(selectedId, CAMEL[side], `${newPadding}px`);
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

  // Read padding values (both formats)
  const pt = getPaddingValue(element.styles, "top");
  const pr = getPaddingValue(element.styles, "right");
  const pb = getPaddingValue(element.styles, "bottom");
  const pl = getPaddingValue(element.styles, "left");

  return (
    <>
      <div className="pointer-events-auto ">
        <div
          style={{ height: pt }}
          className="absolute z-[1008] left-0 right-0 flex items-end justify-center bg-green-500/20"
        >
          <div
            onMouseDown={(e) => handleMouseDown(e, "top")}
            className="w-5 hover:w-6  duration-200 h-1 bg-green-500 border-white border rounded-full cursor-ns-resize hover:bg-green-600 -mb-[12px]"
          />
        </div>

        <div
          style={{ width: pr }}
          className="absolute z-[1008] top-0 right-0 bottom-0 flex items-center justify-start bg-green-500/20"
        >
          <div
            onMouseDown={(e) => handleMouseDown(e, "right")}
            className="h-5 w-1 hover:h-6 duration-200 bg-green-500 border-white border rounded-full cursor-ew-resize hover:bg-green-600 -ml-[12px]"
          />
        </div>

        <div
          style={{ height: pb }}
          className="absolute z-[1008] bottom-0 left-0 right-0 flex items-start justify-center bg-green-500/20"
        >
          <div
            onMouseDown={(e) => handleMouseDown(e, "bottom")}
            className="w-5 hover:w-6 duration-200 h-1 bg-green-500 border-white border rounded-full cursor-ns-resize hover:bg-green-600 -mt-[12px]"
          />
        </div>

        <div
          style={{ width: pl }}
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
