"use client";
import React, { useEffect, useState } from "react";
import GlobalHoverOverlay from "../overlays/GlobalHoverOverlay";
import GlobalSelectedOverlay from "../overlays/GlobalSelectedOverlay";
import GlobalDropIndicator from "../overlays/GlobalDropIndicator";
import { useEditor } from "../../../../../providers/editor/editor-provider";
import { EditorElement } from "../../../../../providers/editor/editor-actions";
import { getFunnelPageDetails } from "@/lib/queries";
import Loader2 from "@/components/global/Loader2";
import clsx from "clsx";

export const WebsiteBuilder = ({ funnelPageId, liveMode }: { funnelPageId: string; liveMode?: boolean }) => {
  const { state, dispatch, updateElementContent, handleDrop } = useEditor();
  const [loading, setLoading] = useState(true);
  const [resizing, setResizing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getFunnelPageDetails(funnelPageId);
      if (!response) return;
      setLoading(false);
      dispatch({
        type: "LOAD_DATA",
        payload: {
          elements: response.content ? JSON.parse(response?.content) : "",
          liveMode: !!liveMode,
        },
      });
    };
    fetchData();
  }, [funnelPageId, liveMode]);

  // Render elements recursively
  const renderElement = (el: EditorElement): React.ReactNode => {
    const isSelected = el.id === state.selectedId;
    const isDragging = el.id === state.draggedId;
    const Tag = el.type === "__body" ? "div" : el.type;

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (state.previewMode) return;
      dispatch({ type: "SET_SELECTED_ID", payload: { selectedId: el.id } });
      dispatch({ type: "SET_SELECTED_ELEMENT", payload: { selectedElement: el } });
    };

    const handleMouseOver = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!state.previewMode) {
        dispatch({ type: "SET_HOVER_ID", payload: { hoverId: el.id } });
      }
    };

    const handleMouseOut = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!state.previewMode) {
        dispatch({ type: "SET_HOVER_ID", payload: { hoverId: null } });
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLElement | SVGElement>) => {
      const newContent = e.currentTarget.textContent || "";
      updateElementContent(el.id, newContent);
    };

    const handleDragStart = (e: React.DragEvent) => {
      e.stopPropagation();
      dispatch({ type: "SET_DRAGGED_ID", payload: { draggedId: el.id } });
      e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if ((!state.draggedId && !state.draggedComponent) || state.draggedId === el.id) return;

      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const offsetY = e.clientY - rect.top;
      const height = rect.height;

      let position: "before" | "after" | "inside";
      if (el.id === "__body" || el.id === "__root" || el.type === "__body") {
        position = "inside";
      } else {
        if (Array.isArray(el.content) && offsetY > height * 0.2 && offsetY < height * 0.8) {
          position = "inside";
        } else if (offsetY < height / 2) {
          position = "before";
        } else {
          position = "after";
        }
      }

      dispatch({
        type: "SET_DROP_TARGET",
        payload: { dropTargetId: el.id, dropPosition: position },
      });
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.stopPropagation();
      const relatedTarget = e.relatedTarget as HTMLElement;
      if (!relatedTarget || !(e.currentTarget as HTMLElement).contains(relatedTarget)) {
        if (state.dropTargetId === el.id) {
          dispatch({ type: "SET_DROP_TARGET", payload: { dropTargetId: null, dropPosition: null } });
        }
      }
    };

    const handleDragEnd = (e: React.DragEvent) => {
      e.stopPropagation();
      handleDrop();
    };

    const handleElementDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      handleDrop();
    };

    const baseStyle: React.CSSProperties = {
      ...el.styles,
      cursor: state.previewMode ? "default" : "pointer",
      opacity: isDragging ? 0.5 : 1,
    };

    if (typeof el.content === "string" && el.type !== "img") {
      return (
        <Tag
          disabled={el.type === "a" && !state.previewMode}
          key={el.id}
          data-element-id={el.id}
          style={baseStyle}
          onClick={handleClick}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          draggable={!state.previewMode && el.id !== "__body" && !state.liveMode}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDragEnd={handleDragEnd}
          contentEditable={!state.previewMode && isSelected && !state.liveMode}
          suppressContentEditableWarning
          onBlur={handleBlur}
          {...el.attributes}
        >
          {el.content}
        </Tag>
      );
    } else if (el.type === "img") {
      return (
        <Tag
          key={el.id}
          data-element-id={el.id}
          style={baseStyle}
          onClick={handleClick}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          draggable={!state.previewMode && el.id !== "__body" && !state.liveMode}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDragEnd={handleDragEnd}
          {...el.attributes}
        ></Tag>
      );
    }

    return (
      <Tag
        key={el.id}
        data-element-id={el.id}
        style={baseStyle}
        className={clsx({ "empty-outline": el.content?.length === 0 && !state.liveMode && !state.previewMode, "!px-9 !py-9": el.content?.length === 0 && !el.styles.width && !el.styles.height })}
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        draggable={!state.previewMode && el.id !== "__body" && !state.liveMode}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragEnd={handleDragEnd}
        onDrop={handleElementDrop}
        {...el.attributes}
      >
        {Array.isArray(el.content) && el.content.map(renderElement)}
      </Tag>
    );
  };

  const elementToHTML = (el: EditorElement): string => {
    const Tag = el.type === "__body" ? "div" : el.type;

    const styleString = Object.entries(el.styles || {})
      .map(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
        return `${cssKey}: ${value}`;
      })
      .join("; ");

    let attrsString = "";
    if (el.attributes) {
      attrsString = Object.entries(el.attributes)
        .map(([key, value]) => {
          if (key === "className") {
            return `class="${value}"`;
          }
          return `${key}="${value}"`;
        })
        .join(" ");
    }

    const allAttrs = [styleString ? `style="${styleString}"` : "", attrsString].filter(Boolean).join(" ");

    if (typeof el.content === "string" && el.type !== "img") {
      return `<${Tag} ${allAttrs}>${el.content}</${Tag}>`;
    } else if (el.type === "img") {
      return `<${Tag} ${allAttrs} />`;
    }

    const childrenHTML = Array.isArray(el.content) ? el.content.map(elementToHTML).join("") : "";

    return `<${Tag} ${allAttrs}>${childrenHTML}</${Tag}>`;
  };

  return loading ? (
    <div className="h-[calc(100vh-40.8px)] flex items-center justify-center">
      <Loader2 />
    </div>
  ) : (
    <div
      className={clsx("use-automation-zoom-in h-[calc(100%-40.8px)] overflow-y-auto mx-[240px] bg-[#191919] transition-all box !relative pt-3 px-3 pb-[61px]", {
        "!p-0 !mr-0 !mx-0 h-full": state.previewMode === true || liveMode === true,
        "!w-[850px]": state.device === "Tablet",
        "!w-[420px]": state.device === "Mobile",
        "!w-full": state.device === "Desktop",
      })}
      style={{
        minHeight: "100vh",
        transition: "width 0.3s",
        position: "relative",
      }}
    >
      {state.device !== "Desktop" ? (
        <iframe
          className={clsx("border transition-all bg-white w-full h-[100%]")}
          srcDoc={`
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script src="https://cdn.tailwindcss.com"></script>
                <style>
                  * { margin: 0; padding: 0; box-sizing: border-box; }
                  body { width: 100%; height: 100%; }
                </style>
              </head>
              <body>
                ${elementToHTML(state.elements)}
              </body>
            </html>
          `}
        />
      ) : (
        <div className="border relative">{renderElement(state.elements)}</div>
      )}
      {!state.previewMode && !liveMode && !state.liveMode && (
        <>
          <GlobalHoverOverlay resizing={resizing} />
          <GlobalSelectedOverlay
            resizing={resizing}
            setResizing={setResizing}
          />
          <GlobalDropIndicator />
        </>
      )}
    </div>
  );
};
