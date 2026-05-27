"use client";

import React, { useCallback, useLayoutEffect, useRef } from "react";
import { useEditor } from "../../../../../providers/editor/editor-provider";
import clsx from "clsx";

export default function GlobalHoverOverlay({ resizing }: { resizing: boolean }) {
  const { state } = useEditor();
  const overlayRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const hasTargetRef = useRef(false);

  const update = useCallback(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (!state.hoverId || state.hoverId === state.selectedId) {
      overlay.style.display = "none";
      hasTargetRef.current = false;
      return;
    }

    const element = document.querySelector(`[data-element-id="${state.hoverId}"]`);
    if (!element) {
      overlay.style.display = "none";
      hasTargetRef.current = false;
      return;
    }

    const rect = element.getBoundingClientRect();
    overlay.style.display = resizing ? "none" : "";
    overlay.style.left = `${rect.left}px`;
    overlay.style.top = `${rect.top}px`;
    overlay.style.width = `${rect.width}px`;
    overlay.style.height = `${rect.height}px`;
    hasTargetRef.current = true;
  }, [state.hoverId, state.selectedId, resizing]);

  // Use rAF loop for zero-lag tracking during scroll / drag
  useLayoutEffect(() => {
    update();

    const tick = () => {
      update();
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [update]);

  // Always render the div so the ref is available
  return (
    <div
      ref={overlayRef}
      className="fixed border-2 border-dashed border-cyan-400 pointer-events-none z-[1000]"
      style={{
        display: "none",
        willChange: "left, top, width, height",
      }}
    />
  );
}
