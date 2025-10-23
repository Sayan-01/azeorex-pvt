"use client";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { EyeOff } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useEditor } from "../../../../providers/editor/editor-provider";

const Editor = ({ code, isLive }: { code: string; isLive?: boolean }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { dispatch, state, enableEditingFeatures } = useEditor();

  const handleUnpreview = () => {
    dispatch({ type: "TOGGLE_PREVIEW_MODE" });
    dispatch({ type: "TOGGLE_LIVE_MODE" });
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const iframeDoc = iframe.contentDocument;
    if (!iframeDoc) return;

    if (state.previewMode || state.liveMode) {
      iframeDoc.querySelectorAll(".overlay-indicator").forEach((el) => el.remove());
      return; 
    }

    let selectedOverlay: HTMLDivElement | null = null;
    let hoverOverlay: HTMLDivElement | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let currentSelectedElement: HTMLElement | null = null;

    const createOverlay = (rect: DOMRect, color: string, fill?: string, isSelected = false) => {
      const overlay = iframeDoc.createElement("div");
      overlay.style.position = "absolute";
      overlay.style.top = `${rect.top + (iframe.contentWindow?.scrollY || 0)}px`;
      overlay.style.left = `${rect.left + (iframe.contentWindow?.scrollX || 0)}px`;
      overlay.style.width = `${rect.width}px`;
      overlay.style.height = `${rect.height}px`;
      overlay.style.border = `2px solid ${color}`;
      overlay.style.backgroundColor = fill ?? "transparent";
      overlay.style.pointerEvents = "none";
      overlay.style.zIndex = isSelected ? "1000001" : "1000000";
      overlay.classList.add("overlay-indicator");
      iframeDoc.body.appendChild(overlay);
      return overlay;
    };

    const removeOverlays = () => {
      iframeDoc.querySelectorAll(".overlay-indicator").forEach((el) => el.remove());
    };

    const updateOverlayPosition = () => {
      if (!selectedOverlay || !currentSelectedElement) return;
      const rect = currentSelectedElement.getBoundingClientRect();
      selectedOverlay.style.top = `${rect.top + (iframe.contentWindow?.scrollY || 0)}px`;
      selectedOverlay.style.left = `${rect.left + (iframe.contentWindow?.scrollX || 0)}px`;
      selectedOverlay.style.width = `${rect.width}px`;
      selectedOverlay.style.height = `${rect.height}px`;
    };

    const handleMouseOver = (e: MouseEvent) => {
      e.stopPropagation();

      const target = e.target as HTMLElement;
      if (!target || target === iframeDoc.body || target.classList.contains("overlay-indicator")) return;

      const rect = target.getBoundingClientRect();

      // Remove old hover overlay
      if (hoverOverlay) hoverOverlay.remove();
      hoverOverlay = createOverlay(rect, "#00bfff");

      // Function to update hover overlay on resize/scroll
      const updateHoverOverlayPosition = () => {
        if (!hoverOverlay) return;
        const rect = target.getBoundingClientRect();
        hoverOverlay.style.top = `${rect.top + (iframe.contentWindow?.scrollY || 0)}px`;
        hoverOverlay.style.left = `${rect.left + (iframe.contentWindow?.scrollX || 0)}px`;
        hoverOverlay.style.width = `${rect.width}px`;
        hoverOverlay.style.height = `${rect.height}px`;
      };

      // Disconnect previous observer
      if (resizeObserver) resizeObserver.disconnect();

      // Create a new one for hover overlay
      resizeObserver = new ResizeObserver(updateHoverOverlayPosition);
      resizeObserver.observe(target);

      // Keep hover overlay in sync with scroll/resize
      iframeDoc.addEventListener("scroll", updateHoverOverlayPosition);
      iframe.contentWindow?.addEventListener("resize", updateHoverOverlayPosition);

      // Clean up when mouse leaves
      target.addEventListener(
        "mouseleave",
        () => {
          if (hoverOverlay) {
            hoverOverlay.remove();
            hoverOverlay = null;
          }
          if (resizeObserver) resizeObserver.disconnect();
          iframeDoc.removeEventListener("scroll", updateHoverOverlayPosition);
          iframe.contentWindow?.removeEventListener("resize", updateHoverOverlayPosition);
        },
        { once: true }
      );
    };

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const target = e.target as HTMLElement;
      if (!target || target === iframeDoc.body || target.classList.contains("overlay-indicator")) return;

      const rect = target.getBoundingClientRect();

      // ✅ Disable contentEditable on previous element
      if (currentSelectedElement && currentSelectedElement !== target) {
        currentSelectedElement.contentEditable = "false";
        currentSelectedElement.style.outline = "none";
      }

      // ✅ Enable inline editing on clicked element
      target.contentEditable = "true";
      target.style.outline = "none";
      currentSelectedElement = target;

      // ✅ Save selected element
      dispatch({
        type: "SELECT_ELEMENT",
        payload: { elementId: target.id || "" },
      });

      // ✅ Remove old overlays
      removeOverlays();

      // ✅ Create persistent selected overlay
      selectedOverlay = createOverlay(rect, "#ff6b00", "rgba(255,107,0,0.15)", true);

      // ✅ Setup ResizeObserver to track dimension changes
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      resizeObserver = new ResizeObserver(() => {
        updateOverlayPosition();
      });
      resizeObserver.observe(target);
    };

    // Keep selected overlay synced with scroll
    const handleScroll = () => {
      updateOverlayPosition();
    };

    // Update overlay on window resize (device change)
    const handleResize = () => {
      updateOverlayPosition();
    };

    iframeDoc.addEventListener("mouseover", handleMouseOver);
    iframeDoc.addEventListener("click", handleClick);
    iframeDoc.addEventListener("scroll", handleScroll);
    iframe.contentWindow?.addEventListener("resize", handleResize);

    return () => {
      iframeDoc.removeEventListener("mouseover", handleMouseOver);
      iframeDoc.removeEventListener("click", handleClick);
      iframeDoc.removeEventListener("scroll", handleScroll);
      iframe.contentWindow?.removeEventListener("resize", handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (currentSelectedElement) {
        currentSelectedElement.contentEditable = "false";
      }
    };
  }, [dispatch, state.selectedElementId, state.previewMode, state.liveMode]);

  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Preview</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" rel="stylesheet">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" rel="stylesheet">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.11.2/lottie.min.js"></script>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css" />
            <script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>
            <link rel="stylesheet" href="https://unpkg.com/tippy.js@6/dist/tippy.css" />
            <script src="https://unpkg.com/@popperjs/core@2"></script>
            <script src="https://unpkg.com/tippy.js@6"></script>
          </head>
          <body>
            ${code}
          </body>
          </html>
        `);
        doc.close();
        enableEditingFeatures(doc);
      }
    }
  }, [code]);

  useEffect(() => {
    if (isLive) {
      dispatch({
        type: "TOGGLE_LIVE_MODE",
        payload: { value: true },
      });
    }
  }, [isLive]);

  // Trigger resize event when device changes to update overlay
  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe?.contentWindow) {
      // Trigger resize event after a small delay to ensure layout has updated
      setTimeout(() => {
        iframe.contentWindow?.dispatchEvent(new Event("resize"));
      }, 100);
    }
  }, [state.device]);

  return (
    <div
      className={clsx("use-automation-zoom-in h-[calc(100%-40.8px)] overflow-y-auto mx-[240px] bg-[#272727] transition-all box !relative p-3 pb-[19px]", {
        "!p-0 !mr-0 !mx-0 h-full ": state.previewMode === true || state.liveMode === true,
        "!w-[850px]": state.device === "Tablet",
        "!w-[420px]": state.device === "Mobile",
        "w-full": state.device === "Desktop",
      })}
    >
      <iframe
        ref={iframeRef}
        className={clsx("w-full h-screen", {
          "w-full !h-[calc(100vh-73px)] rounded-2xl border border-zinc-700": state.previewMode === false && state.liveMode === false,
        })}
        sandbox="allow-scripts allow-same-origin"
      />
      {state.previewMode && state.liveMode && (
        <Button
          variant={"ghost"}
          size={"icon"}
          className="w-6 h-6 bg-slate-600 p-[2px] fixed top-0 left-0 z-[100]"
          onClick={handleUnpreview}
        >
          <EyeOff />
        </Button>
      )}
    </div>
  );
};

export default Editor;
