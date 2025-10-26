"use client";
import type { EditorContentType } from "@/types/types";
import React, { useRef } from "react";

import type { FunnelPage } from "@prisma/client";
import { type Dispatch, createContext, useContext, useReducer, useState } from "react";
import type { EditorAction } from "./editor-actions";

export type DeviceTypes = "Desktop" | "Mobile" | "Tablet";

export interface EditorState {
  html: string;
  selectedElement: HTMLElement | null;
  previewMode: boolean;
  liveMode: boolean;
  device: DeviceTypes;
  zoom: number;
  isDragging: boolean;
  isInlineEditing: boolean;
}

const initialEditorState: EditorState = {
  //=>
  html: `<div class="p-8 text-center bg-gray-100 rounded-lg">
    <h1 class="text-2xl font-bold">Start Editing...</h1>
  </div>`,
  selectedElement: null,
  previewMode: false,
  liveMode: false,
  device: "Desktop",
  zoom: 1,
  isDragging: false,
  isInlineEditing: false,
};

const editorReducer = (state: EditorState = initialEditorState, action: EditorAction): EditorState => {
  switch (action.type) {
    case "SET_HTML":
      return {
        ...state,
        html: action.payload.html,
      };

    case "SELECT_ELEMENT":
      return { ...state, selectedElement: action.payload.element };

    case "UPDATE_SELECTED_ELEMENT_STYLE": {
      const { selectedElement } = state;
      const { property, value } = action.payload;
      if (!selectedElement) return state;

      // ✅ 1. Apply live DOM change
      selectedElement.style[property as any] = value;
      // ✅ 2. Return new state so React re-renders sidebar
      return { ...state, selectedElement: selectedElement };
    }

    case "TOGGLE_PREVIEW_MODE":
      return { ...state, previewMode: !state.previewMode };

    case "TOGGLE_LIVE_MODE":
      return {
        ...state,
        liveMode: action.payload?.value ?? !state.liveMode,
      };

    case "CHANGE_DEVICE":
      return { ...state, device: action.payload.device };

    case "SET_ZOOM":
      return { ...state, zoom: action.payload.zoom };

    case "START_DRAG":
      return { ...state, isDragging: true };

    case "STOP_DRAG":
      return { ...state, isDragging: false };

    case "START_INLINE_EDIT":
      return { ...state, isInlineEditing: true };

    case "STOP_INLINE_EDIT":
      return { ...state, isInlineEditing: false };

    default:
      return state;
  }
};

type EditorContextType = {
  state: EditorState;
  dispatch: React.Dispatch<EditorAction>;
  enableEditingFeatures: (doc: Document) => void;
  agencyId: string;
  funnelId: string;
  pageDetails: FunnelPage;
};

const EditorContext = createContext<EditorContextType | null>(null);

type EditorProps = {
  children: React.ReactNode;
  agencyId: string;
  funnelId: string;
  pageDetails: FunnelPage;
};

export const EditorProvider = (props: EditorProps) => {
  const [state, dispatch] = useReducer(editorReducer, initialEditorState);

  // ✅ Enable inline editing, drag-drop, and delete
  const enableEditingFeatures = (doc: Document) => {
    if (!doc) return;

    doc.querySelectorAll("[data-editable]").forEach((el) => {
      (el as HTMLElement).contentEditable = "true";
    });

    doc.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      dispatch({ type: "SELECT_ELEMENT", payload: { element: target } });
    });

    // ✅ Drag & Drop
    doc.querySelectorAll("*").forEach((el) => {
      (el as HTMLElement).draggable = true;
      el.addEventListener("dragstart", () => dispatch({ type: "START_DRAG" }));
      el.addEventListener("dragend", () => dispatch({ type: "STOP_DRAG" }));
    });

    // ✅ Delete with keyboard
    doc.addEventListener("keydown", (e) => {
      if (e.key === "Delete" && state.selectedElement) {
        const selected = doc.getElementById(state.selectedElement.id);
        if (selected) selected.remove();
        dispatch({ type: "SELECT_ELEMENT", payload: { element: null } });
      }
    });
  };

  return (
    <EditorContext.Provider
      value={{
        state,
        dispatch,
        enableEditingFeatures,
        agencyId: props.agencyId,
        funnelId: props.funnelId,
        pageDetails: props.pageDetails,
      }}
    >
      {props.children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) throw new Error("useEditor must be used within EditorProvider");
  return context;
};
