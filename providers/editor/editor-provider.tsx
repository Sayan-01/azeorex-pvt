"use client";
import type { EditorContentType } from "@/types/types";
import React, { useRef } from "react";

import type { FunnelPage } from "@prisma/client";
import { type Dispatch, createContext, useContext, useReducer, useState } from "react";
import { DeviceType, EditorElement, EditorState, initialJSON } from "./editor-actions";
import { getElementById } from "@/lib/utils";

type EditorAction =
  | { type: "SET_ELEMENTS"; payload: { elements: EditorElement } }
  | { type: "SET_SELECTED_ID"; payload: { selectedId: string | null } }
  | { type: "SET_SELECTED_ELEMENT"; payload: { selectedElement: EditorElement | null } }
  | { type: "SET_HOVER_ID"; payload: { hoverId: string | null } }
  | { type: "SET_DRAGGED_ID"; payload: { draggedId: string | null } }
  | { type: "SET_DRAGGED_COMPONENT"; payload: { draggedComponent: EditorElement | null } }
  | { type: "SET_DROP_TARGET"; payload: { dropTargetId: string | null; dropPosition: "before" | "after" | "inside" | null } }
  | { type: "SET_DEVICE"; payload: { device: DeviceType } }
  | { type: "TOGGLE_PREVIEW_MODE" }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "SAVE_TO_HISTORY"; payload: { elements: EditorElement; selectedId: string | null } }
  | { type: "LOAD_DATA"; payload: { elements: EditorElement; liveMode: boolean } };

const initialState: EditorState = {
  elements: initialJSON,
  selectedId: null,
  selectedElement: null,
  hoverId: null,
  draggedId: null,
  draggedComponent: null,
  dropTargetId: null,
  dropPosition: null,
  history: [{ elements: initialJSON, selectedId: null }],
  historyIndex: 0,
  device: "Desktop",
  previewMode: false,
  liveMode: false,
  saveLoading: false,
};

const editorReducer = (state: EditorState, action: EditorAction): EditorState => {
  switch (action.type) {
    case "SET_ELEMENTS":
      return { ...state, elements: action.payload.elements };

    case "SET_SELECTED_ID": {
      const selectedElement = action.payload.selectedId ? getElementById(action.payload.selectedId, state.elements) : null;

      return {
        ...state,
        selectedId: action.payload.selectedId,
        selectedElement: selectedElement,
      };
    }

    case "SET_HOVER_ID":
      return { ...state, hoverId: action.payload.hoverId };

    case "SET_DRAGGED_ID":
      return { ...state, draggedId: action.payload.draggedId };

    case "SET_DRAGGED_COMPONENT":
      return { ...state, draggedComponent: action.payload.draggedComponent };

    case "SET_DROP_TARGET":
      return {
        ...state,
        dropTargetId: action.payload.dropTargetId,
        dropPosition: action.payload.dropPosition,
      };

    case "SET_DEVICE":
      return { ...state, device: action.payload.device };

    case "TOGGLE_PREVIEW_MODE":
      return { ...state, previewMode: !state.previewMode };

    case "SAVE_TO_HISTORY": {
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push({ elements: action.payload.elements, selectedId: action.payload.selectedId });
      return {
        ...state,
        elements: action.payload.elements,
        selectedId: action.payload.selectedId,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    }

    case "UNDO": {
      if (state.historyIndex > 0) {
        const prevState = state.history[state.historyIndex - 1];
        const selectedElement = prevState.selectedId ? getElementById(prevState.selectedId, prevState.elements) : null;
        return {
          ...state,
          elements: prevState.elements,
          selectedId: prevState.selectedId,
          selectedElement: selectedElement,
          historyIndex: state.historyIndex - 1,
        };
      }
      return state;
    }

    case "REDO": {
      if (state.historyIndex < state.history.length - 1) {
        const nextState = state.history[state.historyIndex + 1];
        const selectedElement = nextState.selectedId ? getElementById(nextState.selectedId, nextState.elements) : null;
        return {
          ...state,
          elements: nextState.elements,
          selectedId: nextState.selectedId,
          selectedElement: selectedElement,
          historyIndex: state.historyIndex + 1,
        };
      }
      return state;
    }
    case "LOAD_DATA": {
      return {
        ...state,
        elements: action.payload.elements,
        liveMode: !!action.payload.liveMode,
        historyIndex: 0,
      };
    }

    default:
      return state;
  }
};

type EditorContextType = {
  state: EditorState;
  dispatch: React.Dispatch<EditorAction>;
  updateElementStyle: (id: string, property: string, value: string) => void;
  updateElementContent: (id: string, newContent: string) => void;
  removeElement: (id: string, root: EditorElement) => EditorElement;
  insertElement: (element: EditorElement, targetId: string, position: "before" | "after" | "inside", root: EditorElement) => EditorElement;
  handleDrop: () => void;
  saveToHistory: (newElements: EditorElement, newSelectedId: string | null) => void;
  setSaveLoading: (loading: boolean) => void;
  userId: string;
  projectId: string;
  funnelPageId: string;
  funnelPageDetails: FunnelPage;
};

const EditorContext = createContext<EditorContextType | null>(null);

type EditorProviderProps = {
  children: React.ReactNode;
  userId: string;
  projectId: string;
  funnelPageId: string;
  funnelPageDetails: FunnelPage;
};

export const EditorProvider = ({ children, userId, projectId, funnelPageId, funnelPageDetails }: EditorProviderProps) => {
  const [state, dispatch] = useReducer(editorReducer, initialState);
  const [saveLoading, setSaveLoading] = useState(false);

  // Save to history
  const saveToHistory = (newElements: EditorElement, newSelectedId: string | null) => {
    dispatch({ type: "SAVE_TO_HISTORY", payload: { elements: newElements, selectedId: newSelectedId } });
  };

  // Update element style
  const updateElementStyle = (id: string, property: string, value: string) => {
    const updateElement = (el: EditorElement): EditorElement => {
      if (el.id === id) {
        return { ...el, styles: { ...el.styles, [property]: value } };
      }
      if (Array.isArray(el.content)) {
        return { ...el, content: el.content.map(updateElement) };
      }
      return el;
    };
    saveToHistory(updateElement(state.elements), state.selectedId);
  };

  // Update element content
  const updateElementContent = (id: string, newContent: string) => {
    const updateElement = (el: EditorElement): EditorElement => {
      if (el.id === id) {
        return { ...el, content: newContent };
      }
      if (Array.isArray(el.content)) {
        return { ...el, content: el.content.map(updateElement) };
      }
      return el;
    };
    saveToHistory(updateElement(state.elements), state.selectedId);
  };

  // Remove element
  const removeElement = (id: string, root: EditorElement): EditorElement => {
    if (Array.isArray(root.content)) {
      const filtered = root.content.filter((child) => child.id !== id);
      return {
        ...root,
        content: filtered.map((child) => removeElement(id, child)),
      };
    }
    return root;
  };

  // Check if parent contains child (prevent circular drops)
  const isDescendant = (parentId: string, childId: string): boolean => {
    const parent = getElementById(parentId, state.elements);
    if (!parent || !Array.isArray(parent.content)) return false;

    const checkChildren = (element: EditorElement): boolean => {
      if (element.id === childId) return true;
      if (Array.isArray(element.content)) {
        return element.content.some(checkChildren);
      }
      return false;
    };

    return parent.content.some(checkChildren);
  };

  // Insert element
  const insertElement = (element: EditorElement, targetId: string, position: "before" | "after" | "inside", root: EditorElement): EditorElement => {
    if (root.id === targetId && position === "inside" && Array.isArray(root.content)) {
      return {
        ...root,
        content: [...root.content, element],
      };
    }

    if (Array.isArray(root.content)) {
      const newContent: EditorElement[] = [];
      for (const child of root.content) {
        if (child.id === targetId) {
          if (position === "before") {
            newContent.push(element);
            newContent.push(child);
          } else if (position === "after") {
            newContent.push(child);
            newContent.push(element);
          } else {
            newContent.push(child);
          }
        } else {
          newContent.push(insertElement(element, targetId, position, child));
        }
      }
      return { ...root, content: newContent };
    }
    return root;
  };

  // Handle drop
  const handleDrop = () => {
    // Handle new component drop from sidebar
    if (state.draggedComponent && state.dropTargetId && state.dropPosition) {
      const newId = `${state.draggedComponent.type}-${Date.now()}`;
      const newElement = { ...state.draggedComponent, id: newId };

      const newElements = insertElement(newElement, state.dropTargetId, state.dropPosition, state.elements);
      saveToHistory(newElements, state.selectedId);

      dispatch({ type: "SET_DRAGGED_COMPONENT", payload: { draggedComponent: null } });
      dispatch({ type: "SET_DROP_TARGET", payload: { dropTargetId: null, dropPosition: null } });
      return;
    }

    // Handle existing element move
    if (!state.draggedId || !state.dropTargetId || !state.dropPosition || state.draggedId === state.dropTargetId) {
      dispatch({ type: "SET_DRAGGED_ID", payload: { draggedId: null } });
      dispatch({ type: "SET_DROP_TARGET", payload: { dropTargetId: null, dropPosition: null } });
      return;
    }

    // Prevent dropping parent into its own child
    if (isDescendant(state.draggedId, state.dropTargetId)) {
      console.log("Cannot drop parent into its own child");
      dispatch({ type: "SET_DRAGGED_ID", payload: { draggedId: null } });
      dispatch({ type: "SET_DROP_TARGET", payload: { dropTargetId: null, dropPosition: null } });
      return;
    }

    const draggedElement = getElementById(state.draggedId, state.elements);
    if (!draggedElement) {
      dispatch({ type: "SET_DRAGGED_ID", payload: { draggedId: null } });
      dispatch({ type: "SET_DROP_TARGET", payload: { dropTargetId: null, dropPosition: null } });
      return;
    }

    // Remove from old position
    let newElements = removeElement(state.draggedId, state.elements);

    // Insert at new position
    newElements = insertElement(draggedElement, state.dropTargetId, state.dropPosition, newElements);

    saveToHistory(newElements, state.selectedId);
    dispatch({ type: "SET_DRAGGED_ID", payload: { draggedId: null } });
    dispatch({ type: "SET_DROP_TARGET", payload: { dropTargetId: null, dropPosition: null } });
  };

  return (
    <EditorContext.Provider
      value={{
        state,
        dispatch,
        updateElementStyle,
        updateElementContent,
        removeElement,
        insertElement,
        handleDrop,
        saveToHistory,
        setSaveLoading,
        userId,
        projectId,
        funnelPageId,
        funnelPageDetails,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) throw new Error("useEditor must be used within EditorProvider");
  return context;
};
