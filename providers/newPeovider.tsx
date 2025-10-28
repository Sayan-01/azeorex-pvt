"use client";
import { createContext, useContext, ReactNode, useState, useCallback } from "react";

interface NewEditorContextType {
  selectedElement: HTMLElement | null;
  setSelectedElement: (element: HTMLElement | null) => void;
  updateStyle: (property: string, value: string) => void;
  onSave: any;
  setOnSave: (value: any) => void;
}

const NewEditorContext = createContext<NewEditorContextType | undefined>(undefined);

export const NewEditorProvider = ({ children }: { children: ReactNode }) => {
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [onSave, setOnSave] = useState<any>();
  const updateStyle = useCallback(
    (property: string, value: string) => {
      if (!selectedElement) return;
      selectedElement.style[property as any] = value;
    },
    [selectedElement]
  );

  return <NewEditorContext.Provider value={{ selectedElement, setSelectedElement, updateStyle, onSave, setOnSave }}>{children}</NewEditorContext.Provider>;
};

export const useNewEditor = () => {
  const context = useContext(NewEditorContext);
  if (!context) throw new Error("useNewEditor must be used within NewEditorProvider");
  return context;
};
