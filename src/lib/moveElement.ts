"use client";

import { EditorElement, EditorState, useEditor } from "../../providers/editor/editor-provider";
import { v4 } from "uuid";

const findAndRemoveObjectById = (objArray: EditorElement[], targetId: string): EditorElement | null | undefined => {
  for (let i = 0; i < objArray.length; i++) {
    const obj = objArray[i];
    if (obj.id === targetId) {
      objArray.splice(i, 1);
      return obj;
    }
    if (obj.content && Array.isArray(obj.content)) {
      const result = findAndRemoveObjectById(obj.content, targetId);
      if (result) return result;
    }
  }
};

// Recursive function to search for the object with the given ID and add a new object to its content array
const findAndAddObjectById = (objArray: EditorElement[], targetId: string, newObj: EditorElement): boolean => {
  for (const obj of objArray) {
    if (obj.id === targetId) {
      if (!Array.isArray(obj.content)) obj.content = [];
      obj.content.push(newObj);
      return true;
    }
    if (obj.content && Array.isArray(obj.content)) {
      const result = findAndAddObjectById(obj.content, targetId, newObj);
      if (result) return result;
    }
  }
  return false;
};

export const moveObject = (data: EditorElement[], draggableId: string, perentId: string, state:EditorState) => {
  const objToMove = findAndRemoveObjectById(data, draggableId);
  if (objToMove) {
    findAndAddObjectById(data, perentId, objToMove);
  }

  // const updatedEditorState = {
  //   ...state.editor,
  //   elements: objToMove,
  // };

  // console.log("lllll",updatedEditorState);
  

  // const updatedHistory = [
  //   ...state.history.history.slice(0, state.history.currentIndex + 1),
  //   { ...updatedEditorState }, // Save a copy of the updated state
  // ];

  // const newEditorState = {
  //   ...state,
  //   editor: updatedEditorState,
  //   history: {
  //     ...state.history,
  //     history: updatedHistory,
  //     currentIndex: updatedHistory.length - 1,
  //   },
  // };
  return null;
};

//for components and warframe

export function updateId(data: EditorElement) {
  // Create a deep copy of the data to avoid mutating the original object
  const newData = { ...data };

  // If the object contains an "id" key, replace it with a new UUID
  if (newData.id) {
    newData.id = v4();
  }

  // If the object contains a "content" key that is an array, recursively process its elements
  if (Array.isArray(newData.content)) {
    newData.content = newData.content.map(updateId);
  }
            console.log("sayan");

  return newData;
}
