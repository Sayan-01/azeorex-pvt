"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { useEditor } from "../../../../../providers/editor/editor-provider";

export default function GlobalHoverOverlay({ resizing }: { resizing: boolean }) {
  const { state } = useEditor();
  const overlayRef = useRef<HTMLDivElement>(null);

  // Walk up the DOM to check if element itself or any ancestor is fixed/sticky.
  const hasFixedOrStickyAncestor = (el: Element): boolean => {
    let node: Element | null = el;
    let el_id = el.getAttribute("data-element-id") as string;
    while (node && node !== document.documentElement && el_id !== "__body") {
      const pos = getComputedStyle(node).position;
      if (pos === "fixed" || pos === "sticky") return true;
      node = node.parentElement;
      el_id = node?.getAttribute("data-element-id") as string;
    }
    return false;
  };

  // Position using container-relative (absolute) coordinates — browser handles
  // scroll movement automatically, no JS polling needed.
  const update = useCallback(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (resizing || !state.hoverId || state.hoverId === state.selectedId) {
      overlay.style.display = "none";
      return;
    }

    const element = document.querySelector(`[data-element-id="${state.hoverId}"]`);
    if (!element) {
      overlay.style.display = "none";
      return;
    }

    const elRect = element.getBoundingClientRect();

    // If element OR any ancestor is fixed/sticky → overlay must be fixed too.
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
  }, [state.hoverId, state.selectedId, resizing]);

  // Recompute whenever hover target, selection, or resizing state changes.
  useLayoutEffect(() => {
    update();
  }, [update]);

  // Track the hovered element's own size changes (e.g. text reflow).
  useLayoutEffect(() => {
    if (resizing || !state.hoverId || state.hoverId === state.selectedId) return;
    const element = document.querySelector(`[data-element-id="${state.hoverId}"]`);
    if (!element) return;
    const ro = new ResizeObserver(update);
    ro.observe(element);
    return () => ro.disconnect();
  }, [state.hoverId, state.selectedId, resizing, update]);

  // Only viewport resize needed — scroll is handled by CSS (position:absolute).
  useEffect(() => {
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, [update]);

  return (
    <div
      ref={overlayRef}
      // position:absolute — rides with scroll automatically, zero JS lag.
      className="absolute border-2 border-dashed border-blue-500 pointer-events-none z-[1000]"
      style={{
        display: "none",
        willChange: "left, top, width, height",
      }}
    />
  );
}
