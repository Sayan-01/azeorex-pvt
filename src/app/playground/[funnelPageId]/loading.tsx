import LoadingAnimation from "@/components/global/loading-animation";
import React from "react";

const loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#141414]">
      <LoadingAnimation />
    </div>
  );
};

export default loading;
