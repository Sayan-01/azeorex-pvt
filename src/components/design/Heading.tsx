import React from "react";
import Gradient from "./Gradient";

type Props = {
  h3: string;
  h1: string;
  p?: string;
  className?: string;
  none?: string;
};
const Heading = ({ h3, h1, p, className, none }: Props) => {
  return (
    <div className={` w-full flex flex-col items-center text-center ${className} relative `}>
      <Gradient className={`-top-56  sm:scale-[1.5] md:scale-[1] scale-[2] sm:left-0 -left-24 ${none}`} />
      <h1 className={`uppercase text-[#5c61b8] font-semibold md:text-[18px] sm:text-[15px] text-[14px] w-full`}>{h3}</h1>
      <h2 className="max-w-4xl font-semibold leading-[1.2] tracking-wide md:text-[60px] sm:text-[48px] text-[36px]  my-3 mb-6">{h1}</h2>
      <p className=" text-center mb-2 max-w-[43rem] md:text-[22px] sm:text-[18px] text-[16px] opacity-70">{p}</p>
    </div>
  );
};
export default Heading;
