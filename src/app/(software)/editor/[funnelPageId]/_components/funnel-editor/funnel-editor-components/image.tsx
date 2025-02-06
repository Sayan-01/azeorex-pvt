"use client";
import { Badge } from "@/components/ui/badge";
import { EditorElement, useEditor } from "../../../../../../../../providers/editor/editor-provider";
import clsx from "clsx";
import { ImageIcon, Trash } from "lucide-react";
import React, { useEffect } from "react";
import { EditorBtns } from "@/types/types";
import Image from "next/image";

type Props = {
  element: EditorElement;
};

const ImageComponent = (props: Props) => {
  const { dispatch, state, setActiveContainer } = useEditor();
  const styles = props.element.styles;

  const handleOnClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: props.element,
      },
    });
  };

  const handleDragStart = (e: React.DragEvent, type: string) => {
    if (type === null) return;
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

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: { elementDetails: props.element },
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

  return (
    <div
      id={props.element.id}
      draggable
      onDragStart={(e) => handleDragStart(e, "image")}
      onClick={handleOnClick}
      className={clsx("w-full h-max relative text-[16px] transition-all flex items-center justify-center z-[1004] inset-0", {})}
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
      }}
    >
      {!Array.isArray(props.element.content) && (
        <Image
        width={1000}
        height={1000}
          src={props.element.content.src || "/sayan.png "}
          alt="azeorex"
          style={styles}
          className={clsx("!relative !top-0 !bottom-0 !left-0 !right-0 !rotate-[0px] box-1 z-[1002] !h-full !w-full !m-0 group", { abc: !state.editor.liveMode })}
        />
      )}

      <div
        className={clsx("absolute overflow-visible pointer-events-none z-[1002] inset-0 ", {
          hidden: state.editor.liveMode,
          "!shadow-inner-border-blue-500": state.editor.selectedElement.id === props.element.id,
        })}
      ></div>
      {state.editor.selectedElement.id === props.element.id && !state.editor.liveMode && (
        <Badge className="absolute bg-main -top-[16px] left-0 h-4 text-xs rounded-none rounded-t-md flex items-center">Image</Badge>
      )}
    </div>
  );
};

export default ImageComponent;
