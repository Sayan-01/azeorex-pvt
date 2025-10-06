"use client";

import React, { createContext, useContext, useState } from "react";

interface HoverStyle {
  top: number;
  left: number;
  width: number;
  height: number;
  display: "block" | "none";
}

interface OverlayContextProps {
  hoverStyle: HoverStyle;
  setHoverStyle: React.Dispatch<React.SetStateAction<HoverStyle>>;
  clickStyle: HoverStyle;
  setClickStyle: React.Dispatch<React.SetStateAction<HoverStyle>>;
}

const OverlayContext = createContext<OverlayContextProps | undefined>(undefined);

interface OverlayProviderProps {
  children: React.ReactNode;
}

export const OverlayProvider = ({ children }: OverlayProviderProps) => {
  const [hoverStyle, setHoverStyle] = useState<HoverStyle>({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    display: "none",
  });
  const [clickStyle, setClickStyle] = useState<HoverStyle>({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    display: "none",
  });
  return <OverlayContext.Provider value={{ hoverStyle, setHoverStyle, clickStyle, setClickStyle }}>{children}</OverlayContext.Provider>;
};

export const useOverlay = () => {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error("useOverlay must be used within an OverlayProvider");
  }
  return context;
};
