"use client";
import React, { JSX, useEffect, useState } from "react";
import GlobalHoverOverlay from "../overlays/GlobalHoverOverlay";
import GlobalSelectedOverlay from "../overlays/GlobalSelectedOverlay";
import GlobalDropIndicator from "../overlays/GlobalDropIndicator";
import { useEditor } from "../../../../../providers/editor/editor-provider";
import { DropPosition, EditorElement } from "../../../../../providers/editor/editor-types";
import { getFunnelPageDetails } from "@/lib/queries";
import Loader2 from "@/components/global/Loader2";
import clsx from "clsx";
import { flattenOldStructure } from "@/lib/utils";

/** Map html tags---------------------- **/
const CONTAINER_TYPES = new Set(["__body", "section", "container", "column", "form"]);
const VOID_TYPES = new Set(["image", "divider", "input", "checkbox"]);

const getHTMLTag = (el: EditorElement) => {
  const map: Record<string, string> = {
    __body: "div",
    section: "section",
    container: "div",
    column: "div",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    text: "p",
    image: "img",
    link: "a",
    checkbox: "input",
    input: "input",
    button: "button",
    form: "form",
    video: "video",
    textarea: "textarea",
    select: "select",
  };

  return map[el.type] ?? "div";
};

export const WebsiteBuilder = ({ funnelPageId, liveMode }: { funnelPageId: string; liveMode?: boolean }) => {
  const { state, dispatch, updateContent, insertElement, moveElement } = useEditor();
  const [loading, setLoading] = useState(true);
  const [resizing, setResizing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getFunnelPageDetails(funnelPageId);
      if (!response) {
        setLoading(false);
        return;
      }
      setLoading(false);
      if (response.content) {
        try {
          const parsed = JSON.parse(response.content);
          console.log("PARSED", parsed);
          const elements = parsed;

          dispatch({
            type: "LOAD_DATA",
            payload: {
              elements: elements || {},
              liveMode: !!liveMode,
            },
          });
        } catch (e) {
          console.error("Error parsing content:", e);
        }
      }
    };
    fetchData();
  }, [funnelPageId, liveMode, dispatch]);

  // ── Drop handler ────────────────────────────────────────────────────────────

  const handleDrop = () => {
    const { draggedId, draggedComponent, dropTargetId, dropPosition } = state;
    if (!dropTargetId || !dropPosition) return;

    if (draggedComponent) {
      insertElement(draggedComponent,dropTargetId,dropPosition)
      dispatch({ type: "SET_DRAGGED_COMPONENT", payload: { draggedComponent: null } });
    } else if (draggedId) {
      moveElement(draggedId,dropTargetId,dropPosition)
      dispatch({ type: "SET_DRAGGED_ID", payload: { draggedId: null } });
    }

    dispatch({ type: "SET_DROP_TARGET", payload: { dropTargetId: null, dropPosition: null } });
  };

  // Render elements recursively
  // ── renderElement ───────────────────────────────────────────────────────────

  const renderElement = (el: EditorElement): React.ReactNode => {
    if (!el) return null;

    console.log(el);

    const isSelected = el.id === state.selectedId;
    const isDragging = el.id === state.draggedId;
    const tag = getHTMLTag(el);
    const Tag = tag as keyof JSX.IntrinsicElements;
    const isVoid = VOID_TYPES.has(el.type);
    const isContainer = CONTAINER_TYPES.has(el.type);
    const canDrag = !state.previewMode && el.id !== "__body" && !state.liveMode;

    // events
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (state.previewMode) return;
      dispatch({ type: "SET_SELECTED_ID", payload: { selectedId: el.id } });
    };

    const handleMouseOver = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!state.previewMode) dispatch({ type: "SET_HOVER_ID", payload: { hoverId: el.id } });
    };

    const handleMouseOut = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!state.previewMode) dispatch({ type: "SET_HOVER_ID", payload: { hoverId: null } });
    };

    const handleBlur = (e: React.FocusEvent<any>) => {
      updateContent(el.id, e.currentTarget.textContent ?? "");
    };

    const handleDragStart = (e: React.DragEvent) => {
      e.stopPropagation();
      dispatch({ type: "SET_DRAGGED_ID", payload: { draggedId: el.id } });
      e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!state.draggedId && !state.draggedComponent) return;
      if (state.draggedId === el.id) return;

      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const offsetY = e.clientY - rect.top;
      const height = rect.height;

      let position: DropPosition;
      if (el.type === "__body") {
        position = "inside";
      } else if (isContainer && offsetY > height * 0.2 && offsetY < height * 0.8) {
        position = "inside";
      } else {
        position = offsetY < height / 2 ? "before" : "after";
      }

      dispatch({ type: "SET_DROP_TARGET", payload: { dropTargetId: el.id, dropPosition: position } });
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.stopPropagation();
      const left = !(e.currentTarget as HTMLElement).contains(e.relatedTarget as HTMLElement);
      if (left && state.dropTargetId === el.id) {
        dispatch({ type: "SET_DROP_TARGET", payload: { dropTargetId: null, dropPosition: null } });
      }
    };

    const handleDragEnd = (e: React.DragEvent) => {
      e.stopPropagation();
      handleDrop();
    };
    const handleDropEvent = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      handleDrop();
    };

    // shared style
    const baseStyle: React.CSSProperties = {
      ...el.styles,
      cursor: state.previewMode ? "default" : "pointer",
      opacity: isDragging ? 0.5 : 1,
    };

    const sharedProps = {
      "data-element-id": el.id,
      style: baseStyle,
      onClick: handleClick,
      onMouseOver: handleMouseOver,
      onMouseOut: handleMouseOut,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      ...(canDrag ? { draggable: true, onDragStart: handleDragStart, onDragEnd: handleDragEnd } : {}),
    };


    // void (img, hr, input)
    if (isVoid) {
      return (
        <Tag
          key={el.id}
          {...sharedProps}
          {...el.attributes}
        />
      );
    }

    else if (el.type === "textarea") {
      return (
        <textarea
          key={el.id}
          {...sharedProps}
          defaultValue={el.content}
          disabled={!state.liveMode && !state.previewMode}
          onBlur={(e) => updateContent(el.id, e.currentTarget.value)}
          {...el.attributes}
        />
      );
    }

    else if(el.type==="text" || el.type==="h1" || el.type==="h2" || el.type==="h3" || el.type==="h4" || el.type==="h5" || el.type==="h6" || el.type==="link")
    {
      return (
        <Tag
          key={el.id}
          {...sharedProps}
          contentEditable={isSelected && !state.previewMode && !state.liveMode}
          disabled={!state.liveMode && !state.previewMode && (el.type==="link" )}
          suppressContentEditableWarning
          onBlur={handleBlur}
          {...el.attributes}
        >
          {el.content}
        </Tag>
      );
    }

    // children
    const childElements = (el.children ?? []).map((id) => state.elements[id]).filter(Boolean);

    return (
      <Tag
        key={el.id}
        {...sharedProps}
        className={clsx({
          "empty-outline": childElements.length === 0 && !state.liveMode && !state.previewMode,
          "!px-9 !py-9": childElements.length === 0 && !el.styles?.width && !el.styles?.height,
        })}
        onDrop={handleDropEvent}
        {...el.attributes}
      >
        {el.content}
        {childElements.map((child) => renderElement(child))}
      </Tag>
    );
  };

  // ── elementToHTML (iframe preview) ─────────────────────────────────────────

  const elementToHTML = (el: EditorElement): string => {
    const tag = getHTMLTag(el);
    const isVoid = VOID_TYPES.has(el.type);

    const styleStr = Object.entries(el.styles ?? {})
      .map(([k, v]) => `${k.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${v}`)
      .join("; ");

    const attrsStr = Object.entries(el.attributes ?? {})
      .map(([k, v]) => (k === "className" ? `class="${v}"` : `${k}="${v}"`))
      .join(" ");

    const allAttrs = [styleStr ? `style="${styleStr}"` : "", attrsStr].filter(Boolean).join(" ");

    if (isVoid) return `<${tag} ${allAttrs} />`;

    const childrenHTML = (el.children ?? [])
      .map((id) => state.elements[id])
      .filter(Boolean)
      .map(elementToHTML)
      .join("");

    return `<${tag} ${allAttrs}>${el.content ?? ""}${childrenHTML}</${tag}>`;
  };

  // ── root elements ───────────────────────────────────────────────────────────

  const rootElements = Object.values(state.elements).filter((el) => el.parentId === null);

  return loading ? (
    <div className="h-[calc(100vh-40.8px)] flex items-center justify-center">
      <Loader2 />
    </div>
  ) : (
    <div
      className={clsx("use-automation-zoom-in h-[calc(100%-40.8px)] overflow-y-auto mx-[240px] bg-[#191919] transition-all box !relative pt-3 px-3 pb-[61px]", {
        "!p-0 !mr-0 !mx-0 h-full": state.previewMode || liveMode,
        "!w-[850px]": state.device === "Tablet", // lowercase — DeviceType
        "!w-[420px]": state.device === "Mobile",
        "!w-full": state.device === "Desktop",
      })}
      style={{ minHeight: "100vh", transition: "width 0.3s", position: "relative" }}
    >
      {/* tablet / mobile → iframe */}
      {state.device !== "Desktop" ? (
        <iframe
          className="border transition-all bg-white w-full h-full"
          srcDoc={`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>* { margin: 0; padding: 0; box-sizing: border-box; }</style>
  </head>
  <body>${rootElements.map(elementToHTML).join("")}</body>
</html>`}
        />
      ) : (
        /* desktop → direct render */
        <div className="border relative">{rootElements.map((el) => renderElement(el))}</div>
      )}

      {/* overlays */}
      {!state.previewMode && !liveMode && !state.liveMode && (
        <>
          <GlobalHoverOverlay resizing={resizing} />
          <GlobalSelectedOverlay
            type={!!state.selectedId && state.elements[state.selectedId]?.type !== "__body"}
            resizing={resizing}
            setResizing={setResizing}
          />
          <GlobalDropIndicator />
        </>
      )}
    </div>
  );
};;
