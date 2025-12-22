import React from "react";
import Image from "next/image";
import { MdOutlineArrowOutward } from "react-icons/md";
import Link from "next/link";
import Heading from "@/components/design/Heading";
import Wrapper from "@/components/design/Wrapper";
import Button from "@/components/buttons/Button";
import { PenTool, Settings } from "lucide-react";

const Technology = () => {
  return (
    <>
      <Wrapper className={"flex flex-col items-center justify-center md:mt-32 mt-20  relative "}>
        
        <Heading
          className={"mb-20"}
          h3={"-: Tech part :-"}
          h1={"Technologies That We Use"}
          p={"Explore our cutting-edge technologies that drive innovation and deliver top-tier solutions for your needs."}
        />

        <div className="w-[200%] sm:w-full relative sm:left-0 left-[52%]">
          <Image
            alt="tech1"
            className=" z-20 w-full"
            src={"/technology.png"}
            width={2000}
            height={2000}
          />
        </div>
        <div className="w-[200%] sm:w-full sm:hidden block relative sm:left-0 right-[50%]">
          <Image
            alt="tech2"
            className=" z-20 w-full"
            src={"/technology.png"}
            width={1000}
            height={1000}
          />
        </div>
        <div className="w-full items-center justify-center gap-6 flex md:flex-row flex-col  mt-20">
          <Link
            href={`${process.env.NEXT_URL}connection`}
            className="items-center justify-center flex w-full md:w-max"
          >
            <Button className={"w-full"}>
              Contact <MdOutlineArrowOutward />
            </Button>
          </Link>
          <Link
            href={`${process.env.NEXT_URL}about`}
            className="items-center justify-center flex w-full md:w-max"
          >
            <Button className={"w-full"}>
              About <MdOutlineArrowOutward />
            </Button>
          </Link>
        </div>
      </Wrapper>
    </>
  );
};

export default Technology;
