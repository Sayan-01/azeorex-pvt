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

  // rect is the viewport DOMRect — passed to child handles so their
  // pointer-event math (which uses clientX/Y) stays unchanged.
  const [rect, setRect] = useState<DOMRect | null>(null);
  const lastRectRef = useRef<{ l: number; t: number; w: number; h: number } | null>(null);

  const selectedElement = state.selectedId ? getElementById(state.selectedId, state.elements) : null;

  // Position the overlay using container-relative (absolute) coordinates so
  // that browser scroll moves it automatically — zero JS lag during scroll.
  // Walk up the DOM to check if element itself or any ancestor is fixed/sticky.
  const hasFixedOrStickyAncestor = (el: Element): boolean => {
    let node: Element | null = el;
    let el_id = el.getAttribute("data-element-id");
    
    
    while (node && node !== document.documentElement && el_id !== "__body") {
      const pos = getComputedStyle(node).position;
      if (pos === "fixed" || pos === "sticky") return true;
      node = node.parentElement;
      el_id = node?.getAttribute("data-element-id") as string;
    }
    return false;
  };
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

    const elRect = element.getBoundingClientRect();

    // If the element OR any ancestor is position:fixed/sticky, the element
    // doesn't scroll — overlay must be fixed (viewport-relative) too.
    const isFixed = hasFixedOrStickyAncestor(element);
    if (isFixed) {
      overlay.style.position = "fixed";
      overlay.style.left = `${elRect.left}px`;
      overlay.style.top = `${elRect.top}px`;
    } else {
      overlay.style.position = "absolute";
      const container = overlay.offsetParent as HTMLElement | null;
      let absTop = elRect.top;
      let absLeft = elRect.left;
      if (container) {
        const cRect = container.getBoundingClientRect();
        absTop = elRect.top - cRect.top + container.scrollTop;
        absLeft = elRect.left - cRect.left + container.scrollLeft;
      }
      overlay.style.left = `${absLeft}px`;
      overlay.style.top = `${absTop}px`;
    }

    overlay.style.display = "";
    overlay.style.width = `${elRect.width}px`;
    overlay.style.height = `${elRect.height}px`;

    // Store viewport rect for children (ResizeHandles, etc. use clientX/Y).
    const prev = lastRectRef.current;
    if (!prev || prev.l !== elRect.left || prev.t !== elRect.top || prev.w !== elRect.width || prev.h !== elRect.height) {
      lastRectRef.current = { l: elRect.left, t: elRect.top, w: elRect.width, h: elRect.height };
      setRect(elRect);
    }
  }, [state.selectedId]);

  // RAF loop only during active resize/drag — keeps overlay in sync while
  // element size is changing (no scroll involved).
  useLayoutEffect(() => {
    if (!resizing) return;
    const tick = () => {
      update();
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [resizing, update]);

  // Update on selection / element-tree change + observe element size changes.
  useLayoutEffect(() => {
    update();
    if (resizing || !state.selectedId) return;
    const element = document.querySelector(`[data-element-id="${state.selectedId}"]`);
    if (!element) return;
    const ro = new ResizeObserver(update);
    ro.observe(element);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedId, state.elements, resizing, update]);

  // Only viewport resize needed — scroll is handled by CSS (position:absolute).
  useEffect(() => {
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, [update]);

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
      // position:absolute — lives inside the scrollable container, so it
      // moves with content during scroll with zero JavaScript involvement.
      className="absolute border-2 border-blue-500 rounded pointer-events-none z-[1007] rounded-[4px]"
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
