"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { clsx } from "clsx";
import { EditorElement, useEditor } from "../../../providers/editor/editor-provider";

// Simplified interface for drag state
interface DragState {
  active: boolean;
  type: string | null;
  startX: number;
  startY: number;
  initialValues: {
    width: number;
    height: number;
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    paddingLeft: number;
    marginTop: number;
    marginRight: number;
    marginBottom: number;
    marginLeft: number;
  };
}

const SelectionOverlay = ({ element }: { element: EditorElement}) => {
  const { state, dispatch } = useEditor();
  const overlayRef = useRef<HTMLDivElement>(null);

  // Default values
  const initialWidth = "100%";
  const initialHeight = "80px";
  const minWidth = 50;
  const minHeight = 50;
  const minPadding = 0;

  // Parse style values
  const parseStyleValue = (value: string | undefined, defaultValue: number): number => {
    if (!value) return defaultValue;
    return parseInt(value.replace("px", ""), 10) || defaultValue;
  };

  // Get current dimensions from state or use defaults
  const currentWidth = (element?.styles?.width as string) || initialWidth;
  const currentHeight = (element?.styles?.height as string) || initialHeight;
  const currentPaddingTop = parseStyleValue(element?.styles?.paddingTop as string, 0);
  const currentPaddingRight = parseStyleValue(element?.styles?.paddingRight as string, 0);
  const currentPaddingBottom = parseStyleValue(element?.styles?.paddingBottom as string, 0);
  const currentPaddingLeft = parseStyleValue(element?.styles?.paddingLeft as string, 0);
  const currentMarginTop = parseStyleValue(element?.styles?.marginTop as string, 0);
  const currentMarginRight = parseStyleValue(element?.styles?.marginRight as string, 0);
  const currentMarginBottom = parseStyleValue(element?.styles?.marginBottom as string, 0);
  const currentMarginLeft = parseStyleValue(element?.styles?.marginLeft as string, 0);

  // Consolidated drag state
  const [dragState, setDragState] = useState<DragState>({
    active: false,
    type: null,
    startX: 0,
    startY: 0,
    initialValues: {
      width: parseStyleValue(currentWidth, 0),
      height: parseStyleValue(currentHeight, 0),
      paddingTop: currentPaddingTop,
      paddingRight: currentPaddingRight,
      paddingBottom: currentPaddingBottom,
      paddingLeft: currentPaddingLeft,
      marginTop: currentMarginTop,
      marginRight: currentMarginRight,
      marginBottom: currentMarginBottom,
      marginLeft: currentMarginLeft,
    },
  });

  // Update overlay position when selection changes
  useEffect(() => {
    if (!state.editor.selectedElement.id || !overlayRef.current) return;

    const element = document.getElementById(state.editor.selectedElement.id);
    if (!element) return;

    const updateOverlayPosition = () => {
      const rect = element.getBoundingClientRect();
      const parentRect = document.getElementById("perent")?.getBoundingClientRect() || { left: 0, top: 0 };

      // Get parent's scroll position
      const parentElement = document.getElementById("perent");
      const scrollTop = parentElement ? parentElement.scrollTop : 0;
      const scrollLeft = parentElement ? parentElement.scrollLeft : 0;

      if (overlayRef.current) {
        overlayRef.current.style.width = `${rect.width}px`;
        overlayRef.current.style.height = `${rect.height}px`;
        overlayRef.current.style.left = `${rect.left - parentRect.left + scrollLeft}px`;
        overlayRef.current.style.top = `${rect.top - parentRect.top + scrollTop}px`;
      }
    };

    updateOverlayPosition();

    const resizeObserver = new ResizeObserver(updateOverlayPosition);
    resizeObserver.observe(element);

    // Add scroll event listener
    const parentElement = document.getElementById("perent");
    if (parentElement) {
      parentElement.addEventListener("scroll", updateOverlayPosition);
    }

    return () => {
      resizeObserver.disconnect();
      if (parentElement) {
        parentElement.removeEventListener("scroll", updateOverlayPosition);
      }
    };
  }, [state.editor.selectedElement.id, state.editor.selectedElement, dragState, state, overlayRef.current]);

  // Handle mouse down on resize/padding/margin handles
  const handleMouseDown = (e: React.MouseEvent, type: string) => {
    if (element.type === "__body") return;

    e.preventDefault();
    e.stopPropagation();

    // Parse current dimensions without 'px' for calculations
    const currentWidthValue = parseStyleValue(currentWidth, 0);
    const currentHeightValue = parseStyleValue(currentHeight, 0);

    setDragState({
      active: true,
      type,
      startX: e.clientX,
      startY: e.clientY,
      initialValues: {
        width: currentWidthValue,
        height: currentHeightValue,
        paddingTop: currentPaddingTop,
        paddingRight: currentPaddingRight,
        paddingBottom: currentPaddingBottom,
        paddingLeft: currentPaddingLeft,
        marginTop: currentMarginTop,
        marginRight: currentMarginRight,
        marginBottom: currentMarginBottom,
        marginLeft: currentMarginLeft,
      },
    });
  };

  // Global mouse move and mouse up handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragState.active) return;

      let newStyles = { ...element.styles };

      const deltaX = e.clientX - dragState.startX;
      const deltaY = e.clientY - dragState.startY;

      // Handle different resize types
      switch (dragState.type) {
        case "right":
        case "corner":
          newStyles.width = `${Math.max(minWidth, dragState.initialValues.width + deltaX)}px`;
          if (dragState.type === "corner") {
            newStyles.height = `${Math.max(minHeight, dragState.initialValues.height + deltaY)}px`;
          }
          break;

        case "bottom":
          newStyles.height = `${Math.max(minHeight, dragState.initialValues.height + deltaY)}px`;
          break;

        case "padding-top":
          newStyles.paddingTop = `${Math.max(minPadding, dragState.initialValues.paddingTop + deltaY)}px`;
          break;

        case "padding-right":
          newStyles.paddingRight = `${Math.max(minPadding, dragState.initialValues.paddingRight - deltaX)}px`;
          break;

        case "padding-bottom":
          newStyles.paddingBottom = `${Math.max(minPadding, dragState.initialValues.paddingBottom - deltaY)}px`;
          break;

        case "padding-left":
          newStyles.paddingLeft = `${Math.max(minPadding, dragState.initialValues.paddingLeft + deltaX)}px`;
          break;

        case "margin-top":
          newStyles.marginTop = `${Math.max(minPadding, dragState.initialValues.marginTop + deltaY)}px`;
          break;

        case "margin-right":
          newStyles.marginRight = `${Math.max(minPadding, dragState.initialValues.marginRight - deltaX)}px`;
          break;

        case "margin-bottom":
          newStyles.marginBottom = `${Math.max(minPadding, dragState.initialValues.marginBottom - deltaY)}px`;
          break;

        case "margin-left":
          newStyles.marginLeft = `${Math.max(minPadding, dragState.initialValues.marginLeft + deltaX)}px`;
          break;
      }

      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          elementDetails: {
            ...element,
            styles: newStyles,
          },
        },
      });
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (dragState.active) {
        e.preventDefault();
        e.stopPropagation();

        // Important: ensure we're still the selected element after the drag
        dispatch({
          type: "CHANGE_CLICKED_ELEMENT",
          payload: {
            elementDetails: element,
          },
        });

        setDragState((prev) => ({ ...prev, active: false }));
      }
    };

    if (dragState.active) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      // Add a temporary overlay to capture clicks during dragging
      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100vw";
      overlay.style.height = "100vh";
      overlay.style.zIndex = "9999";
      overlay.style.cursor = "grabbing";
      overlay.style.userSelect = "none";
      overlay.style.pointerEvents = "all";
      overlay.style.background = "transparent";
      document.body.appendChild(overlay);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.removeChild(overlay);
      };
    }
  }, [dragState, dispatch, element]);

  // Critical: Handle overlay click to prevent deselection
  const handleOverlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Ensure the element stays selected
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  // Early return if no element is selected or if the body is selected
  if (!state.editor.selectedElement.id || state.editor.selectedElement.type === "__body") return null;

  // Render resize handles component
  const ResizeHandles = () => (
    <div className="pointer-events-auto">
      {/* Right resize handle */}
      <div
        className={`absolute z-[1008] right-0 top-0 bottom-0 w-2 cursor-ew-resize bg-transparent hover:bg-blue-500/20 ${element.styles?.width?.toString().includes("px") ? "" : "hidden"}`}
        onMouseDown={(e) => handleMouseDown(e, "right")}
      />

      {/* Bottom resize handle */}
      <div
        className={`absolute z-[1008] bottom-0 left-0 right-0 h-2 cursor-ns-resize bg-transparent hover:bg-blue-500/20 ${element.styles?.height?.toString().includes("px") ? "" : "hidden"}`}
        onMouseDown={(e) => handleMouseDown(e, "bottom")}
      />

      {/* Corner resize handle */}
      <div
        className={`absolute z-[1008] bottom-0 right-0 w-4 h-4 cursor-nwse-resize bg-transparent hover:bg-blue-500/20`}
        onMouseDown={(e) => handleMouseDown(e, "corner")}
      />
    </div>
  );

  // Render padding handles component
  const PaddingHandles = () => (
    <div className=" pointer-events-auto">
      {/* Top padding handle */}
      <div
        style={{ height: element.styles?.paddingTop }}
        className="absolute z-[1008] top-0 left-0 right-0 flex items-end justify-center bg-green-500/20"
      >
        <div
          onMouseDown={(e) => handleMouseDown(e, "padding-top")}
          className="w-3 hover:w-6 duration-200 h-2 bg-green-500 border-white border-2 rounded-full cursor-ns-resize hover:bg-purple-600 -mb-[9px]"
        />
      </div>

      {/* Right padding handle */}
      <div
        style={{ width: element.styles?.paddingRight }}
        className="absolute z-[1008] top-0 right-0 bottom-0 flex items-center justify-start bg-green-500/20"
      >
        <div
          onMouseDown={(e) => handleMouseDown(e, "padding-right")}
          className="h-3 w-2 hover:h-6 duration-200 bg-green-500 border-white border-2 rounded-full cursor-ew-resize hover:bg-purple-600 -ml-[9px]"
        />
      </div>

      {/* Bottom padding handle */}
      <div
        style={{ height: element.styles?.paddingBottom }}
        className="absolute z-[1008] bottom-0 left-0 right-0 flex items-start justify-center bg-green-500/20"
      >
        <div
          onMouseDown={(e) => handleMouseDown(e, "padding-bottom")}
          className="w-3 hover:w-6 duration-200 h-2 bg-green-500 border-white border-2 rounded-full cursor-ns-resize hover:bg-purple-600 -mt-[9px]"
        />
      </div>

      {/* Left padding handle */}
      <div
        style={{ width: element.styles?.paddingLeft }}
        className="absolute z-[1008] top-0 left-0 bottom-0 flex items-center justify-end bg-green-500/20"
      >
        <div
          onMouseDown={(e) => handleMouseDown(e, "padding-left")}
          className="h-3 w-2 hover:h-6 duration-200 bg-green-500 border-white border-2 rounded-full cursor-ew-resize hover:bg-purple-600 -mr-[9px]"
        />
      </div>
    </div>
  );

  // Render margin handles component
  const MarginHandles = () => (
    <div className=" pointer-events-auto">
      {/* Top margin handle */}
      <div
        style={{ height: element.styles?.marginTop, top: `-${element.styles?.marginTop}` }}
        className={`absolute z-[1008] left-0 right-0 flex items-end justify-center ${dragState.active ? "" : "bg-orange-500/20"} ${element.styles?.marginTop?.toString().includes("px") ? "" : "hidden"}`}
      >
        <div
          onMouseDown={(e) => handleMouseDown(e, "margin-top")}
          className="w-3 hover:w-6 duration-200 h-2 bg-orange-500 border-white border-2 rounded-full cursor-ns-resize hover:bg-orange-600 mb-0"
        />
      </div>

      {/* Right margin handle */}
      <div
        style={{ width: element.styles?.marginRight, right: `-${element.styles?.marginRight}` }}
        className={`absolute z-[1008] top-0 bottom-0 flex items-center justify-start ${dragState.active ? "" : "bg-orange-500/20"} ${element.styles?.marginRight?.toString().includes("px") ? "" : "hidden"}`}
      >
        <div
          onMouseDown={(e) => handleMouseDown(e, "margin-right")}
          className="h-3 hover:h-6 duration-200 w-2 bg-orange-500 border-white border-2 rounded-full cursor-ew-resize hover:bg-orange-600 -mr-2"
        />
      </div>

      {/* Bottom margin handle */}
      <div
        style={{ height: element.styles?.marginBottom, bottom: `-${element.styles?.marginBottom}` }}
        className={`absolute z-[1008] left-0 right-0 flex items-start justify-center ${dragState.active ? "" : "bg-orange-500/20"} ${element.styles?.marginBottom?.toString().includes("px") ? "" : "hidden"}`}
      >
        <div
          onMouseDown={(e) => handleMouseDown(e, "margin-bottom")}
          className="w-3 hover:w-6 duration-200 h-2 bg-orange-500 border-white border-2 rounded-full cursor-ns-resize hover:bg-orange-600 mt-0"
        />
      </div>

      {/* Left margin handle */}
      <div
        style={{ width: element.styles?.marginLeft, left: `-${element.styles?.marginLeft}` }}
        className={`absolute z-[1008] top-0 bottom-0 flex items-center justify-end ${dragState.active ? "" : "bg-orange-500/20"} ${element.styles?.marginLeft?.toString().includes("px") ? "" : "hidden"}`}
      >
        <div
          onMouseDown={(e) => handleMouseDown(e, "margin-left")}
          className="h-3 hover:h-6 duration-200 w-2 bg-orange-500 border-white border-2 rounded-full cursor-ew-resize hover:bg-orange-600 -ml-2"
        />
      </div>
    </div>
  );

  return (
    <div
      ref={overlayRef}
      className={cn("absolute border-2 border-main z-[1007]", "transition-all duration-100 ease-in-out ", { "pointer-events-none": !dragState.active, "pointer-events-auto": dragState.active })}
      // These event handlers are critical for preventing deselection
      onClick={handleOverlayClick}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <ResizeHandles />
      <PaddingHandles />
      <MarginHandles />

      {/* Visual indicator when resizing */}
      {dragState.active && <div className="absolute z-[1008] inset-0 border-1 border-blue-500 rounded pointer-events-none" />}

      {/* Element name badge */}
      <Badge
        className={clsx("absolute bg-main z-[1008] -top-[17px] h-4 text-xs items-center -left-[1px] rounded-none rounded-t-md", {
          hidden: state.editor.liveMode,
        })}
      >
        {element.name}
      </Badge>
    </div>
  );
};

export default SelectionOverlay;
