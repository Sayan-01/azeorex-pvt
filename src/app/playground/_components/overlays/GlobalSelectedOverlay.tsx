"use client";

import React, { useEffect, useState } from "react";
import ResizeHandles from "./ResizeHandler";
// import PaddingHandles from "./PaddingHandles";
// import MarginHandles from "./MarginHandles";
import { useEditor } from "../../../../../providers/editor/editor-provider";
import { Trash } from "lucide-react";
import { getElementById } from "@/lib/utils";

export default function GlobalSelectedOverlay({ resizing, setResizing }: { resizing: boolean; setResizing: (value: boolean) => void }) {
  const { state, deleteElement } = useEditor();
  const [rect, setRect] = useState<DOMRect | null>(null);

  const selectedElement = state.selectedId ? getElementById(state.selectedId, state.elements) : null;

  useEffect(() => {
    if (!state.selectedId) {
      setRect(null);
      return;
    }

    const element = document.querySelector(`[data-element-id="${state.selectedId}"]`);
    if (!element) return;

    const updateRect = () => {
      setRect(element.getBoundingClientRect());
    };

    updateRect();

    const observer = new ResizeObserver(updateRect);
    const mutationObserver = new MutationObserver(updateRect);

    observer.observe(element);
    mutationObserver.observe(element, {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
    });

    window.addEventListener("scroll", updateRect, true);
    window.addEventListener("resize", updateRect);

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", updateRect, true);
      window.removeEventListener("resize", updateRect);
    };
  }, [state.selectedId]);

  if (!rect || !state.selectedId) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (state.selectedId) {
      deleteElement(state.selectedId);
    }
  };

  return (
    <div
      className="fixed border-4 border-blue-500 rounded pointer-events-none z-[1007] "
      style={{
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        backgroundColor: "rgba(59, 130, 246, 0.1)",
      }}
      onClick={handleOverlayClick}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <ResizeHandles
        rect={rect}
        selectedId={state.selectedId}
        setResizing={setResizing}
      />
      {/* <PaddingHandles
        rect={rect}
        selectedId={state.selectedId}
      />
      <MarginHandles
        rect={rect}
        selectedId={state.selectedId}
      /> */}

      {/* Visual indicator when resizing */}
      {resizing && <div className="absolute inset-0 border border-blue-600 rounded pointer-events-none z-[1008]" />}
      {selectedElement?.type != "__body" && (
        <div className="w-full relative border min-w-[112px]">
          <div className="absolute bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-0.5 h-[18px] -top-5 -left-0.5 rounded z-[1008] pointer-events-auto cursor-pointer max-w-[100px]">
            {selectedElement?.id.slice(0, 10) + "..." || "element"}
          </div>
          <button
            onClick={handleDelete}
            className="absolute bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-0.5 h-[18px] -top-5 -right-0.5 rounded z-[1008] pointer-events-auto cursor-pointer"
          >
            <Trash size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
