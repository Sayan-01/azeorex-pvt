"use client";

import { EditorElement } from "../../../../../../providers/editor/editor-actions";


type ComponentItemProps = {
  icon: React.ReactNode;
  label: string;
  component: EditorElement;
  onDragStart: (component: EditorElement) => void;
  onDragEnd: () => void;
};

export default function ComponentItem({ icon, label, component, onDragStart, onDragEnd }: ComponentItemProps) {
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
      className="flex items-center gap-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-move transition-colors"
    >
      <div className="text-gray-400">{icon}</div>
      <span className="text-sm text-white">{label}</span>
    </div>
  );
}
