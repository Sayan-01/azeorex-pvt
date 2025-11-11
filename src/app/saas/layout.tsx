import React from "react";
import Sidebar from "./_components/sidebar";
import { CreditProvider } from "@/hooks/credit-provider";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CreditProvider>
      <div className="w-full flex  bg-[#141414] ">
        <Sidebar />
        <main className="min-h-screen overflow-x-hidden box-1 md:ml-[240px] w-full">
          {children}
        </main>
      </div>
    </CreditProvider>
  );
};

export default Layout;
