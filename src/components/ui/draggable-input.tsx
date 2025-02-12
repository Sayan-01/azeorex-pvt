"use client";

import React, { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}


export const Input = ({id,value, children, className, initialValue = 0, min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY, step = 1, onChange ,...props}:any, ref:any) => {
  const [valuee, setValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastX = useRef<number | null>(null);

  const handleChange = useCallback(
    (newValue: number) => {
      const clampedValue = Math.min(Math.max(newValue, min), max);
      setValue(clampedValue);
      onChange?.(clampedValue);
    },
    [min, max, onChange]
  );

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    lastX.current = e.clientX;
    e.preventDefault(); // Prevent text selection
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging && lastX.current !== null) {
        const delta = e.clientX - lastX.current;
        const change = Math.round(delta / 5) * step; // Adjust sensitivity here
        handleChange(valuee + change);
        lastX.current = e.clientX;
      }
    },
    [isDragging, valuee, step, handleChange]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    lastX.current = null;
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <label className={cn("mt- w-full h-[30px] flex rounded-md border-2 shadow-sm hover:border-[#6A6A6A] transition-colors overflow-hidden", "focus-within:!border-[#726FFF]")}>
      {children && (
        <div
          onMouseDown={handleMouseDown}
          className="h-full w-12 flex items-center justify-center text-xs text-muted-foreground bg-[#272727] cursor-ew-resize"
        >
          {children}
        </div>
      )}

      <input
      id={id}
        ref={inputRef}
        value={valuee}
        onChange={(e) => handleChange(Number(e.target.value)) }
        className={cn(
          "flex h-full w-full bg-[#272727] pr-2 py-1 text-xs outline-none border-none disabled:cursor-not-allowed disabled:opacity-50 file:bg-transparent  file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground caret-[#a1a1aa]/80 caret",
          className,
          {
            "pl-2": !children,
          }
        )}
        min={min}
        max={max}
        step={step}
        {...props}
      />
      {/* <div
        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-ew-resize"
        onMouseDown={handleMouseDown}
        aria-hidden="true"
      >
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
          />
        </svg>
      </div> */}
    </label>
  );
}
