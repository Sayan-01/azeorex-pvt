"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { useEditor } from "../../../../../providers/editor/editor-provider";

export default function GlobalHoverOverlay({ resizing }: { resizing: boolean }) {
  const { state } = useEditor();
  const overlayRef = useRef<HTMLDivElement>(null);

  // Direct DOM mutation, no React re-render needed at all here — this
  // overlay has no children/derived state, so there's nothing to sync back.
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

    const rect = element.getBoundingClientRect();
    overlay.style.display = "";
    overlay.style.left = `${rect.left}px`;
    overlay.style.top = `${rect.top}px`;
    overlay.style.width = `${rect.width}px`;
    overlay.style.height = `${rect.height}px`;
  }, [state.hoverId, state.selectedId, resizing]);

  // Recompute whenever the hover target, selection, or resizing state changes.
  useLayoutEffect(() => {
    update();
  }, [update]);

  // Track the hovered element's own size (e.g. text reflow) without polling.
  useLayoutEffect(() => {
    if (resizing || !state.hoverId || state.hoverId === state.selectedId) return;

    const element = document.querySelector(`[data-element-id="${state.hoverId}"]`);
    if (!element) return;

    const ro = new ResizeObserver(update);
    ro.observe(element);

    return () => ro.disconnect();
  }, [state.hoverId, state.selectedId, resizing, update]);

  // Track scroll/viewport changes without polling.
  useEffect(() => {
    if (resizing) return;
    window.addEventListener("scroll", update, { passive: true, capture: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [resizing, update]);

  return (
    <div
      ref={overlayRef}
      className="fixed border-2 border-dashed border-blue-500 pointer-events-none z-[1000]"
      style={{
        display: "none",
        willChange: "left, top, width, height",
      }}
    />
  );
}
