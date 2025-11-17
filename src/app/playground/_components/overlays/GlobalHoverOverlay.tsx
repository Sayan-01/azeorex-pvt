"use client";

import React, { useEffect, useState } from "react";
import { useEditor } from "../../../../../providers/editor/editor-provider";
import clsx from "clsx";

export default function GlobalHoverOverlay({ resizing }: { resizing: boolean }) {
  const { state } = useEditor();
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!state.hoverId || state.hoverId === state.selectedId) {
      setRect(null);
      return;
    }

    const element = document.querySelector(`[data-element-id="${state.hoverId}"]`);
    if (!element) return;

    const updateRect = () => {
      setRect(element.getBoundingClientRect());
    };

    updateRect();

    const observer = new ResizeObserver(updateRect);
    observer.observe(element);
    window.addEventListener("scroll", updateRect, true);
    window.addEventListener("resize", updateRect);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateRect, true);
      window.removeEventListener("resize", updateRect);
    };
  }, [state.hoverId, state.selectedId]);

  if (!rect || !state.hoverId || state.hoverId === state.selectedId) return null;

  return (
    <div
      className={clsx("fixed border-2  border-cyan-400 pointer-events-none z-[1000]", {
        "hidden": resizing,
      })}
      style={{
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      }}
    />
  );
}
