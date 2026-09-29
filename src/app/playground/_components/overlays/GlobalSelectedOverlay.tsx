"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import ResizeHandles from "./ResizeHandler";
import PaddingHandles from "./PaddingHandles";
import { useEditor } from "../../../../../providers/editor/editor-provider";
import { Trash } from "lucide-react";
import { getElementById } from "@/lib/utils";
import MarginHandles from "./MarginHandles";

export default function GlobalSelectedOverlay({ resizing, setResizing, type }: { resizing: boolean; setResizing: (value: boolean) => void; type: boolean }) {
  const { state, deleteElement } = useEditor();
  const overlayRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const lastRectRef = useRef<{ l: number; t: number; w: number; h: number } | null>(null);

  const selectedElement = state.selectedId ? getElementById(state.selectedId, state.elements) : null;

  // Direct DOM mutation for zero-lag positioning; only setState when the
  // rect actually changed, so children don't re-render on every call.
  const update = useCallback(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (!state.selectedId) {
      overlay.style.display = "none";
      lastRectRef.current = null;
      setRect(null);
      return;
    }

    const element = document.querySelector(`[data-element-id="${state.selectedId}"]`);
    if (!element) {
      overlay.style.display = "none";
      lastRectRef.current = null;
      setRect(null);
      return;
    }

    const r = element.getBoundingClientRect();

    overlay.style.display = "";
    overlay.style.left = `${r.left}px`;
    overlay.style.top = `${r.top}px`;
    overlay.style.width = `${r.width}px`;
    overlay.style.height = `${r.height}px`;

    const prev = lastRectRef.current;
    if (!prev || prev.l !== r.left || prev.t !== r.top || prev.w !== r.width || prev.h !== r.height) {
      lastRectRef.current = { l: r.left, t: r.top, w: r.width, h: r.height };
      setRect(r);
    }
  }, [state.selectedId]);

  // Zero-lag tracking DURING an active resize/drag only. This is the only
  // time we actually need per-frame getBoundingClientRect() calls.
  useLayoutEffect(() => {
    if (!resizing) return;

    const tick = () => {
      update();
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [resizing, update]);

  // When idle (not resizing), stay in sync via events instead of polling:
  // - selection/content change -> update immediately
  // - element resizes (e.g. text reflow, prop-driven size change) -> ResizeObserver
  // - page scrolls/viewport resizes -> passive listeners
  useLayoutEffect(() => {
    update();
    if (resizing || !state.selectedId) return;

    const element = document.querySelector(`[data-element-id="${state.selectedId}"]`);
    if (!element) return;

    const ro = new ResizeObserver(update);
    ro.observe(element);

    return () => ro.disconnect();
    // Re-run when selection or element tree changes so we observe the right node.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedId, state.elements, resizing, update]);

  useEffect(() => {
    if (resizing) return;
    window.addEventListener("scroll", update, { passive: true, capture: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [resizing, update]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (state.selectedId) {
      deleteElement(state.selectedId);
    }
  };

  const isVisible = !!rect && !!state.selectedId;
  const shortId = selectedElement?.id ? (selectedElement.id.length > 10 ? selectedElement.id.slice(0, 10) + "..." : selectedElement.id) : "element";

  return (
    <div
      ref={overlayRef}
      className="fixed border-2 border-blue-500 rounded pointer-events-none z-[1007] rounded-[4px]"
      style={{
        display: isVisible ? "" : "none",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        willChange: "left, top, width, height",
      }}
      onClick={handleOverlayClick}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {isVisible && type && rect && state.selectedId && (
        <>
          <ResizeHandles
            rect={rect}
            selectedId={state.selectedId}
            setResizing={setResizing}
          />
          <PaddingHandles
            setResizing={setResizing}
            rect={rect}
            selectedId={state.selectedId}
          />
          <MarginHandles
            setResizing={setResizing}
            rect={rect}
            selectedId={state.selectedId}
          />
        </>
      )}
      {resizing && <div className="absolute inset-0 border border-blue-600 rounded pointer-events-none z-[1008]" />}
      {isVisible && selectedElement?.type != "__body" && (
        <div className="w-full relative min-w-[112px]">
          <div className="absolute bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-0.5 h-[18px] -top-4.5 -left-[1px] rounded-t-sm z-[1008] pointer-events-auto cursor-pointer max-w-[100px]">
            {shortId}
          </div>
          <button
            onClick={handleDelete}
            className="absolute bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-0.5 h-[18px] -top-4.5 -right-0.5 rounded-t-sm z-[1008] pointer-events-auto cursor-pointer"
          >
            <Trash size={12} />
          </button>
        </div>
      )}
    </div>
  );
}
