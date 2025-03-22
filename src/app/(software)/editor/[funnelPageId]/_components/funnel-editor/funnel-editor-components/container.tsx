"use client";
import { Badge } from "@/components/ui/badge";
import { EditorElement, useEditor } from "../../../../../../../../providers/editor/editor-provider";
import clsx from "clsx";
import React, { ReactEventHandler, ReactNode, useCallback, useEffect, useState } from "react";
import { v4 } from "uuid";
import Recursive from "./recursive";
import { moveObject, updateId } from "@/lib/moveElement";
import { defaultStyles, EditorContentType } from "@/types/types";

type Props = { element: EditorElement };

const Container = ({ element }: Props) => {
  const { id, content, styles, type } = element;
  const { dispatch, state, activeContainer, setActiveContainer } = useEditor();

  const [dimensions, setDimensions] = useState({
    width: 100,
    height: 100,
  });


  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  // const handleResize = (e: any, direction: string) => {
  //   e.preventDefault();

  //   const startWidth = dimensions.width;
  //   const startHeight = dimensions.height;
  //   const startX = e.clientX;
  //   const startY = e.clientY;
  //   let newWidth = startWidth;
  //   let newHeight = startHeight;

  //   const onMouseMove = (event: any) => {
  //     requestAnimationFrame(() => {
  //       if (direction.includes("right")) {
  //         newWidth = Math.max(10, startWidth + (event.clientX - startX));
  //       }
  //       if (direction.includes("bottom")) {
  //         newHeight = Math.max(10, startHeight + (event.clientY - startY));
  //       }
  //       if (direction.includes("left")) {
  //         newWidth = Math.max(10, startWidth - (event.clientX - startX));
  //         setPosition((prev) => ({ ...prev, x: position.x + (event.clientX - startX) }));
  //       }
  //       if (direction.includes("top")) {
  //         newHeight = Math.max(10, startHeight - (event.clientY - startY));
  //         setPosition((prev) => ({ ...prev, y: position.y + (event.clientY - startY) }));
  //       }

  //       setDimensions({ width: newWidth, height: newHeight });

  //       // dispatch({
  //       //   type: "UPDATE_ELEMENT",
  //       //   payload: {
  //       //     elementDetails: {
  //       //       ...state.editor.selectedElement,
  //       //       styles: {
  //       //         ...state.editor.selectedElement.styles,
  //       //         ...styleObject,
  //       //       },
  //       //     },
  //       //   },
  //       // });
  //     });
  //   };

  //   const onMouseUp = () => {
  //     const styleObject = {
  //       width: `${newWidth}px`,
  //       height: `${newHeight}px`,
  //     };
  //     dispatch({
  //       type: "UPDATE_ELEMENT",
  //       payload: {
  //         elementDetails: {
  //           ...state.editor.selectedElement,
  //           styles: {
  //             ...state.editor.selectedElement.styles,
  //             ...styleObject,
  //           },
  //         },
  //       },
  //     });
  //     window.removeEventListener("mousemove", onMouseMove);
  //     window.removeEventListener("mouseup", onMouseUp);
  //   };

  //   window.addEventListener("mousemove", onMouseMove);
  //   window.addEventListener("mouseup", onMouseUp);
  // };

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
                maxWidth: "100%",
                opacity: 1,
                borderRadius: "0px",
                display: "flex",
                justifyContent: "center",
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
    e.dataTransfer.setData("componentType", type);
    const target = e.target as HTMLElement;
    target.style.opacity = "1";
    target.style.cursor = "grabbing";

    if (target.id) {
      const targetId = target.id;
      setActiveContainer(targetId);
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

  return (
    <div
      id={id}
      style={{
        width: styles?.width,
        height: styles?.height,
        position: styles?.position || "relative",
        top: styles?.top || position.y || 0,
        bottom: styles?.bottom || position.y || 0,
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
        "h-fit   w-full": type === "container" || type === "2Col",
        "!relative w-full ": type === "__body",
        "lg:scale-95 md:scale-90 -mt-1.5": type === "__body" && !state.editor.liveMode,
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
          backgroundColor: styles.backgroundColor || (type === '__body' ? '#f8f8f8' : ''),
        }}
        className={clsx("!relative !top-0 !bottom-0 !left-0 !right-0 !rotate-[0px] box-1 z-[1002] !h-full !w-full !m-0 group", {
          // "px-4": type !== "__body",
          "pt-4 min-h-screen ": type === "__body",
          "rounded-2xl ": type === "__body" && !state.editor.liveMode,
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
