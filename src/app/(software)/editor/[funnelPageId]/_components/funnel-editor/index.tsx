"use client";
import { Button } from "@/components/ui/button";
import { getFunnelPageDetails } from "@/lib/queries";
import { useEditor } from "../../../../../../../providers/editor/editor-provider";
import clsx from "clsx";
import { ActivitySquare, EyeOff } from "lucide-react";
import React, { createRef, useEffect, useState } from "react";
import Recursive from "./funnel-editor-components/recursive";
import { Loader } from "@/components/global/Loader";
import { cn } from "@/lib/utils";
import { useDrop } from "react-dnd";

type Props = { funnelPageId: string; liveMode?: boolean };
// interface DropZoneProps {
//   index: number;
//   onDrop: (
//     item: {
//       type: string;
//       index?: number;
//     },
//     dropIndex: number
//   )=> void;
//   isEditable: boolean;
// }

// export const DropZone: React.FC<DropZoneProps> = ({ index, onDrop, isEditable }) => {
//   const [{ isOver, canDrop }] = useDrop({
//     accept: ["content"],
//     drop: (item: { type: string; index?: number }) => {
//       onDrop(item, index);
//     },
//     canDrop: () => isEditable,
//     collect: (monitor) => ({
//       isOver: !!monitor.isOver(),
//       canDrop: !!monitor.canDrop(),
//     }),
//   });

//   return <div className={(cn("h-4 my-2 rounded-md transition-all duration-200"), isOver && canDrop ? "border-green-500 bg-green-100" : "border-gray-500", canDrop ? "border-blue-300" : "")}>
//     {isOver && canDrop && (
//       <div className="h-full flex items-center justify-center text-green-500">Drop here</div>
//     )}
//   </div>;
// };

const FunnelEditor = ({ funnelPageId, liveMode }: Props) => {
  const { dispatch, state } = useEditor();
  const [load, setLoade] = useState(true);

  useEffect(() => {
    if (liveMode) {
      dispatch({
        type: "TOGGLE_LIVE_MODE",
        payload: { value: true },
      });
    }
  }, [liveMode]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getFunnelPageDetails(funnelPageId);
      if (!response) return;
      setLoade(false);
      dispatch({
        type: "LOAD_DATA",
        payload: {
          elements: response.content ? JSON.parse(response?.content) : "",
          withLive: !!liveMode,
        },
      });
    };
    fetchData();
  }, [funnelPageId]);

  const handleClick = () => {
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {},
    });
  };

  const handleUnpreview = () => {
    dispatch({ type: "TOGGLE_PREVIEW_MODE" });
    dispatch({ type: "TOGGLE_LIVE_MODE" });
  };
  return load ? (
    <Loader
      loading
      className="pb-12 "
    />
  ) : (
    <div
      id="perent"
      className={clsx("use-automation-zoom-in h-[calc(100%-40.8px)] overflow-y-auto mx-[240px] bg-[#272727s] transition-all box !relative ", {
        "!p-0 !mr-0 !mx-0 h-full": state.editor.previewMode === true || state.editor.liveMode === true,
        "!w-[850px]": state.editor.device === "Tablet",
        "!w-[420px]": state.editor.device === "Mobile",
        "w-full": state.editor.device === "Desktop",
      })}
      onClick={handleClick}
    >
      {state.editor.previewMode && state.editor.liveMode && (
        <Button
          variant={"ghost"}
          size={"icon"}
          className="w-6 h-6 bg-slate-600 p-[2px] fixed top-0 left-0 z-[100]"
          onClick={handleUnpreview}
        >
          <EyeOff />
        </Button>
      )}
      {Array.isArray(state.editor.elements) &&
        state.editor.elements.map((childElement, idx) => (
          <Recursive
            key={childElement.id}
            element={childElement}
          />
        ))}
    </div>
  );
};

export default FunnelEditor;
