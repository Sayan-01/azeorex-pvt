import React from "react";
import Sidebar from "./_components/sidebar";
import Header from "./_components/info-header";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex  bg-[#141414] ">
      <Sidebar />
      <main className="min-h-screen overflow-x-hidden box-1 md:ml-[240px] flex-1">{children}</main>
    </div>
  );
};

export default Layout;
