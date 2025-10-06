import Image from "next/image";
import React from "react";

type Props = {
  className?: string;
  img: string;
  imgClassName?: string;
  bgUrl?: string;
  bgClassName?: string;
  num: string;
  title: string;
  numPosi: string;
  titlePosi: string;
}

const ApprochCard = ({ className, img, imgClassName, bgUrl, bgClassName, num, title, numPosi, titlePosi }:Props) => {
  return (
    <div className={`z-10 card p-6 w-full max-w-[490px] h-60 relative rounded-2xl border border-bor-100 bg-gradient-to-r from-[#04071d]/80 to-[#0d1027]/80 overflow-hidden ${className}`}>
      <Image
        src={img}
        className={`w-[350px] absolute ${imgClassName}`}
        width={1000}
        height={1000}
        alt={title}
      />
      {bgUrl ? (
        <>
          <Image
            src={bgUrl}
            className={`absolute ${bgClassName}`}
            width={1000}
            height={1000}
            alt={title}
          />
        </>
      ) : (
        <></>
      )}

      <h1 className={` duration-500 font-thin opacity-40 absolute ${numPosi}`}>{num}</h1>
      <h2 className={` duration-500 font-semibold text-2xl absolute ${titlePosi}`}>{title}</h2>
    </div>
  );
};

export default ApprochCard;
