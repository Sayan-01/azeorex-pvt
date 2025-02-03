"use client";
import { Spiral as Hamburger } from "hamburger-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MobileMenuButton = () => {
  const [open, setOpen] = useState(false);
    const pathname = usePathname(); // Correct way to get the current path

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Hamburger
      color="#aaaaaa"
      size={16}
      toggled={open}
      toggle={setOpen}
    />
  );
};

export default MobileMenuButton;
