"use client";

import { EditorElement } from "../../../../../../providers/editor/editor-actions";

type ComponentItemProps = {
  icon?: React.ReactNode;
  label?: string;
  component: EditorElement;
  onDragStart: (component: EditorElement) => void;
  onDragEnd: () => void;
  className?: string;
};

export default function ComponentItem({ icon, label, component, onDragStart, onDragEnd, className }: ComponentItemProps) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.stopPropagation();
        onDragStart(component);
      }}
      onDragEnd={(e) => {
        e.stopPropagation();
        onDragEnd();
      }}
      className={`flex flex-col items-center gap-2 transition-colors ${className}`}
    >
      <div className="p-3 w-full border-2 flex justify-center items-center border-dashed border-zinc-600/80 rounded-lg bg-zinc-700/40 cursor-move">
        <div className="text-gray-400">{icon}</div>
      </div>
      <span className="text-xs text-white/60">{label}</span>
    </div>
  );
}
