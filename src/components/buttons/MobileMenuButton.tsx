"use client";
import { Spiral as Hamburger } from "hamburger-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MobileMenuButton = ({ children }:{children: React.ReactNode}) => {
  const [open, setOpen] = useState(false);
  let pathname = usePathname()

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div>
      <Hamburger
        color="#aaaaaa"
        size={16}
        toggled={open}
        toggle={setOpen}
      />

      {open ? children : ""}
    </div>
  );
};

export default MobileMenuButton;
