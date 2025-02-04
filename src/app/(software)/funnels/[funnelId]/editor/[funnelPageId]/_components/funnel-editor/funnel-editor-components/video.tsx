'use client'
import { Badge } from '@/components/ui/badge'
import { EditorElement, useEditor } from "../../../../../../../../../../../../providers/editor/editor-provider";
import clsx from 'clsx'
import { Trash } from 'lucide-react'
import React from 'react'
import { EditorBtns } from '@/types/types';

type Props = {
  element: EditorElement
}

const VideoComponent = (props: Props) => {
  const { dispatch, state } = useEditor()
  const styles = props.element.styles

  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }

  const handleOnClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {
        elementDetails: props.element,
      },
    })
  }

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: props.element },
    })
  }

  return (
    <div
      style={styles}
      draggable
      onDragStart={(e) => handleDragStart(e, "video")}
      onClick={handleOnClick}
      className={clsx("p-[2px] w-full ok relative text-[16px] transition-all flex items-center justify-center", {
        "!border-blue-500": state.editor.selectedElement.id === props.element.id,
        "!border-solid": state.editor.selectedElement.id === props.element.id,
        "border-dashed border-[1px] border-slate-300 hover:border-blue-500 ": !state.editor.liveMode,
      })}
    >
      {state.editor.selectedElement.id === props.element.id && !state.editor.liveMode && (
        <Badge className="absolute -top-[20px] h-5 -left-[1px] rounded-none rounded-t-lg ">{state.editor.selectedElement.name}</Badge>
      )}

      {!Array.isArray(props.element.content) && (
        <iframe
          width={props.element.styles.width || "560"}
          height={props.element.styles.height || "315"}
          src={"https://youtu.be/jNZHwcD4GqM?si=AdfuqQJGElYslfMF"}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      )}

      {state.editor.selectedElement.id === props.element.id && !state.editor.liveMode && (
        <div className="absolute bg-blue-500 px-2.5 py-1 text-xs font-bold  -top-[20px] -right-[1px] rounded-none rounded-t-lg !text-white">
          <Trash
            className="cursor-pointer"
            size={12}
            onClick={handleDeleteElement}
          />
        </div>
      )}
    </div>
  );
}

export default VideoComponent
