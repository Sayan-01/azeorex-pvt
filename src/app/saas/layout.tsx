import React from "react";
import Sidebar from "./_components/sidebar";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex  bg-[#141414] ">
      <Sidebar />
      
      <main className="min-h-screen overflow-x-hidden box-1 md:ml-[240px]">{children}</main>
    </div>
  );
};

export default Layout;
