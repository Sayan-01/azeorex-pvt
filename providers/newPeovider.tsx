'use client'
import { createContext, useContext, ReactNode, useState } from "react";

interface NewEditorContextType {
  selectedElement: HTMLElement | null;
  setSelectedElement: (element: HTMLElement | null) => void;
}

const NewEditorContext = createContext<NewEditorContextType | undefined>(undefined);

export const NewEditorProvider = ({ children }: { children: ReactNode }) => {
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);

  return (
    <NewEditorContext.Provider value={{ selectedElement, setSelectedElement }}>
      {children}
    </NewEditorContext.Provider>
  );
};
export const useNewEditor = () => {
  const context = useContext(NewEditorContext);
  if (!context) throw new Error("useNewEditor must be used within EditorProvider");
  return context;
};