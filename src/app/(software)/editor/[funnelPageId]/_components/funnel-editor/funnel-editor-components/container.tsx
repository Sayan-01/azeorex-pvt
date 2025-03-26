"use client";
import { Badge } from "@/components/ui/badge";
import { EditorElement, useEditor } from "../../../../../../../../providers/editor/editor-provider";
import clsx from "clsx";
import React, { ReactEventHandler, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import Recursive from "./recursive";
import { moveObject, updateId } from "@/lib/moveElement";
import { defaultStyles, headingStyle } from "@/types/default-styles";
import { EditorContentType } from "@/types/types";

// Define the types for dragging state
interface DragState {
  active: boolean;
  type: "right" | "left" | "top" | "bottom" | "corner" | null;
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
}

type Props = { element: EditorElement };

const Container = ({ element }: Props) => {
  const { id, content, styles, type } = element;
  const { dispatch, state, activeContainer, setActiveContainer } = useEditor();

  const initialWidth = "1000px";
  const initialHeight = "80px";
  const minWidth = 50;
  const minHeight = 50;

  const selectedElement = state.editor.selectedElement;

  // Get current dimensions from state or use defaults
  const currentWidth = (element?.styles?.width as string) || initialWidth;
  const currentHeight = (element?.styles?.height as string) || initialHeight;

  // Create refs for the div and tracking drag state
  const divRef = useRef<HTMLDivElement>(null);
  const [dragState, setDragState] = useState<DragState>({
    active: false,
    type: null,
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
  });

  const handleDragStart = (e: React.DragEvent, type: string) => {
    if (type === "__body") return;
    e.dataTransfer.setData("componentType", type);
    const target = e.target as HTMLElement;
    target.style.opacity = "1";
    target.style.cursor = "grabbing";

    if (target.id) {
      const targetId = target.id;
      setActiveContainer(targetId);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.currentTarget as HTMLElement;
    target.style.outline = "1px solid #fcbd0f"; // Add outline
  };

  const handleOnDrop = (e: React.DragEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();

    const componentType = e.dataTransfer.getData("componentType") as EditorContentType;
    switch (componentType) {
      case "text":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: { innerText: "Element" },
              id: v4(),
              name: "Text",
              styles: {
                color: "#cfcfcf",
                ...defaultStyles,
                fontWeight: "400",
              },
              type: "text",
            },
          },
        });
        break;
      case "heading":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: { innerText: "Element" },
              id: v4(),
              name: "Heading",
              styles: {
                color: "#cfcfcf",
                ...headingStyle,
              },
              type: "heading",
            },
          },
        });
        break;
      case "link":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: {
                innerText: "Link Element",
                href: "#",
              },
              id: v4(),
              name: "Link",
              styles: {
                color: "#ffffff",
                ...defaultStyles,
              },
              type: "link",
            },
          },
        });
        break;
      case "video":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: {
                src: "https://www.youtube.com/embed/A3l6YYkXzzg?si=zbcCeWcpq7Cwf8W1",
              },
              id: v4(),
              name: "Video",
              styles: {},
              type: "video",
            },
          },
        });
        break;
      case "image":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: {
                src: "/image-placeholder.png",
              },
              id: v4(),
              name: "Image",
              styles: { width: "100%" },
              type: "image",
            },
          },
        });
        break;
      case "container":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: [],
              id: v4(),
              name: "Container",
              styles: {
                ...defaultStyles,
                width: "1000px",
                height: "80px",
                maxWidth: "100%",
                borderRadius: "0px",
                display: "flex",
                justifyContent: "center",
                alignItems: "start",
                paddingLeft: "16px",
                paddingRight: "16px",
              },
              type: "container",
            },
          },
        });
        break;
      case "section":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: [],
              id: v4(),
              name: "Section",
              styles: {
                ...defaultStyles,
                maxWidth: "100%",
                borderRadius: "0px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                paddingLeft: "16px",
                paddingRight: "16px",
              },
              type: "section",
            },
          },
        });
        break;
      case "contactForm":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: [],
              id: v4(),
              name: "Contact Form",
              styles: {},
              type: "contactForm",
            },
          },
        });
        break;
      case "paymentForm":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: [],
              id: v4(),
              name: "Payment Form",
              styles: {},
              type: "paymentForm",
            },
          },
        });
        break;
      case "2Col":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: [
                {
                  content: [],
                  id: v4(),
                  name: "Container",
                  styles: { ...defaultStyles, width: "100%" },
                  type: "container",
                },
                {
                  content: [],
                  id: v4(),
                  name: "Container",
                  styles: { ...defaultStyles, width: "100%" },
                  type: "container",
                },
              ],
              id: v4(),
              name: "Two Columns",
              styles: { ...defaultStyles, display: "flex", justifyContent: "center", paddingLeft: "16px", paddingRight: "16px" },
              type: "2Col",
            },
          },
        });
      case "element":
        if (activeContainer) {
          if (id !== activeContainer) {
            moveObject(state.editor.elements, activeContainer, id, state);
            setActiveContainer(null);
          }
        }
        break;
      default:
        if (componentType === null) return;
        // else setComponent(state.editor.elements, JSON.parse(componentType));
        else {
          //asa json string k object a rupantor kora holo parse er maddhome
          const oldData = JSON.parse(componentType) as EditorElement;
          console.log(oldData);
          const newData = updateId(oldData);

          dispatch({
            type: "ADD_ELEMENT",
            payload: {
              containerId: id,
              elementDetails: {
                id: newData.id,
                name: newData.name,
                styles: newData.styles,
                type: newData.type,
                content: newData.content,
              },
            },
          });
        }
    }
    const target = e.currentTarget as HTMLElement;
    target.style.outline = "none"; // Remove outline
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Allow drop
    e.stopPropagation();
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const target = e.target as HTMLElement;
    target.style.opacity = "1"; // Reset the opacity
    e.stopPropagation();
    setActiveContainer(null);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.currentTarget as HTMLElement;
    target.style.outline = "none"; // Remove outline
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  const handleDeleteElement = useCallback(() => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  }, [dispatch, element]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement as HTMLElement;
      const isEditable = activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA" || activeElement.isContentEditable;

      if (e.key === "Backspace" && !isEditable) {
        if (state.editor.selectedElement.id === id && type !== "__body") {
          e.preventDefault();
          handleDeleteElement();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleDeleteElement, id, state.editor.selectedElement.id, type]);

  // Handle mouse down on resize handles
  const handleMouseDown = (e: React.MouseEvent, type: "right" |"left" | "top" | "bottom" | "corner" ) => {
    if (element.type === "__body") return;

    e.preventDefault();
    e.stopPropagation();

    if (!divRef.current) return;

    // Get current dimensions without 'px' for calculations
    const currentWidthValue = parseInt(currentWidth.replace("px", ""), 10);
    const currentHeightValue = parseInt(currentHeight.replace("px", ""), 10);

    setDragState({
      active: true,
      type,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: currentWidthValue,
      startHeight: currentHeightValue,
    });
  };

  // Set up global mouse move and mouse up handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragState.active || !divRef.current) return;

      let newWidth = dragState.startWidth;
      let newHeight = dragState.startHeight;

      // Calculate new dimensions based on mouse movement
      if (dragState.type === "right" || dragState.type === "corner") {
        newWidth = Math.max(minWidth, dragState.startWidth + (e.clientX - dragState.startX));
      }

      if (dragState.type === "bottom" || dragState.type === "corner") {
        newHeight = Math.max(minHeight, dragState.startHeight + (e.clientY - dragState.startY));
      }

      // Dispatch the updated values
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          elementDetails: {
            ...element,
            styles: {
              ...element.styles,
              width: `${newWidth}px`,
              height: `${newHeight}px`,
            },
          },
        },
      });
    };

    const handleMouseUp = () => {
      setDragState((prev) => ({ ...prev, active: false }));
    };

    // Add event listeners if dragging is active
    if (dragState.active) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    // Clean up event listeners
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragState, dispatch, minHeight, minWidth, selectedElement]);

  return (
    <div
      id={id}
      ref={divRef}
      style={{
        width: styles?.width || currentWidth,
        height: styles?.height || currentHeight,
        position: styles?.position || "relative",
        top: styles?.top || 0,
        bottom: styles?.bottom || 0,
        left: styles?.left || 0,
        right: styles?.right || 0,
        zIndex: styles?.zIndex || 0,
        marginTop: styles?.marginTop,
        marginBottom: styles?.marginBottom,
        marginLeft: styles?.marginLeft,
        marginRight: styles?.marginRight,
        maxWidth: styles?.maxWidth,
        maxHeight: styles?.maxHeight,
        rotate: styles.rotate,
      }}
      className={clsx("relative z-[1004] box !inset-0", {
        "h-fit ": type === "container" || type === "2Col",
        "!relative !w-full !min-h-screen": type === "__body",
        "mt-[14px]": type === "__body" && !state.editor.liveMode,
        "flex flex-col md:!flex-row": type === "2Col",
        "shadow-inner-border-blue-500 ": state.editor.selectedElement.id === id && !state.editor.liveMode && state.editor.selectedElement.type === "__body",
        "cursor-grab": state.editor.selectedElement.id === id && !state.editor.liveMode,
        // "hover:outline hover:outline-[1px] hover:outline-offset-[-1px] hover:outline-blue-400": !state.editor.liveMode && type !== "__body",
      })}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={(e) => handleOnDrop(e, id)}
      draggable={type !== "__body" && !state.editor.liveMode}
      onClick={handleOnClickBody}
      onDragStart={(e) => handleDragStart(e, "element")}
      onDragEnd={handleDragEnd}
    >
      <div
        style={{
          ...styles,
          rotate: "0",
          backgroundColor: styles.backgroundColor || (type === "__body" ? "#f8f8f8" : ""),
        }}
        className={clsx("!relative !top-0 !bottom-0 !left-0 !right-0 !rotate-[0px] box-1 z-[1002] !h-full !w-full !m-0 group", {
          // "px-4": type !== "__body",
          "pt-4 !min-h-screen ": type === "__body",
          "rounded-2xl pt-4": type === "__body" && !state.editor.liveMode,
          "empty-outline ": Array.isArray(element.content) && !element.content.length && !state.editor.liveMode && type !== "__body",
          "!px-9": Array.isArray(element.content) && !element.content.length && !element.styles.width,
          "!py-9": Array.isArray(element.content) && !element.content.length && !element.styles.height,
          abc: !state.editor.liveMode,
        })}
      >
        {Array.isArray(content) &&
          content.map((childElement) => (
            <Recursive
              key={childElement.id}
              element={childElement}
            />
          ))}
      </div>
      <div
        className={clsx("absolute overflow-visible pointer-events-none z-[1002] inset-0 opacity-100 filter-none", {
          hidden: state.editor.liveMode,
          "!shadow-inner-border-blue-500": state.editor.selectedElement.id === element.id,
        })}
      ></div>
      {/* Resize Handles */}
      {state.editor.selectedElement.id === element.id && (
        <>
          <div
            className="absolute z-[1006] right-0 top-0 bottom-0 w-2 cursor-ew-resize bg-transparent hover:bg-blue-500/20"
            onMouseDown={(e) => handleMouseDown(e, "right")}
          />
          <div
            className="absolute z-[1006] bottom-0 left-0 right-0 h-2 cursor-ns-resize bg-transparent hover:bg-blue-500/20"
            onMouseDown={(e) => handleMouseDown(e, "bottom")}
          />
          <div
            className="absolute z-[1006] bottom-0 top-0 left-0 w-2 cursor-ew-resize bg-transparent hover:bg-blue-500/20"
            onMouseDown={(e) => handleMouseDown(e, "left")}
          />
          <div
            className="absolute z-[1006] right-0 top-0 left-0 h-2 cursor-ns-resize bg-transparent hover:bg-blue-500/20"
            onMouseDown={(e) => handleMouseDown(e, "top")}
          />
          <div
            className="absolute z-[1006] bottom-0 right-0 w-4 h-4 cursor-nwse-resize bg-transparent hover:bg-blue-500/20"
            onMouseDown={(e) => handleMouseDown(e, "corner")}
          />

          {/* Visual indicator when resizing */}
          {dragState.active && <div className="absolute z-[1006] inset-0 border-2 border-blue-500 rounded pointer-events-none" />}
        </>
      )}

      <Badge
        className={clsx("absolute bg-main z-[1006] -top-[16px] h-4 text-xs items-center  left-0 rounded-none rounded-t-md hidden", {
          flex: state.editor.selectedElement.id === element.id && !state.editor.liveMode,
          "top-0 rounded-br-md rounded-t-none": type === "__body",
        })}
      >
        {element.name}
      </Badge>
    </div>
  );
};

export default Container;
