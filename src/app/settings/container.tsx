'use client'
import React, { useRef, useState } from "react";

interface ContainerProps {
  onSelect: (rect: DOMRect) => void;
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ onSelect, children }) => {
  const [dimensions, setDimensions] = useState<{ width?: number; height?: number }>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const handleResize = (event: MouseEvent, direction: string) => {
    if (!containerRef.current) return;
    event.preventDefault();

    const parentRect = containerRef.current.parentElement?.getBoundingClientRect();
    const divRect = containerRef.current.getBoundingClientRect();

    let newWidth = dimensions.width || divRect.width;
    let newHeight = dimensions.height || divRect.height;

    if (direction === "right") {
      newWidth = Math.min(event.clientX - divRect.left, parentRect?.width || Infinity);
    }
    if (direction === "bottom") {
      newHeight = Math.min(event.clientY - divRect.top, parentRect?.height || Infinity);
    }

    setDimensions({ width: newWidth, height: newHeight });
  };

  const handleClick = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      onSelect(rect);
    }
  };

  const handleMouseDown = (direction: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    const onMouseMove = (e: MouseEvent) => handleResize(e, direction);
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-gray-200 rounded-2xl opacity-80"
      style={{
        width: dimensions.width || "auto",
        height: dimensions.height || "auto",
        maxWidth: "100%",
        maxHeight: "100%",
      }}
      onClick={handleClick}
    >
      {children}
      <div
        onMouseDown={handleMouseDown("bottom")}
        className="absolute bottom-0 w-full h-1 cursor-ns-resize bg-gray-500"
      />
      <div
        onMouseDown={handleMouseDown("right")}
        className="absolute right-0 h-full w-1 cursor-ew-resize bg-gray-500"
      />
    </div>
  );
};

export default Container;
