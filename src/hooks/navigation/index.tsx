"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const useNavigation = () => {
  const pathName = usePathname();
  const [section, setSection] = useState(pathName);
  const onSetSection = (page: string) => setSection(page);
  return {
    section,
    onSetSection,
  };
};
