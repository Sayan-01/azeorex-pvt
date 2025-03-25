"use client";
import { EditorElement, useEditor } from "../../../../../../../../providers/editor/editor-provider";
import React, { useEffect } from "react";
import RecursiveElement from "./recursive";

import { v4 } from "uuid";
import clsx from "clsx";
import { Badge } from "@/components/ui/badge";
import { EditorContentType } from "@/types/types";
import { moveObject, updateId } from "@/lib/moveElement";
import { defaultStyles, flexStyle } from "@/types/default-styles";


type Props = {
  element: EditorElement;
};

const Section = (props: Props) => {
  const { id, content, styles, type } = props.element;
  const { dispatch, state, activeContainer, setActiveContainer } = useEditor();

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
              content: { innerText: "Text Component" },
              id: v4(),
              name: "Text",
              styles: {
                color: "#ffffff",
                ...defaultStyles,
                fontWeight: "400"
              },
              type: "text",
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
              styles: { ...defaultStyles, maxWidth: "940px", opacity: 1, borderRadius: "0px", marginLeft: "auto", marginRight: "auto" },
              type: "container",
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
              styles: { ...defaultStyles, display: "flex" },
              type: "2Col",
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
        else {
          const oldData = JSON.parse(componentType) as EditorElement;
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

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.currentTarget as HTMLElement;
    target.style.outline = "1px solid #fcbd0f"; // Add outline
    // target.style.outlineOffset = "-1px"
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.currentTarget as HTMLElement;
    target.style.outline = "none"; // Remove outline
  };

  const handleDragStart = (e: React.DragEvent, type: string) => {
    if (type === "__body") return;
    e.dataTransfer.setData("componentType", type); //=> 14:18
    const target = e.target as HTMLElement;
    target.style.opacity = "0.3";
    target.style.cursor = "grbbing";

    // Check if the target has an id property
    if (target.id) {
      const targetId = target.id;
      setActiveContainer(targetId);
      console.log(targetId);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const target = e.target as HTMLElement;
    target.style.opacity = "1"; // Reset the opacity
    setActiveContainer(null);
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: props.element,
      },
    });
  };

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: {
        elementDetails: props.element,
      },
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if the currently focused element is an editable field
      const activeElement = document.activeElement as HTMLElement;
      const isEditable = activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA" || activeElement.isContentEditable;

      // Prevent deletion if an input or editable field is focused
      if (e.key === "Backspace" && !isEditable) {
        if (state.editor.selectedElement.id === id && type !== "__body") {
          e.preventDefault(); // Prevent default browser behavior
          handleDeleteElement();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleDeleteElement, id, state.editor.selectedElement.id]);

  return (
    <section
      style={{
        width: styles?.width,
        height: styles?.height,
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
        rotate: styles.rotate,
      }}
      className={clsx("relative transition-all z-[1004] group box inset-0", {
        "h-fit": type === "section",
        "h-full": type === "__body",
        "m-4": type === "container",
      })}
      id={id}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleOnDrop(e, id)}
      onDragOver={handleDragOver}
      draggable={type !== "__body"}
      onClick={handleOnClickBody}
      onDragStart={(e) => handleDragStart(e, "element")}
      onDragEnd={handleDragEnd}
    >
      <div
        id={id}
        style={{ ...props.element.styles, rotate: "0" }}
        className={clsx("px-4 !relative !top-0 !bottom-0 !left-0 !right-0 box-1 z-[1002] !h-full !w-full !m-0", {
          "!p-9 empty-outline ": Array.isArray(content) && !content.length && !state.editor.liveMode && type !== "__body",
          abc: !state.editor.liveMode && type !== "__body",
        })}
      >
        {Array.isArray(content) &&
          content.map((childElement) => (
            <RecursiveElement
              key={childElement.id}
              element={childElement}
            />
          ))}
      </div>
      <div
        className={clsx("absolute overflow-visible pointer-events-none z-[1002] inset-0", {
          hidden: state.editor.liveMode,
          "!shadow-inner-border-blue-500": state.editor.selectedElement.id === props.element.id,
        })}
      ></div>
      {state.editor.selectedElement.id === props.element.id && !state.editor.liveMode && (
        <Badge className="absolute bg-main  z-[1006] -top-[16px] h-4 text-xs items-center  left-0 rounded-none rounded-t-md">{state.editor.selectedElement.name}</Badge>
      )}
    </section>
  );
};

export default Section;
