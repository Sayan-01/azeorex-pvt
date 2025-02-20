import React from "react";
import Sidebar from "./_components/sidebar";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex h-screen bg-[#141414]">
      <Sidebar/>
      <div className="flex-1 md:pt-7 md:px-7 pt-5 px-5 h-full overflow-y-auto box">{children}</div>
    </div>
  );
};

export default Layout;
