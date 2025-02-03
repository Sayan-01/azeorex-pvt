import { Loader } from "@/components/global/Loader";
import React from "react";

const loading = () => {
  return <div className=" h-screen w-screen flex justify-center items-center"><Loader loading={true}/></div>;
};

export default loading;
