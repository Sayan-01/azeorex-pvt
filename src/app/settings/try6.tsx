"use client";
import React, { useRef, useEffect, useState } from "react";

const ResizeDragComponent = () => {
  const resizableRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 128, height: 64 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDownDrag = (e) => {
    setIsDragging(true);
    resizableRef.current.dataset.startX = e.clientX - position.x;
    resizableRef.current.dataset.startY = e.clientY - position.y;
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - parseFloat(resizableRef.current.dataset.startX);
      const newY = e.clientY - parseFloat(resizableRef.current.dataset.startY);
      setPosition({ x: newX, y: newY });
    } else if (isResizing) {
      const newWidth = e.clientX - resizableRef.current.getBoundingClientRect().left;
      const newHeight = e.clientY - resizableRef.current.getBoundingClientRect().top;
      setSize({ width: Math.max(newWidth, 100), height: Math.max(newHeight, 50) });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleMouseDownResize = (e) => {
    e.stopPropagation();
    setIsResizing(true);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing]);

  return (
    <div className="w-full h-screen  p-5">
      <div
        ref={resizableRef}
        className="relative bg-blue-500 text-white text-center font-bold flex items-center justify-center cursor-move"
        style={{
          width: `${size.width}px`,
          height: `${size.height}px`,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        onMouseDown={handleMouseDownDrag}
      >
        <div
          className="absolute bottom-0 right-0 w-4 h-4 bg-white cursor-se-resize"
          onMouseDown={handleMouseDownResize}
        ></div>
      </div>
      <div
        ref={resizableRef}
        className="relative bg-blue-500 text-white text-center font-bold flex items-center justify-center cursor-move"
        style={{
          width: `${size.width}px`,
          height: `${size.height}px`,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        onMouseDown={handleMouseDownDrag}
      >
        <div
          className="absolute bottom-0 right-0 w-4 h-4 bg-white cursor-se-resize"
          onMouseDown={handleMouseDownResize}
        ></div>
      </div>
    </div>
  );
};

export default ResizeDragComponent;
