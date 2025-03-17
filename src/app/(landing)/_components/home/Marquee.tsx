import Image from "next/image";
import React from "react";

import { MdOutlineArrowOutward } from "react-icons/md";
import Link from "next/link";
import Wrapper from "@/components/design/Wrapper";
import Heading from "@/components/design/Heading";
import Button from "@/components/buttons/Button";

const Marquee = () => {
  return (
    <div className="mb-[8rem] sm:mt-[1rem] mt-20">
      <Wrapper>
        <div className=" w-full mb-10 text-center flex  items-center flex-col">
          <Heading
            h3={"-: OUR PARTNER :-"}
            h1={"Trusted Collaborators"}
            p={"Discover the esteemed allies who enhance Replex's capabilities and amplify your customer engagement."}
          />
        </div>
        {/* 1st set */}
        <div className="logos mx-auto max-w-[90%] relative overflow-hidden  whitespace-nowrap -mb-10">
          {/* first block */}
          <ImageMarqueeBlock directionClass={"logos-slider"} />
          {/* second block */}
          <ImageMarqueeBlock directionClass={"logos-slider"} />
        </div>

        {/* 2nd set */}
        <div className="logos mx-auto max-w-[90%] relative overflow-hidden  whitespace-nowrap ">
          {/* first block */}
          <ImageMarqueeBlock directionClass={"logos-slider-rev"} />
          {/* second block */}
          <ImageMarqueeBlock directionClass={"logos-slider-rev"} />
        </div>
        <Link href="/templates/products" className='relative z-50'>
          <Button className={"mx-auto gap-2 md:w-[190px] mt-12"}>
            Get Started <MdOutlineArrowOutward />
          </Button>
        </Link>
      </Wrapper>
    </div>
  );
};

const ImageMarqueeBlock = ({ directionClass }:{directionClass: string}) => {
  return (
    <div className={`${directionClass} inline-flex items-center w-[80rem]`}>
      <div className="flex sm:gap-10 gap-10 items-center">
        <div className="sm:scale-[1.2] ">
          <Image
            className="md:h-[112px] h-[90px] w-[105px]"
            alt="marquee-webflow"
            width={135}
            height={130}
            src={`marquee_logos/logo1.svg`}
          />
        </div>
        <div className="sm:scale-[1.2] ml-2">
          <Image
            className="md:h-[112px] h-[100px] w-[120px]"
            alt="marquee-framer"
            width={140}
            height={130}
            src={`marquee_logos/logo2.svg`}
          />
        </div>
        <div className="sm:scale-[1.2] ml-2">
          <Image
            className="md:h-[112px] h-[100px] w-[150px]"
            alt="marquee-word"
            width={170}
            height={120}
            src={`marquee_logos/logo3.svg`}
          />
        </div>
        <div className="sm:scale-[1.2] ml-1">
          <Image
            className="md:h-[112px] h-[100px] w-[90px]"
            alt="marquee-google"
            width={140}
            height={120}
            src={`marquee_logos/logo4.svg`}
          />
        </div>
        <div className="sm:scale-[1.2] ml-4">
          <Image
            className="md:h-[112px] h-[100px] w-[100px]"
            alt="marquee-dribbble"
            width={135}
            height={120}
            src={`marquee_logos/logo5.svg`}
          />
        </div>
        <div className="sm:scale-[1.2] ml-5">
          <Image
            className="md:h-[112px] h-[100px] w-[118px]"
            alt="marquee-mid"
            width={130}
            height={120}
            src={`marquee_logos/logo6.svg`}
          />
        </div>
        <div className="sm:scale-[1.2]">
          <Image
            className="md:h-[112px] h-[100px] w-[100px]"
            alt="marquee-canva"
            width={120}
            height={120}
            src={`marquee_logos/logo7.svg`}
          />
        </div>
        <div className="sm:scale-[1.2] -ml-1">
          <Image
            className="md:h-[112px] h-[100px] w-[100px]"
            alt="marquee-figma"
            width={120}
            height={120}
            src={`marquee_logos/logo8.svg`}
          />
        </div>
      </div>
    </div>
  );
};

export default Marquee;
