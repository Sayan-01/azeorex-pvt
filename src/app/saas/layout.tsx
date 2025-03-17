import React from "react";
import Sidebar from "./_components/sidebar";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex min-h-screen bg-[#141414]">
      <Sidebar />
      <main className="flex-1 h-full overflow-y-auto box md:ml-[240px]">{children}</main>
    </div>
  );
};

export default Layout;
