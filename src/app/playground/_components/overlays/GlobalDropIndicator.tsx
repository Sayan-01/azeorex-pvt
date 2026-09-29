"use client";

import React, { useCallback, useLayoutEffect, useRef } from "react";
import { useEditor } from "../../../../../providers/editor/editor-provider";

export default function GlobalDropIndicator() {
  const { state } = useEditor();
  const overlayRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const update = useCallback(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (!state.dropTargetId || (!state.draggedId && !state.draggedComponent)) {
      overlay.style.display = "none";
      return;
    }

    if (state.draggedId === state.dropTargetId) {
      overlay.style.display = "none";
      return;
    }

    const element = document.querySelector(`[data-element-id="${state.dropTargetId}"]`);
    if (!element) {
      overlay.style.display = "none";
      return;
    }

    const elRect = element.getBoundingClientRect();

    // Use container-relative (absolute) coords so scroll moves it for free.
    const container = overlay.offsetParent as HTMLElement | null;
    let absTop = elRect.top;
    let absLeft = elRect.left;
    if (container) {
      const cRect = container.getBoundingClientRect();
      absTop = elRect.top - cRect.top + container.scrollTop;
      absLeft = elRect.left - cRect.left + container.scrollLeft;
    }

    overlay.style.display = "";
    overlay.style.pointerEvents = "none";
    overlay.style.zIndex = "1002";
    overlay.style.position = "absolute";

    if (state.dropPosition === "before") {
      overlay.style.left = `${absLeft}px`;
      overlay.style.top = `${absTop - 2}px`;
      overlay.style.width = `${elRect.width}px`;
      overlay.style.height = "3px";
      overlay.style.backgroundColor = "#10b981";
      overlay.style.border = "none";
    } else if (state.dropPosition === "after") {
      overlay.style.left = `${absLeft}px`;
      overlay.style.top = `${absTop + elRect.height - 1}px`;
      overlay.style.width = `${elRect.width}px`;
      overlay.style.height = "3px";
      overlay.style.backgroundColor = "#10b981";
      overlay.style.border = "none";
    } else {
      overlay.style.left = `${absLeft}px`;
      overlay.style.top = `${absTop}px`;
      overlay.style.width = `${elRect.width}px`;
      overlay.style.height = `${elRect.height}px`;
      overlay.style.border = "2px dashed #10b981";
      overlay.style.backgroundColor = "rgba(16, 185, 129, 0.1)";
    }
  }, [state.dropTargetId, state.draggedId, state.draggedComponent, state.dropPosition]);

  useLayoutEffect(() => {
    update();

    const tick = () => {
      update();
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [update]);

  return (
    <div
      ref={overlayRef}
      style={{
        display: "none",
        willChange: "left, top, width, height",
      }}
    />
  );
}
