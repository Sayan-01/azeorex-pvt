import React from "react";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import Header from "../(landing)/_components/home/Header";
import Footer from "../(landing)/_components/home/Footer";

const layout = async ({ children }:{children:React.ReactNode}) => {
  const session = await auth();
  if (session) redirect("/");
  return (
    <div className="bg-[#000000]">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
