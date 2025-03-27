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
  type: "right" | "left" | "top" | "bottom" | "corner" | "padding-top" | "padding-right" | "padding-bottom" | "padding-left" | "margin-top" | "margin-right" | "margin-bottom" | "margin-left" | null;
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
  startPaddingTop: number;
  startPaddingRight: number;
  startPaddingBottom: number;
  startPaddingLeft: number;
  startMarginTop: number;
  startMarginRight: number;
  startMarginBottom: number;
  startMarginLeft: number;
}

type Props = { element: EditorElement };

const Container = ({ element }: Props) => {
  const { id, content, styles, type } = element;
  const { dispatch, state, activeContainer, setActiveContainer } = useEditor();

  const initialWidth = "100%";
  const initialHeight = "80px";
  const minWidth = 50;
  const minHeight = 50;
  const minPadding = 0;

  const selectedElement = state.editor.selectedElement;

  // Get current dimensions from state or use defaults
  const currentWidth = (element?.styles?.width as string) || initialWidth;
  const currentHeight = (element?.styles?.height as string) || initialHeight;
  const currentPaddingTop = parseInt((element?.styles?.paddingTop as string)?.replace("px", "") || "0", 10);
  const currentPaddingRight = parseInt((element?.styles?.paddingRight as string)?.replace("px", "") || "0", 10);
  const currentPaddingBottom = parseInt((element?.styles?.paddingBottom as string)?.replace("px", "") || "0", 10);
  const currentPaddingLeft = parseInt((element?.styles?.paddingLeft as string)?.replace("px", "") || "0", 10);
  const currentMarginTop = parseInt((element?.styles?.marginTop as string)?.replace("px", "") || "0", 10);
  const currentMarginRight = parseInt((element?.styles?.marginRight as string)?.replace("px", "") || "0", 10);
  const currentMarginBottom = parseInt((element?.styles?.marginBottom as string)?.replace("px", "") || "0", 10);
  const currentMarginLeft = parseInt((element?.styles?.marginLeft as string)?.replace("px", "") || "0", 10);

  // Create refs for the div and tracking drag state
  const divRef = useRef<HTMLDivElement>(null);
  const [dragState, setDragState] = useState<DragState>({
    active: false,
    type: null,
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
    startPaddingTop: 0,
    startPaddingRight: 0,
    startPaddingBottom: 0,
    startPaddingLeft: 0,
    startMarginTop: currentMarginTop,
    startMarginRight: currentMarginRight,
    startMarginBottom: currentMarginBottom,
    startMarginLeft: currentMarginLeft,
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
                width: "100%",
                height: "80px",
                maxWidth: "100%",
                borderRadius: "0px",
                display: "flex",
                justifyContent: "center",
                alignItems: "start",
                paddingLeft: "16px",
                paddingRight: "16px",
                marginTop: "0px",
                marginBottom: "0px",
                marginLeft: "0px",
                marginRight: "0px",
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
  const handleMouseDown = (
    e: React.MouseEvent,
    type: "right" | "left" | "top" | "bottom" | "corner" | "padding-top" | "padding-right" | "padding-bottom" | "padding-left" | "margin-top" | "margin-right" | "margin-bottom" | "margin-left" | null
  ) => {
    if (element.type === "__body") return;

    e.preventDefault();
    e.stopPropagation();

    if (!divRef.current) return;

    const isValueInPx = currentMarginLeft.toString().includes("px") || currentMarginRight.toString().includes("px") || currentMarginTop.toString().includes("px") || currentMarginBottom.toString().includes("px");

    
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
      startPaddingTop: currentPaddingTop,
      startPaddingRight: currentPaddingRight,
      startPaddingBottom: currentPaddingBottom,
      startPaddingLeft: currentPaddingLeft,
      startMarginTop: currentMarginTop,
      startMarginRight: currentMarginRight,
      startMarginBottom: currentMarginBottom,
      startMarginLeft: currentMarginLeft,
    });
  };

  // Set up global mouse move and mouse up handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragState.active || !divRef.current) return;

      let newStyles = { ...element.styles };

      if (dragState.type === "right" || dragState.type === "corner") {
        newStyles.width = `${Math.max(minWidth, dragState.startWidth + (e.clientX - dragState.startX))}px`;
      }

      if (dragState.type === "bottom" || dragState.type === "corner") {
        newStyles.height = `${Math.max(minHeight, dragState.startHeight + (e.clientY - dragState.startY))}px`;
      }

      if (dragState.type === "padding-top") {
        const newPadding = Math.max(minPadding, dragState.startPaddingTop + (e.clientY - dragState.startY));
        newStyles.paddingTop = `${newPadding}px`;
      }

      if (dragState.type === "padding-right") {
        const newPadding = Math.max(minPadding, dragState.startPaddingRight - (e.clientX - dragState.startX));
        newStyles.paddingRight = `${newPadding}px`;
      }

      if (dragState.type === "padding-bottom") {
        const newPadding = Math.max(minPadding, dragState.startPaddingBottom - (e.clientY - dragState.startY));
        newStyles.paddingBottom = `${newPadding}px`;
      }

      if (dragState.type === "padding-left") {
        const newPadding = Math.max(minPadding, dragState.startPaddingLeft + (e.clientX - dragState.startX));
        newStyles.paddingLeft = `${newPadding}px`;
      }

      // In handleMouseMove:
      if (dragState.type === "margin-top") {
        const newMargin = Math.max(minPadding, dragState.startMarginTop + (e.clientY - dragState.startY));
        newStyles.marginTop = `${newMargin}px`;
      }

      if (dragState.type === "margin-right") {
        const newMargin = Math.max(minPadding, dragState.startMarginRight - (e.clientX - dragState.startX));
        newStyles.marginRight = `${newMargin}px`;
      }

      if (dragState.type === "margin-bottom") {
        const newMargin = Math.max(minPadding, dragState.startMarginBottom - (e.clientY - dragState.startY));
        newStyles.marginBottom = `${newMargin}px`;
      }

      if (dragState.type === "margin-left") {
        const newMargin = Math.max(minPadding, dragState.startMarginLeft + (e.clientX - dragState.startX));
        newStyles.marginLeft = `${newMargin}px`;
      }

      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          elementDetails: {
            ...element,
            styles: newStyles,
          },
        },
      });
    };

    const handleMouseUp = () => {
      setDragState((prev) => ({ ...prev, active: false }));
    };

    if (dragState.active) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragState, dispatch, element]);

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
        marginTop: styles?.marginTop || "0px",
        marginBottom: styles?.marginBottom || "0px",
        marginLeft: styles?.marginLeft || "0px",
        marginRight: styles?.marginRight || "0px",
        maxWidth: styles?.maxWidth,
        maxHeight: styles?.maxHeight,
        rotate: styles.rotate,
      }}
      className={clsx(" relative z-[1004] box !inset-0", {
        "h-fit ": type === "container" || type === "2Col",
        "!relative !w-full !min-h-screen": type === "__body",
        "mt-[14px]": type === "__body" && !state.editor.liveMode,
        "flex flex-col md:!flex-row": type === "2Col",
        "shadow-inner-border-blue-500": state.editor.selectedElement.id === id && !state.editor.liveMode && state.editor.selectedElement.type === "__body",
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
          width: styles?.width || currentWidth,
          height: styles?.height || currentHeight,
          rotate: "0",
          backgroundColor: styles.backgroundColor || (type === "__body" ? "#f8f8f8" : ""),
        }}
        className={clsx("!relative !top-0 !bottom-0 !left-0 !right-0 !rotate-[0px] box-1 z-[1002] !h-full !w-full !m-0 group ", {
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
      {state.editor.selectedElement.id === element.id && element.type !== "__body" && (
        <>
          {/* Existing dimension handles */}
          <div
            className={`absolute z-[1006] right-0 top-0 bottom-0 w-2 cursor-ew-resize bg-transparent hover:bg-blue-500/20 ${element.styles.width?.toString().includes("px") ? "" : "hidden"}`}
            onMouseDown={(e) => handleMouseDown(e, "right")}
          />
          <div
            className={`absolute z-[1006] bottom-0 left-0 right-0 h-2 cursor-ns-resize bg-transparent hover:bg-blue-500/20 ${element.styles.height?.toString().includes("px") ? "" : "hidden"}`}
            onMouseDown={(e) => handleMouseDown(e, "bottom")}
          />
          <div
            className={`absolute z-[1006] bottom-0 right-0 w-4 h-4 cursor-nwse-resize bg-transparent hover:bg-blue-500/20`}
            onMouseDown={(e) => handleMouseDown(e, "corner")}
          />

          {/* Padding handles */}
          <div
            style={{ height: element.styles.paddingTop }}
            className={`absolute z-[1006] top-0 left-0 right-0 flex items-end justify-center bg-green-500/20`}
          >
            <div
              onMouseDown={(e) => handleMouseDown(e, "padding-top")}
              className="w-6 hover:w-10 duration-200 h-2 bg-green-500 border-white border-2 rounded-full cursor-ns-resize hover:bg-purple-600 -mb-[9px]"
            />
          </div>
          <div
            style={{ width: element.styles.paddingRight }}
            className={`absolute z-[1006] top-0 right-0 bottom-0 flex items-center justify-start bg-green-500/20`}
          >
            <div
              onMouseDown={(e) => handleMouseDown(e, "padding-right")}
              className="h-6 w-2 hover:h-10 duration-200 bg-green-500 border-white border-2 rounded-full cursor-ew-resize hover:bg-purple-600 -ml-[9px]"
            />
          </div>
          <div
            style={{ height: element.styles.paddingBottom }}
            className={`absolute z-[1006] bottom-0 left-0 right-0 flex items-start  justify-center bg-green-500/20`}
          >
            <div
              onMouseDown={(e) => handleMouseDown(e, "padding-bottom")}
              className="w-6 hover:w-10 duration-200 h-2 bg-green-500 border-white border-2 rounded-full cursor-ns-resize hover:bg-purple-600 -mt-[9px]"
            />
          </div>
          <div
            style={{ width: element.styles.paddingLeft }}
            className={`absolute z-[1006] top-0 left-0 bottom-0 flex items-center justify-end bg-green-500/20`}
          >
            <div
              onMouseDown={(e) => handleMouseDown(e, "padding-left")}
              className="h-6 w-2 hover:h-10 duration-200 bg-green-500 border-white border-2 rounded-full cursor-ew-resize hover:bg-purple-600 -mr-[9px]"
            />
          </div>

          {/* Margin handles */}
          <div
            style={{ height: element.styles.marginTop, top: `-${element.styles.marginTop}` }}
            className={`absolute z-[1006]  left-0 right-0 flex items-end justify-center bg-orange-500/20 ${element.styles.marginTop?.toString().includes("px") ? "" : "hidden"}`}
          >
            <div
              onMouseDown={(e) => handleMouseDown(e, "margin-top")}
              className="w-6 hover:w-10 duration-200 h-2 bg-orange-500 border-white border-2 rounded-full cursor-ns-resize hover:bg-orange-600 mb-0"
            />
          </div>
          <div
            style={{ width: element.styles.marginRight, right: `-${element.styles.marginRight}` }}
            className={`absolute z-[1006] top-0 bottom-0 flex items-center justify-start bg-orange-500/20 ${element.styles.marginRight?.toString().includes("px") ? "" : "hidden"}`}
          >
            <div
              onMouseDown={(e) => handleMouseDown(e, "margin-right")}
              className="h-6 hover:h-10 duration-200 w-2 bg-orange-500 border-white border-2 rounded-full cursor-ew-resize hover:bg-orange-600 -mr-2"
            />
          </div>
          <div
            style={{ height: element.styles.marginBottom, bottom: `-${element.styles.marginBottom}` }}
            className={`absolute z-[1006]  left-0 right-0 flex items-start justify-center bg-orange-500/20 ${element.styles.marginBottom?.toString().includes("px") ? "" : "hidden"}`}
          >
            <div
              onMouseDown={(e) => handleMouseDown(e, "margin-bottom")}
              className="w-6 hover:w-10 duration-200 h-2 bg-orange-500 border-white border-2 rounded-full cursor-ns-resize hover:bg-orange-600 mt-0"
            />
          </div>
          <div
            style={{ width: element.styles.marginLeft, left: `-${element.styles.marginLeft}` }}
            className={`absolute z-[1006] top-0  bottom-0 flex items-center justify-end bg-orange-500/20 ${element.styles.marginLeft?.toString().includes("px") ? "" : "hidden"}`}
          >
            <div
              onMouseDown={(e) => handleMouseDown(e, "margin-left")}
              className="h-6 hover:h-10 duration-200 w-2 bg-orange-500 border-white border-2 rounded-full cursor-ew-resize hover:bg-orange-600 -ml-2"
            />
          </div>

          {/* Visual indicator when resizing */}
          {dragState.active && <div className="absolute z-[1006] inset-0 border-1 border-blue-500 rounded pointer-events-none" />}
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
