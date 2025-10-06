
import React from "react";
import Header from "../(landing)/_components/home/Header";
import Footer from "../(landing)/_components/home/Footer";

const layout = ({children}: {children: React.ReactNode}) => {
  return <div className='bg-bcgc'><Header/>{children}<Footer/></div>;
};

export default layout;
