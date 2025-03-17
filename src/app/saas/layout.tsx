import React from "react";
import Sidebar from "./_components/sidebar";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex min-h-screen bg-[#141414]">
      <Sidebar />
      <main className="flex-1 min-h-screen box md:ml-[240px]">{children}</main>
    </div>
  );
};

export default Layout;
