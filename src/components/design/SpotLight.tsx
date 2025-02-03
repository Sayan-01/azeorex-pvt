import Image from "next/image";
import React from "react";

const SpotLight = ({className}: {className?: string}) => {
  return (
    <div className={`relative w-full top-0 ${className}`}>
      <div className=" absolute left-0 top-0">
        <Image
          src={"/home/spotLight1.svg"}
          width={500}
          height={500}
          className="w-[740px] h-[740px] md:block hidden"
          alt='left_spotlight'
        />
      </div>
      <div className=" absolute right-0 top-0">
        <Image
          src={"/home/spotLight2.svg"}
          width={500}
          height={500}
          className="w-[740px] h-[750px] md:block hidden"
          alt='right_spotlight'
        />
      </div>

      <div>
        <Image
          src={"/home/grid.svg"}
          width={500}
          height={500}
          className="w-full h-[60rem] md:block hidden"
          alt='desktop_grid'
        />
      </div>
      <div>
        <Image
          src={"/home/grid2.svg"}
          width={500}
          height={500}
          className="w-full h-[48rem] block md:hidden"
          alt='mobile_grid'
        />
      </div>
    </div>
  );
};

export default SpotLight;
