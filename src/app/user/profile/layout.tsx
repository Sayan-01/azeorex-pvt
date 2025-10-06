import Footer from "@/app/(landing)/_components/home/Footer";
import Header from "@/app/(landing)/_components/home/Header";
import React from "react";

const layout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className="min-h-screen w-full bg-[#0d0d0f] text-zinc-200">
      <Header />
      {children}
      <Footer />
    </div>
  );

};

export default layout;
