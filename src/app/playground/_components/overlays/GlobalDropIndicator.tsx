"use client";

import React, { useEffect, useState } from "react";
import { useEditor } from "../../../../../providers/editor/editor-provider";

export default function GlobalDropIndicator() {
  const { state } = useEditor();
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!state.dropTargetId || (!state.draggedId && !state.draggedComponent)) {
      setRect(null);
      return;
    }

    const element = document.querySelector(`[data-element-id="${state.dropTargetId}"]`);
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
  }, [state.dropTargetId, state.draggedId, state.draggedComponent]);

  if (!rect || !state.dropTargetId || (!state.draggedId && !state.draggedComponent) || state.draggedId === state.dropTargetId) {
    return null;
  }

  const getIndicatorStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: "fixed",
      backgroundColor: "#10b981",
      pointerEvents: "none",
      zIndex: 1002,
      transition: "all 0.1s",
    };

    if (state.dropPosition === "before") {
      return {
        ...base,
        left: rect.left,
        top: rect.top - 2,
        width: rect.width,
        height: 3,
      };
    } else if (state.dropPosition === "after") {
      return {
        ...base,
        left: rect.left,
        top: rect.bottom - 1,
        width: rect.width,
        height: 3,
      };
    } else {
      return {
        ...base,
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        border: "2px dashed #10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
      };
    }
  };

  return <div style={getIndicatorStyle()} />;
}
