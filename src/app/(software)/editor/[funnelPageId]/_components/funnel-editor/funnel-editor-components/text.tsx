"use client";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import React, { useEffect } from "react";
import { EditorElement, useEditor } from "../../../../../../../../providers/editor/editor-provider";

type Props = {
  element: EditorElement;
};

const TextComponent = (props: Props) => {
  const { dispatch, state, setActiveContainer } = useEditor();

  const handleDragStart = (e: React.DragEvent, type: string) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type); //=> 14:18
    // target.style.opacity = "0.3";
    const target = e.target as HTMLElement;

    // Check if the target has an id property
    if (target.id) {
      const targetId = target.id;
      setActiveContainer(targetId);
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const target = e.target as HTMLElement;
    target.style.opacity = "1"; // Reset the opacity
    setActiveContainer(null);
  };

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: { elementDetails: props.element },
    });
  };

  const styles = props.element.styles;

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
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
        if (state.editor.selectedElement.id === props.element.id && props.element.type !== "__body") {
          e.preventDefault(); // Prevent default browser behavior
          handleDeleteElement();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleDeleteElement, props.element.id, state.editor.selectedElement.id]);

  //WE ARE NOT ADDING DRAG DROP
  return (
    <p
      id={props.element.id}
      style={{
        ...styles,
        position: styles?.position || "relative",
        top: styles?.top || 0,
        bottom: styles?.bottom || 0,
        left: styles?.left || 0,
        right: styles?.right || 0,
        zIndex: styles?.zIndex || 0,
      }}
      className={clsx("w-max h-max transition-all box-1 z-[1004] group", { abc: !state.editor.liveMode })}
      contentEditable={!state.editor.liveMode && state.editor.selectedElement.id === props.element.id}
      onBlur={(e) => {
        const spanElement = e.target as HTMLSpanElement;
        dispatch({
          type: "UPDATE_ELEMENT",
          payload: {
            elementDetails: {
              ...props.element,
              content: {
                innerText: spanElement.innerText,
              },
            },
          },
        });
      }}
      draggable
      onClick={handleOnClickBody}
      onDragStart={(e) => handleDragStart(e, "element")}
      onDragEnd={handleDragEnd}
    >
      {!Array.isArray(props.element.content) && props.element.content.innerText}
    </p>
  );
};

export default TextComponent;
