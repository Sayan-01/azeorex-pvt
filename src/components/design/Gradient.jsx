import Image from "next/image";
import React from "react";

const Gradient = ({ className }) => {
  return (
    <div className={` absolute z-0 ${className}`}>
      <Image
        className="w-[1500px] h-[36rem] relative "
        width={200}
        height={200}
        src={"/gradient.svg"}
        alt="Gradient"
      />
    </div>
  );
};

export default Gradient;
