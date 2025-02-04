"use client";
import { Badge } from "@/components/ui/badge";
import { EditorElement, useEditor } from "../../../../../../../../../../../../providers/editor/editor-provider";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import Recursive from "./recursive";
import { moveObject, updateId } from "@/lib/moveElement";
import { defaultStyles, EditorBtns } from "@/types/types";

type Props = { element: EditorElement };

const Container = ({ element }: Props) => {
  const { id, content, styles, type } = element;
  const { dispatch, state, activeContainer, setActiveContainer, position, setPosition } = useEditor();

  const handleOnDrop = (e: React.DragEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();

    const componentType = e.dataTransfer.getData("componentType") as EditorBtns;
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
                color: "#ffffff",
                ...defaultStyles,
              },
              type: "text",
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
                src: "/sayan.png",
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
              styles: { ...defaultStyles, maxWidth: "940px", opacity: 1, borderRadius: "0px" },
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
              styles: { ...defaultStyles },
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
              styles: { ...defaultStyles, display: "flex" },
              type: "2Col",
            },
          },
        });

      case "element":
        if (activeContainer) {
          if (id !== activeContainer) {
            console.log(componentType, "ddd");

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
    e.preventDefault(); // Allow drop
    e.stopPropagation();
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const target = e.target as HTMLElement;
    target.style.opacity = "1"; // Reset the opacity
    e.stopPropagation();
    setActiveContainer(null);
  };

  //more events are dragenter, dragleave, drop
  //for moveble container dragstart, dragend

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement as HTMLElement;
      const isEditable = activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA" || activeElement.isContentEditable;

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
  }, [handleDeleteElement, id, state.editor.selectedElement.id, type]);

  return (
    <div
      id={id}
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
        maxWidth: styles?.maxWidth,
        maxHeight: styles?.maxHeight,
        rotate: styles.rotate,
      }}
      className={clsx("relative z-[1004] box inset-0", {
        "h-fit mx-auto w-full": type === "container" || type === "2Col",
        "!relative": type === "__body",
        // "overflow-scroll  overflow-x-hidden ": type === "__body",
        "flex flex-col md:!flex-row": type === "2Col",
        "shadow-inner-border-blue-500 ": state.editor.selectedElement.id === id && !state.editor.liveMode && state.editor.selectedElement.type === "__body",
        "cursor-grab": state.editor.selectedElement.id === id && !state.editor.liveMode,
        // "hover:outline hover:outline-[1px] hover:outline-offset-[-1px] hover:outline-blue-400": !state.editor.liveMode && type !== "__body",
      })}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={(e) => handleOnDrop(e, id)}
      draggable={type !== "__body"}
      onClick={handleOnClickBody}
      onDragStart={(e) => handleDragStart(e, "element")}
      onDragEnd={handleDragEnd}
    >
      <div
        style={{
          ...styles,
          rotate: "0",
        }}
        className={clsx("!relative !top-0 !bottom-0 !left-0 !right-0 !rotate-[0px] box-1 z-[1002] h-full w-full !m-0 group", {
          "px-4": type !== "__body",
          "pt-4 min-h-screen": type === "__body",
          "empty-outline ": Array.isArray(element.content) && !element.content.length && !state.editor.liveMode && type !== "__body",
          "!p-9": Array.isArray(element.content) && !element.content.length,
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
        className={clsx("absolute overflow-visible pointer-events-none z-[1002] inset-0 ", {
          hidden: state.editor.liveMode,
          "!shadow-inner-border-blue-500": state.editor.selectedElement.id === element.id,
        })}
      ></div>
      {/* <DropArea/> */}
      <Badge
        className={clsx("absolute bg-main z-[1006] -top-[16px] h-4 text-xs items-center  left-0 rounded-none rounded-t-md hidden", {
          flex: state.editor.selectedElement.id === element.id && !state.editor.liveMode,
          "bg-transparent text-main border border-main hover:bg-transparent": type === "__body",
        })}
      >
        {element.name}
      </Badge>
    </div>
  );
};

export default Container;
