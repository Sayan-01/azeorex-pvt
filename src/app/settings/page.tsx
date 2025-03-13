'use client'
import React, { useState, useRef, useEffect } from "react";

interface ResizableZoomableMovableProps {
  initialWidth?: number;
  initialHeight?: number;
  children?: React.ReactNode;
  className?: string;
}

const ResizableZoomableMovable: React.FC<ResizableZoomableMovableProps> = ({ initialWidth = 300, initialHeight = 200, children, className = "" }) => {
  // States for tracking position, scale, and size
  const [matrix, setMatrix] = useState<number[]>([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  const [width, setWidth] = useState<number>(initialWidth);
  const [height, setHeight] = useState<number>(initialHeight);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [startDragPos, setStartDragPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [startResizePos, setStartResizePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [startResizeSize, setStartResizeSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [scale, setScale] = useState<number>(1);

  const containerRef = useRef<HTMLDivElement>(null);

  // Get matrix string for CSS transform
  const getMatrixString = () => {
    return `matrix3d(${matrix.join(",")})`;
  };

  // Handle zoom slider change
  const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newScale = parseFloat(e.target.value);
    setScale(newScale);

    // Update matrix - only updating scale elements (0, 5, 10)
    const newMatrix = [...matrix];
    newMatrix[0] = newScale;
    newMatrix[5] = newScale;
    newMatrix[10] = newScale;
    setMatrix(newMatrix);
  };

  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return; // Only left mouse button

    setIsDragging(true);
    setStartDragPos({ x: e.clientX, y: e.clientY });
  };

  // Handle mouse down for resizing
  const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsResizing(true);
    setStartResizePos({ x: e.clientX, y: e.clientY });
    setStartResizeSize({ width, height });
  };

  // Handle mouse move for both dragging and resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        // Calculate the delta movement
        const deltaX = e.clientX - startDragPos.x;
        const deltaY = e.clientY - startDragPos.y;

        // Update matrix - translation (12, 13)
        const newMatrix = [...matrix];
        newMatrix[12] += deltaX / scale;
        newMatrix[13] += deltaY / scale;
        setMatrix(newMatrix);

        // Update start position
        setStartDragPos({ x: e.clientX, y: e.clientY });
      }

      if (isResizing) {
        // Calculate the delta for resizing (only allow bottom resize)
        const deltaY = e.clientY - startResizePos.y;

        // Update height
        const newHeight = Math.max(50, startResizeSize.height + deltaY);
        setHeight(newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, startDragPos, startResizePos, startResizeSize, matrix, scale]);

  return (
    <div className="flex flex-col">
      <div
        ref={containerRef}
        className={`relative ${className}`}
        style={{ width, height }}
      >
        <div
          className="absolute bg-white border border-gray-300 shadow-lg rounded-md overflow-hidden cursor-move transition-transform duration-75 ease-out"
          style={{
            width: "100%",
            height: "100%",
            transform: getMatrixString(),
          }}
          onMouseDown={handleMouseDown}
        >
          {children}
        </div>

        {/* Bottom resize handle */}
        <div
          className="absolute bottom-0 left-0 right-0 h-2 bg-gray-200 cursor-ns-resize hover:bg-blue-400 transition-colors"
          onMouseDown={handleResizeMouseDown}
        />
      </div>

      {/* Zoom slider control */}
      <div className="mt-4 flex items-center">
        <span className="mr-2 text-sm font-medium text-gray-600">Zoom:</span>
        <input
          type="range"
          min="0.1"
          max="3"
          step="0.1"
          value={scale}
          onChange={handleZoomChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <span className="ml-2 text-sm font-medium text-gray-600">{(scale * 100).toFixed(0)}%</span>
      </div>
    </div>
  );
};

export default ResizableZoomableMovable;

// Example usage:
const App = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-4">
        <ResizableZoomableMovable className="z-10 mb-2">
          <div className="p-4">
            <h2 className="text-lg font-bold">Movable & Resizable Div</h2>
            <p className="mt-2">
              • Click and drag to move this div around
              <br />
              • Use the slider below to zoom in/out
              <br />• Drag the bottom edge to resize
            </p>
          </div>
        </ResizableZoomableMovable>
      </div>
    </div>
  );
};
