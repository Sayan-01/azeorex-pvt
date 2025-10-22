"use client";
import type { EditorContentType } from "@/types/types";
import type React from "react";

import type { FunnelPage } from "@prisma/client";
import { type Dispatch, createContext, useContext, useReducer, useState } from "react";
import type { EditorAction } from "./editor-actions";


export type DeviceTypes = "Desktop" | "Mobile" | "Tablet";

export type EditorElement = {
  //=> Eta holo seta jeta amra actual show korbo orthat element gulu
  id: string;
  styles: React.CSSProperties;
  name: string;
  type: EditorContentType;
  content: EditorElement[] | { href?: string; innerText?: string; src?: string };
};

export type Editor = {
  //=> j editor a sob inject korchi tar tottho
  liveMode: boolean;
  elements: EditorElement[];
  selectedElement: EditorElement;
  hoverElement: EditorElement;
  device: DeviceTypes;
  previewMode: boolean;
  funnelPageId: string;
};

export type HistoryState = {
  //=>
  history: Editor[];
  currentIndex: number;
};

export type EditorState = {
  //=> biggest master state
  editor: Editor;
  history: HistoryState;
};

const initialEditorState: EditorState["editor"] = {
  //=>
  elements: [
    {
      content: [],
      id: "__body",
      name: "Body",
      styles: {},
      type: "__body",
    },
  ],
  selectedElement: {
    id: "",
    content: [],
    name: "",
    styles: {},
    type: null,
  },
  hoverElement: {
    id: "",
    content: [],
    name: "",
    styles: {},
    type: null,
  },
  device: "Desktop",
  previewMode: false,
  liveMode: false,
  funnelPageId: "",
};

const initialHistoryState: HistoryState = {
  //=>
  history: [initialEditorState],
  currentIndex: 0,
};

const initialState: EditorState = {
  //=>
  editor: initialEditorState,
  history: initialHistoryState,
};

const addAnElement = (editorArray: EditorElement[], action: EditorAction): EditorElement[] => {
  if (action.type !== "ADD_ELEMENT") throw Error("You sent the wrong action type to the Add Element editor State");
  return editorArray.map((item) => {
    if (item.id === action.payload.containerId && Array.isArray(item.content)) {
      return {
        ...item,
        content: [...item.content, action.payload.elementDetails],
      };
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: addAnElement(item.content, action),
      };
    }
    return item;
  });
};

const updateAnElement = (editorArray: EditorElement[], action: EditorAction): EditorElement[] => {
  if (action.type !== "UPDATE_ELEMENT" && action.type !== "UPDATE_CONTENT") {
    throw Error("You sent the wrong action type to the update Element State");
  }
  return editorArray.map((item) => {
    if (item.id === action.payload.elementDetails.id) {
      return { ...item, ...action.payload.elementDetails };
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: updateAnElement(item.content, action),
      };
    }
    return item;
  });
};

const deleteAnElement = (editorArray: EditorElement[], action: EditorAction): EditorElement[] => {
  if (action.type !== "DELETE_ELEMENT") throw Error("You sent the wrong action type to the Delete Element editor State");
  return editorArray.filter((item) => {
    if (item.id === action.payload.elementDetails.id) {
      return false;
    } else if (item.content && Array.isArray(item.content)) {
      item.content = deleteAnElement(item.content, action);
    }
    return true;
  });
};

// Improve the moveElement function to better handle parent-child relationships
const moveElement = (elements: EditorElement[], sourceParentId: string, sourceIndex: number, destinationParentId: string, destinationIndex: number, elementId: string): EditorElement[] => {
  // Special case for root level elements
  if (sourceParentId === "__root" && destinationParentId === "__body") {
    // Moving from root to body
    const [movedElement] = elements.splice(sourceIndex, 1);
    elements.splice(destinationIndex, 0, movedElement);
    return [...elements];
  }

  if (sourceParentId === "__body" && destinationParentId === "__root") {
    // Moving from body to root
    const [movedElement] = elements.splice(sourceIndex, 1);
    return [...elements, movedElement];
  }

  // Handle moving within the same parent
  if (sourceParentId === destinationParentId) {
    return elements.map((item) => {
      if (item.id === sourceParentId && Array.isArray(item.content)) {
        // Create a new array to avoid mutating the original
        const newContent = [...item.content];
        // Remove the element from its original position
        const [movedElement] = newContent.splice(sourceIndex, 1);
        // Insert it at the new position
        newContent.splice(destinationIndex, 0, movedElement);

        return {
          ...item,
          content: newContent,
        };
      } else if (Array.isArray(item.content)) {
        // Recursively search in children
        return {
          ...item,
          content: moveElement(item.content as EditorElement[], sourceParentId, sourceIndex, destinationParentId, destinationIndex, elementId),
        };
      }
      return item;
    });
  }

  // Handle moving between different parents
  let elementToMove: EditorElement | null = null;

  // First, find and remove the element from its source
  const elementsAfterRemoval = elements.map((item) => {
    if (item.id === sourceParentId && Array.isArray(item.content)) {
      const newContent = [...item.content];
      // Find and remove the element
      const removedElements = newContent.splice(sourceIndex, 1);
      if (removedElements.length > 0) {
        elementToMove = removedElements[0];
      }

      return {
        ...item,
        content: newContent,
      };
    } else if (Array.isArray(item.content)) {
      // Recursively search in children
      const newContent = moveElement(
        item.content as EditorElement[],
        sourceParentId,
        sourceIndex,
        "__temp_removal__", // Temporary destination to just remove
        0,
        elementId
      );

      // Check if the element was found and removed in this branch
      if (newContent !== item.content && !elementToMove) {
        // Try to find the removed element by comparing the arrays
        const originalIds = (item.content as EditorElement[]).map((el) => el.id);
        const newIds = (newContent as EditorElement[]).map((el) => el.id);

        const removedId = originalIds.find((id) => !newIds.includes(id));
        if (removedId) {
          elementToMove = (item.content as EditorElement[]).find((el) => el.id === removedId) || null;
        }
      }

      return {
        ...item,
        content: newContent,
      };
    }
    return item;
  });

  // Special case: if we're moving to the root level
  if (destinationParentId === "__body") {
    if (elementToMove) {
      const result = [...elementsAfterRemoval];
      result.splice(destinationIndex, 0, elementToMove);
      return result;
    }
    return elementsAfterRemoval;
  }

  // If we didn't find the element, return the original array
  if (!elementToMove) return elements;

  // Then, add the element to its destination
  return elementsAfterRemoval.map((item) => {
    if (item.id === destinationParentId && Array.isArray(item.content)) {
      const newContent = [...item.content];
      // Insert the element at the destination
      newContent.splice(destinationIndex, 0, elementToMove!);

      return {
        ...item,
        content: newContent,
      };
    } else if (Array.isArray(item.content)) {
      // Recursively search in children
      return {
        ...item,
        content: moveElement(
          item.content as EditorElement[],
          "__temp_insertion__", // Temporary source since we're just inserting
          0,
          destinationParentId,
          destinationIndex,
          elementId
        ),
      };
    }
    return item;
  });
};

const editorReducer = (state: EditorState = initialState, action: EditorAction): EditorState => {
  switch (action.type) {
    case "ADD_ELEMENT":
      const updatedEditorState = {
        ...state.editor,
        elements: addAnElement(state.editor.elements, action),
      };
      // Update the history to include the entire updated EditorState
      const updatedHistory = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorState }, // Save a copy of the updated state
      ];

      const newEditorState = {
        ...state,
        editor: updatedEditorState,
        history: {
          ...state.history,
          history: updatedHistory,
          currentIndex: updatedHistory.length - 1,
        },
      };

      return newEditorState;

    case "UPDATE_CONTENT":
      const updatedContents = updateAnElement(state.editor.elements, action);

      const UpdatedContentIsSelected = state.editor.selectedElement.id === action.payload.elementDetails.id;

      const updatedEditorStateWithContent = {
        ...state.editor,
        elements: updatedContents,
        selectedElement: UpdatedContentIsSelected
          ? action.payload.elementDetails
          : {
              id: "",
              content: [],
              name: "", 
              styles: {},
              type: null,
            },
      };
      // Update the history to include the entire updated EditorState
      const updatedHistoryWithContent = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateWithContent }, // Save a copy of the updated state
      ];

      const newEditorStateWithContent = {
        ...state,
        editor: updatedEditorStateWithContent,
        history: {
          ...state.history,
          history: updatedHistoryWithContent,
          currentIndex: updatedHistoryWithContent.length - 1,
        },
      };

      return newEditorStateWithContent; 

    case "UPDATE_ELEMENT":
      const updateElementWithoutLosingChildren = (elements: EditorElement[], action: any): EditorElement[] => {
        return elements.map((item) => {
          if (item.id === action.payload.elementDetails.id) {
            // স্টাইল আপডেট করবেন কিন্তু কন্টেন্ট অপরিবর্তিত রাখবেন
            return {
              ...item,
              styles: {
                ...item.styles,
                ...action.payload.elementDetails.styles,
              },
              // কন্টেন্ট একদম ঠিক রাখুন
              content: item.content,
            };
          } else if (item.content && Array.isArray(item.content)) {
            return {
              ...item,
              content: updateElementWithoutLosingChildren(item.content, action),
            };
          }
          return item;
        });
      };

      const updatedElements = updateElementWithoutLosingChildren(state.editor.elements, action);

      const UpdatedElementIsSelected = state.editor.selectedElement.id === action.payload.elementDetails.id;

      const updatedEditorStateWithUpdate = {
        ...state.editor,
        elements: updatedElements,
        selectedElement: UpdatedElementIsSelected
          ? {
              ...state.editor.selectedElement,
              styles: {
                ...state.editor.selectedElement.styles,
                ...action.payload.elementDetails.styles,
              },
            }
          : {
              id: "",
              content: [],
              name: "",
              styles: {},
              type: null,
            },
      };

      const updatedHistoryWithUpdate = [...state.history.history.slice(0, state.history.currentIndex + 1), { ...updatedEditorStateWithUpdate }];

      return {
        ...state,
        editor: updatedEditorStateWithUpdate,
        history: {
          ...state.history,
          history: updatedHistoryWithUpdate,
          currentIndex: updatedHistoryWithUpdate.length - 1,
        },
      };

    case "DELETE_ELEMENT":
      // Perform your logic to delete the element from the state
      const updatedElementsAfterDelete = deleteAnElement(state.editor.elements, action);
      const updatedEditorStateAfterDelete = {
        ...state.editor,
        elements: updatedElementsAfterDelete,
      };
      const updatedHistoryAfterDelete = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateAfterDelete }, // Save a copy of the updated state
      ];

      const deletedState = {
        ...state,
        editor: updatedEditorStateAfterDelete,
        history: {
          ...state.history,
          history: updatedHistoryAfterDelete,
          currentIndex: updatedHistoryAfterDelete.length - 1,
        },
      };
      return deletedState;

    case "CHANGE_CLICKED_ELEMENT":
      const clickedState = {
        ...state,
        editor: {
          ...state.editor,
          selectedElement: action.payload.elementDetails || {
            id: "",
            content: [],
            name: "",
            styles: {},
            type: null,
          },
        },
        history: {
          ...state.history,
          history: [
            ...state.history.history.slice(0, state.history.currentIndex + 1),
            { ...state.editor }, // Save a copy of the current editor state
          ],
          currentIndex: state.history.currentIndex + 1,
        },
      };
      return clickedState;
    case "CHANGE_DEVICE":
      const changedDeviceState = {
        ...state,
        editor: {
          ...state.editor,
          device: action.payload.device,
        },
      };
      return changedDeviceState;

    case "TOGGLE_PREVIEW_MODE":
      const toggleState = {
        ...state,
        editor: {
          ...state.editor,
          previewMode: !state.editor.previewMode,
        },
      };
      return toggleState;

    case "TOGGLE_LIVE_MODE":
      const toggleLiveMode: EditorState = {
        ...state,
        editor: {
          ...state.editor,
          liveMode: action.payload ? action.payload.value : !state.editor.liveMode,
        },
      };
      return toggleLiveMode;

    case "REDO":
      if (state.history.currentIndex < state.history.history.length - 1) {
        const nextIndex = state.history.currentIndex + 1;
        const nextEditorState = { ...state.history.history[nextIndex] };
        const redoState = {
          ...state,
          editor: nextEditorState,
          history: {
            ...state.history,
            currentIndex: nextIndex,
          },
        };
        return redoState;
      }
      return state;

    case "UNDO":
      if (state.history.currentIndex > 0) {
        const prevIndex = state.history.currentIndex - 1;
        const prevEditorState = { ...state.history.history[prevIndex] };
        const undoState = {
          ...state,
          editor: prevEditorState,
          history: {
            ...state.history,
            currentIndex: prevIndex,
          },
        };
        return undoState;
      }
      return state;

    case "LOAD_DATA":
      return {
        ...initialState,
        editor: {
          ...initialState.editor,
          elements: action.payload.elements || initialEditorState.elements,
          liveMode: !!action.payload.withLive,
        },
      };

    case "SET_FUNNELPAGE_ID":
      const { funnelPageId } = action.payload;
      const updatedEditorStateWithFunnelPageId = {
        ...state.editor,
        funnelPageId,
      };

      const updatedHistoryWithFunnelPageId = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateWithFunnelPageId }, // Save a copy of the updated state
      ];

      const funnelPageIdState = {
        ...state,
        editor: updatedEditorStateWithFunnelPageId,
        history: {
          ...state.history,
          history: updatedHistoryWithFunnelPageId,
          currentIndex: updatedHistoryWithFunnelPageId.length - 1,
        },
      };
      return funnelPageIdState;

    case "MOVE_ELEMENT":
      const { elementId, sourceParentId, sourceIndex, destinationParentId, destinationIndex } = action.payload;

      const updatedElementsAfterMove = moveElement(state.editor.elements, sourceParentId, sourceIndex, destinationParentId, destinationIndex, elementId);

      const updatedEditorStateAfterMove = {
        ...state.editor,
        elements: updatedElementsAfterMove,
      };

      const updatedHistoryAfterMove = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateAfterMove }, // Save a copy of the updated state
      ];

      const movedState = {
        ...state,
        editor: updatedEditorStateAfterMove,
        history: {
          ...state.history,
          history: updatedHistoryAfterMove,
          currentIndex: updatedHistoryAfterMove.length - 1,
        },
      };
      return movedState;

    default:
      return state;
  }
};

export type EditorContextData = {
  device: DeviceTypes;
  previewMode: boolean;
  setPreviewMode: (previewMode: boolean) => void;
  setDevice: (device: DeviceTypes) => void;
};

export const EditorContext = createContext<{
  state: EditorState;
  dispatch: Dispatch<EditorAction>;
  activeContainer: string | null;
  setActiveContainer: (activeContainer: string | null) => void;
  position: any;
  setPosition: (position: any) => void;
  agencyId: string;
  funnelId: string;
  pageDetails: FunnelPage | null;
}>({
  state: initialState,
  dispatch: () => undefined,
  activeContainer: null,
  setActiveContainer: () => undefined,
  position: {},
  setPosition: () => undefined,
  agencyId: "",
  funnelId: "",
  pageDetails: null,
});

type EditorProps = {
  children: React.ReactNode;
  agencyId: string;
  funnelId: string;
  pageDetails: FunnelPage | null;
};

const EditorProvider = (props: EditorProps) => {
  const [state, dispatch] = useReducer(editorReducer, initialState);
  const [activeContainer, setActiveContainer] = useState<string | null>(null);
  const [position, setPosition] = useState({});

  return (
    <EditorContext.Provider
      value={{
        state,
        dispatch,
        activeContainer,
        setActiveContainer,
        position,
        setPosition,
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
  if (!context) {
    throw new Error("useEditor Hook must be used within the editor Provider");
  }
  return context;
};

export default EditorProvider;
