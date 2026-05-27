"use client";
import React, { createContext, useCallback, useContext, useMemo, useReducer, ReactNode } from "react";
import type { EditorElement, DropPosition, DeviceType, EditorState } from "./editor-types";
import { initialState } from "./editor-types";
import { EditorAction, editorReducer } from "./editor-reducer";

type EditorContextType = {
  state: EditorState; // পুরো state
  dispatch: React.Dispatch<EditorAction>; // action পাঠানোর function

  // নিচেরগুলো "helper functions" — dispatch সরাসরি না লিখে
  // এই functions দিয়ে কাজ করলে কোড পরিষ্কার থাকে
  selectElement: (id: string | null) => void;
  deleteElement: (id: string) => void;
  updateStyle: (id: string, property: string, value: string) => void;
  updateAttribute: (id: string, attributeName: string, value: string) => void;
  updateContent: (id: string, content: string) => void;
  insertElement: (element: EditorElement, targetId: string, position: DropPosition) => void;
  moveElement: (id: string, targetId: string, position: DropPosition) => void;
  duplicateElement: (id: string) => void;
  batchUpdateStyles: (id: string, styles: Record<string, string>) => void;
  undo: () => void;
  redo: () => void;
  setDevice: (device: DeviceType) => void;
  togglePreview: () => void;
};

// ─────────────────────────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────────────────────────

const EditorContext = createContext<EditorContextType | undefined>(undefined);

// ─────────────────────────────────────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────────────────────────────────────

export function EditorProvider({ children }: { children: ReactNode }) {
  // ★★★ এই লাইনটাই সব কিছুর কেন্দ্র ★★★
  //
  // useReducer নেয়: (reducer function, initial state)
  // দেয়:           [current state,   dispatch function]
  //
  // state   = এই মুহূর্তের পুরো editor state
  // dispatch = যেকোনো action পাঠানোর function
  //            dispatch({ type: "DELETE_ELEMENT", payload: { id: "x" } })
  //            → React এটাকে editorReducer-এ পাঠায়
  //            → reducer নতুন state return করে
  //            → React re-render করে
  const [state, dispatch] = useReducer(editorReducer, initialState);

  // ─────────────────────────────────────────────────────────────────────────
  // Helper functions
  //
  // এগুলো dispatch-এর উপরে পাতলা wrapper।
  // Component থেকে প্রতিবার { type, payload } লেখার বদলে
  // selectElement("text-1") এভাবে call করা যাবে।
  //
  // useCallback — এই functions-গুলো re-render-এ নতুন করে তৈরি হবে না
  //               (performance optimization)
  // ─────────────────────────────────────────────────────────────────────────

  const selectElement = useCallback((id: string | null) => {
    dispatch({ type: "SET_SELECTED_ID", payload: { selectedId: id } });
  }, []);

  const deleteElement = useCallback((id: string) => {
    dispatch({ type: "DELETE_ELEMENT", payload: { id } });
  }, []);

  const updateStyle = useCallback((id: string, property: string, value: string) => {
    dispatch({ type: "UPDATE_STYLE", payload: { id, property, value } });
  }, []);

  const updateAttribute = useCallback((id: string, attributeName: string, value: string) => {
    dispatch({ type: "UPDATE_ATTRIBUTE", payload: { id, attributeName, value } });
  }, []);

  const updateContent = useCallback((id: string, content: string) => {
    dispatch({ type: "UPDATE_CONTENT", payload: { id, content } });
  }, []);

  const insertElement = useCallback((element: EditorElement, targetId: string, position: DropPosition) => {
    dispatch({ type: "INSERT_ELEMENT", payload: { element, targetId, position } });
  }, []);

  const moveElement = useCallback((id: string, targetId: string, position: DropPosition) => {
    dispatch({ type: "MOVE_ELEMENT", payload: { id, targetId, position } });
  }, []);

  const duplicateElement = useCallback((id: string) => {
    dispatch({ type: "DUPLICATE_ELEMENT", payload: { id } });
  }, []);

  const batchUpdateStyles = useCallback((id: string, styles: Record<string, string>) => {
    dispatch({ type: "BATCH_UPDATE_STYLES", payload: { id, styles } });
  }, []);

  const undo = useCallback(() => dispatch({ type: "UNDO" }), []);
  const redo = useCallback(() => dispatch({ type: "REDO" }), []);

  const setDevice = useCallback((device: DeviceType) => {
    dispatch({ type: "SET_DEVICE", payload: { device } });
  }, []);

  const togglePreview = useCallback(() => {
    dispatch({ type: "TOGGLE_PREVIEW_MODE" });
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // Context-এ কী পাঠাবো সেটা একসাথে বানাই
  //
  // useMemo — এই object-টা re-render-এ নতুন করে তৈরি হবে না
  //            যদি না state বা function-গুলো বদলায়
  // ─────────────────────────────────────────────────────────────────────────

  const value = useMemo<EditorContextType>(
    () => ({
      state,
      dispatch,
      selectElement,
      deleteElement,
      updateStyle,
      updateContent,
      updateAttribute,
      insertElement,
      moveElement,
      duplicateElement,
      batchUpdateStyles,
      undo,
      redo,
      setDevice,
      togglePreview,
    }),
    [
      state, // state বদলালে নতুন value তৈরি হবে → child re-render হবে
      selectElement,
      deleteElement,
      updateStyle,
      updateContent,
      updateAttribute,
      insertElement,
      moveElement,
      duplicateElement,
      batchUpdateStyles,
      undo,
      redo,
      setDevice,
      togglePreview,
    ],
  );

  // EditorContext.Provider — এই component-এর ভেতরে যা আছে সবাই
  // context থেকে value নিতে পারবে
  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
}

// ─────────────────────────────────────────────────────────────────────────────
// ধাপ ৪ — useEditor hook
//
// এটা হলো "চাবি"।
// যেকোনো component এই hook call করলে context থেকে
// state ও সব helper function পেয়ে যাবে।
//
// ব্যবহার:
//   const { state, selectElement, deleteElement } = useEditor();
//
// Error guard: যদি EditorProvider-এর বাইরে call করা হয়
// তাহলে সাথে সাথে error দেবে — চুপচাপ undefined পাবে না।
// ─────────────────────────────────────────────────────────────────────────────

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor() কে EditorProvider-এর ভেতরে রাখতে হবে।\n" + "তোমার app-এ <EditorProvider> দিয়ে wrap করেছো কি?");
  }
  return context;
};
