"use client";

import { BoxSelect, ImageIcon, Move, Contact2, Columns2, TextSelect, CreditCardIcon, TypeIcon, Link2Icon, Youtube, Heading1, Heading2, Heading3 } from "lucide-react";
import { useEditor } from "../../../../../../providers/editor/editor-provider";
import { EditorElement } from "../../../../../../providers/editor/editor-actions";
import { Accordion, AccordionTrigger } from "@/components/ui/accordion";

export default function LayersPanel() {
  const { state, dispatch, handleDrop } = useEditor();

  const getElementIcon = (type: string) => {
    switch (type) {
      case "div":
        return (
          <BoxSelect
            size={14}
            className="text-muted-foreground"
          />
        );
      case "image":
        return (
          <ImageIcon
            size={14}
            className="text-muted-foreground"
          />
        );
      case "__body":
        return (
          <BoxSelect
            size={14}
            className="text-muted-foreground"
          />
        );
      case "contactForm":
        return (
          <Contact2
            size={14}
            className="text-muted-foreground"
          />
        );
      case "section":
        return (
          <TextSelect
            size={14}
            className="text-muted-foreground"
          />
        );
      case "p":
        return (
          <TypeIcon
            size={12}
            className="text-muted-foreground w-3.5"
          />
        );
      case "link":
        return (
          <Link2Icon
            size={14}
            className="text-muted-foreground"
          />
        );
      case "video":
        return (
          <Youtube
            size={14}
            className="text-muted-foreground"
          />
        );
      case "button":
        return (
          <Move
            size={14}
            className="text-muted-foreground"
          />
        );
      case "h1":
        return (
          <Heading1
            size={14}
            className="text-muted-foreground"
          />
        );
      case "h2":
        return (
          <Heading2
            size={14}
            className="text-muted-foreground"
          />
        );
      case "h3":
        return (
          <Heading3
            size={14}
            className="text-muted-foreground"
          />
        );
      default:
        return (
          <BoxSelect
            size={14}
            className="text-muted-foreground"
          />
        );
    }
  };

  const renderLayerTree = (el: EditorElement, depth = 0): React.ReactNode => {
    const isSelected = el.id === state.selectedId;
    const isDragging = el.id === state.draggedId;
    const hasChildren = Array.isArray(el.content) && el.content.length > 0;

    return (
      <div key={el.id}>
        <div
          onClick={() => dispatch({ type: "SET_SELECTED_ID", payload: { selectedId: el.id } })}
          draggable={el.id !== "__body"}
          onDragStart={(e) => {
            e.stopPropagation();
            dispatch({ type: "SET_DRAGGED_ID", payload: { draggedId: el.id } });
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (state.draggedId !== el.id) {
              dispatch({
                type: "SET_DROP_TARGET",
                payload: { dropTargetId: el.id, dropPosition: "inside" },
              });
            }
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDrop();
          }}
          className={`px-2 py-2 cursor-pointer hover:bg-gray-700 flex items-center gap-2 border-b rounded ${isSelected ? "bg-blue-600" : ""} ${isDragging ? "opacity-50" : ""}`}
          style={{ marginLeft: `${depth * 16 + 8}px` }}
        >
          {el.id !== "__body" && getElementIcon(el.type)}
          <span className="text-xs font-mono text-white">{el.type === "__body" ? "🌐 Body" : `${el.id}`}</span>
        </div>
        {hasChildren && <div>{(el.content as EditorElement[]).map((child) => renderLayerTree(child, depth + 1))}</div>}
      </div>
    );
  };

  return (
    <div className="p-2">
      <div className="text-xs text-yellow-400 mb-2 px-4 py-2 bg-yellow-900/20 rounded">💡 Drag elements to reorder</div>
      {renderLayerTree(state.elements)}
    </div>
  );
}
