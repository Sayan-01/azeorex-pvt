import React from "react";
import Sidebar from "./_components/sidebar";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex h-screen bg-[#141414]">
      <Sidebar/>
      <div className="flex-1 pt-7 pr-7 h-full overflow-y-auto box">{children}</div>
    </div>
  );
};

export default Layout;
