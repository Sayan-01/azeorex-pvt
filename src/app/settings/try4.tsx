"use client";
import React, { useState, useRef, useEffect } from "react";

const ResizableMovableDiv = () => {
  const [dimensions, setDimensions] = useState({ width: 200, height: 200 });
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [currentHandle, setCurrentHandle] = useState("");

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        setPosition((prev) => ({
          x: prev.x + event.movementX,
          y: prev.y + event.movementY,
        }));
      } else if (isResizing && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const { width, height, left, top } = containerRect;

        let newWidth = width;
        let newHeight = height;
        let dx = event.movementX;
        let dy = event.movementY;

        switch (currentHandle) {
          case "top":
            newHeight = Math.max(50, height - dy);
            setPosition((prev) => ({ ...prev, y: prev.y + dy }));
            break;
          case "right":
            newWidth = Math.max(50, width + dx);
            break;
          case "bottom":
            newHeight = Math.max(50, height + dy);
            break;
          case "left":
            newWidth = Math.max(50, width - dx);
            setPosition((prev) => ({ ...prev, x: prev.x + dx }));
            break;
          case "top-left":
            newWidth = Math.max(50, width - dx);
            newHeight = Math.max(50, height - dy);
            setPosition((prev) => ({
              x: prev.x + dx,
              y: prev.y + dy,
            }));
            break;
          case "top-right":
            newWidth = Math.max(50, width + dx);
            newHeight = Math.max(50, height - dy);
            setPosition((prev) => ({ ...prev, y: prev.y + dy }));
            break;
          case "bottom-left":
            newWidth = Math.max(50, width - dx);
            newHeight = Math.max(50, height + dy);
            setPosition((prev) => ({ ...prev, x: prev.x + dx }));
            break;
          case "bottom-right":
            newWidth = Math.max(50, width + dx);
            newHeight = Math.max(50, height + dy);
            break;
        }

        setDimensions({ width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setCurrentHandle("");
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, currentHandle]);

  return (
    
    <div
      ref={containerRef}
      className="absolute border-2 border-blue-400 bg-blue-100"
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={(e) => {
        if (e.target === containerRef.current) {
          setIsDragging(true);
        }
      }}
    >
      
      {/* Resize Handlers */}
      {["top", "right", "bottom", "left", "top-left", "top-right", "bottom-left", "bottom-right"].map((handle) => (
        <div
          key={handle}
          className={`absolute bg-blue-600 w-2 h-2 z-10 cursor-pointer`}
          style={{
            top: handle.includes("top") ? 0 : handle.includes("bottom") ? "100%" : "50%",
            left: handle.includes("left") ? 0 : handle.includes("right") ? "100%" : "50%",
            transform: `translate(${handle.includes("left") ? "-50%" : handle.includes("right") ? "50%" : "0"}, ${handle.includes("top") ? "-50%" : handle.includes("bottom") ? "50%" : "0"})`,
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            setIsResizing(true);
            setCurrentHandle(handle);
          }}
        />
      ))}
    </div>
  );
};

export default ResizableMovableDiv;
