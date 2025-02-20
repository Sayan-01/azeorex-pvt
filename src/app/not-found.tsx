import Image from "next/image";
import React from "react";

const Custom404 = () => {
  return <div className="w-full h-screen flex items-center justify-center">
    <Image src="/not_Found.jpg" width={400} height={300} alt="404" className="md:h-48 h-28"/>
  </div>;
};

export default Custom404;
