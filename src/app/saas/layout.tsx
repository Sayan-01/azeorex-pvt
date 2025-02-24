import React from "react";
import Sidebar from "./_components/sidebar";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex h-screen bg-[#141414]">
      <Sidebar />
      <div className="flex-1 h-full overflow-y-auto box md:ml-[240px]">{children}</div>
    </div>
  );
};

export default Layout;
