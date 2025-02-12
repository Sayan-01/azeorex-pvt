'use client'
import React, { useState, useRef } from "react";

const ResizableDiv = () => {
  const [dimensions, setDimensions] = useState<{ width?: number; height?: number }>({});
  const resizableDivRef = useRef<HTMLDivElement>(null);

  const handleMouseDrag = (event: MouseEvent, direction: string) => {
    if (!resizableDivRef.current) return;
    event.preventDefault();

    const parentRect = resizableDivRef.current.parentElement?.getBoundingClientRect();
    const divRect = resizableDivRef.current.getBoundingClientRect();

    let newWidth = dimensions.width || divRect.width;
    let newHeight = dimensions.height || divRect.height;

    if (direction === "right") {
      newWidth = Math.min(event.clientX - divRect.left, parentRect?.width || Infinity);
    }
    if (direction === "bottom") {
      newHeight = Math.min(event.clientY - divRect.top, parentRect?.height || Infinity);
    }
    if (direction === "left") {
      newWidth = Math.max(
        divRect.right - event.clientX,
        100 // minimum width
      );
    }
    if (direction === "top") {
      newHeight = Math.max(
        divRect.bottom - event.clientY,
        100 // minimum height
      );
    }

    setDimensions({ width: newWidth, height: newHeight });
  };

  const handleMouseDown = (direction: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    const onMouseMove = (e: MouseEvent) => handleMouseDrag(e, direction);
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      ref={resizableDivRef}
      className="relative border border-blue-500 p-4"
      style={{
        width: dimensions.width || "auto",
        height: dimensions.height || "auto",
        maxWidth: "100%",
        maxHeight: "100%",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gray-200">Resizable Div</div>
      
      <div
        onMouseDown={handleMouseDown("top")}
        className="absolute top-0 w-full h-1 cursor-ns-resize bg-gray-500"
      />
      <div
        onMouseDown={handleMouseDown("bottom")}
        className="absolute bottom-0 w-full h-1 cursor-ns-resize bg-gray-500"
      />
      <div
        onMouseDown={handleMouseDown("left")}
        className="absolute left-0 h-full w-1 cursor-ew-resize bg-gray-500"
      />
      <div
        onMouseDown={handleMouseDown("right")}
        className="absolute right-0 h-full w-1 cursor-ew-resize bg-gray-500"
      />
    </div>
  );
};

export default ResizableDiv;
