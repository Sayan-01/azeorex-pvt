"use client";

import React, { useState } from "react";
import { useEditor } from "../../../../../providers/editor/editor-provider";
import { getElementById } from "@/lib/utils";

type MarginHandlesProps = {
  rect: DOMRect;
  selectedId: string;
  setResizing: (value: boolean) => void;
};

// Map side to both possible style key formats (camelCase and kebab-case)
const CAMEL: Record<string, string> = { top: "marginTop", right: "marginRight", bottom: "marginBottom", left: "marginLeft" };
const KEBAB: Record<string, string> = { top: "margin-top", right: "margin-right", bottom: "margin-bottom", left: "margin-left" };

/** Read margin value checking both camelCase and kebab-case keys */
function getMarginValue(styles: any, side: string): string {
  // Always check specific side first, as it overrides the shorthand
  const specificMargin = styles?.[CAMEL[side]] || styles?.[KEBAB[side]];
  if (specificMargin !== undefined) {
    return specificMargin;
  }

  if (styles?.margin) {
    const parts = styles.margin.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0];
    } else if (parts.length === 2) {
      return side === "top" || side === "bottom" ? parts[0] : parts[1];
    } else if (parts.length === 3) {
      if (side === "top") return parts[0];
      if (side === "left" || side === "right") return parts[1];
      if (side === "bottom") return parts[2];
    } else if (parts.length >= 4) {
      if (side === "top") return parts[0];
      if (side === "right") return parts[1];
      if (side === "bottom") return parts[2];
      if (side === "left") return parts[3];
    }
  }
  return "0px";
}

export default function MarginHandles({ rect, selectedId, setResizing }: MarginHandlesProps) {
  const { updateStyle, state } = useEditor();
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

    // Parse current margin (check both camelCase and kebab-case)
    const currentMargin = getMarginValue(element.styles, side);
    const marginValue = parseInt(currentMargin) || 0;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      let delta = 0;

      if (side === "top") delta = startY - moveEvent.clientY;
      if (side === "bottom") delta = moveEvent.clientY - startY;
      if (side === "left") delta = startX - moveEvent.clientX;
      if (side === "right") delta = moveEvent.clientX - startX;

      // Dragging outward = positive delta = increase margin
      const newMargin = Math.max(0, marginValue + delta);
      updateStyle(selectedId, CAMEL[side], `${newMargin}px`);
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

  // Read margin values (both formats)
  const mt = getMarginValue(element.styles, "top") ;
  const mr = getMarginValue(element.styles, "right");
  const mb = getMarginValue(element.styles, "bottom");
  const ml = getMarginValue(element.styles, "left");

  return (
    <>
      <div className="pointer-events-auto">
        {/* Top margin handle — background at z-[1004] (below selection border),
            draggable pill at z-[1009] (above selection border) */}
        <div
          style={{ height: mt == "auto" ? 0 : mt, top: mt == "auto" ? "0" : `-${mt}` }}
          className="absolute z-[1004] pointer-events-none left-0 right-0 flex items-end justify-center bg-orange-500/20 height-0 top-0"
        >
          <div className="absolute inset-0 flex items-end justify-center z-[1009] pointer-events-none">
            <div
              onMouseDown={(e) => handleMouseDown(e, "top")}
              className="w-5 hover:w-6 duration-200 h-1 bg-orange-400 border-white border rounded-full cursor-ns-resize hover:bg-orange-600 -translate-y-[12px] pointer-events-auto"
            />
          </div>
        </div>

        {/* Right margin handle */}
        <div
          style={{ width: mr == "auto" ? 0 : mr, right: mr == "auto" ? "0" : `-${mr}` }}
          className="absolute z-[1004] pointer-events-none top-0 bottom-0 right-0 flex items-center justify-start bg-orange-500/20 width-0 right-0"
        >
          <div className="absolute inset-0 flex items-center justify-start z-[1009] pointer-events-none">
            <div className="translate-x-[12px]" onMouseDown={(e) => handleMouseDown(e, "right")}>
              <div className="h-5 hover:h-6 duration-200 w-1 bg-orange-400 border-white border rounded-full cursor-ew-resize hover:bg-orange-600 pointer-events-auto" />
            </div>
          </div>
        </div>

        {/* Bottom margin handle */}
        <div
          style={{ height: mb == "auto" ? "auto" : mb, bottom: `${mb == "0" ? "" : `-${mb}`}` }}
          className="absolute z-[1004] pointer-events-none left-0 right-0 bottom-0 flex items-start justify-center bg-orange-500/20 height-0 bottom-0"
        >
          <div className="absolute inset-0 flex items-start justify-center z-[1009] pointer-events-none">
            <div
              onMouseDown={(e) => handleMouseDown(e, "bottom")}
              className="w-5 hover:w-6 duration-200 h-1 bg-orange-400 border-white border rounded-full cursor-ns-resize hover:bg-orange-600 translate-y-[12px] pointer-events-auto"
            />
          </div>
        </div>

        {/* Left margin handle */}
        <div
          style={{ width: ml == "auto" ? 0 : ml, left: `${ml == "0" ? "" : `-${ml}`}` }}
          className="absolute z-[1004] pointer-events-none top-0 bottom-0 left-0 flex items-center justify-end bg-orange-500/20 width-0 left-0"
        >
          <div className="absolute inset-0 flex items-center justify-end z-[1009] pointer-events-none">
            <div
              className="-translate-x-[12px]"
              onMouseDown={(e) => handleMouseDown(e, "left")}
            >
              <div className="h-5 hover:h-6 duration-200 w-1 bg-orange-400 border-white border rounded-full cursor-ew-resize hover:bg-orange-600 pointer-events-auto" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
