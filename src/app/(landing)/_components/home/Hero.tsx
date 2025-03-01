import React from "react";
import Button from "@/components/buttons/Button";
import SpotLight from "@/components/design/SpotLight";
import Wrapper from "@/components/design/Wrapper";
import { Container_y } from "./Container";
import { auth } from "../../../../../auth";
import { Paytone_One, Poppins } from "next/font/google";

const poppin = Paytone_One({ subsets: ["latin"], weight: "400" });

const Hero = async () => {
  const session = await auth();
  return (
    <div className="relative flex flex-col items-center text-center">
      <div className="absolute w-full z-0">
        <SpotLight />
      </div>
      <Wrapper className={"flex items-center justify-center flex-col"}>
        <Container_y>
          <div className="flex justify-center relative lg:mt-40 md:mt-44 mt-40 mb-16 my-44 z-10">
            <div className=" flex flex-col items-center justify-center max-w-[89vw] md:max-w-2xl lg:max-w-[64vw]">
              <p className="uppercase mb-3 tracking-widest text-xs text-center text-blue-100 ">Dynamic Web Magic with Next.js</p>

              <h1 className={`${poppin.className} text-center font-extrabold text-[35px] md:text-[48px] lg:text-[65px] leading-tight md:leading-[1.1]`}>
                Transform
                <br className=" block sm:hidden" /> Your Dream
                <br className=" sm:block hidden" /> Into Reality{" "}
                <span className="text-violet-400">
                  {" "}
                  With <br className=" block sm:hidden" />
                  Our Saas
                </span>
              </h1>
              <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-xl mt-6">
                Azeorex is a Next.js website builder and management SaaS, and it has a<br className="lg:block hidden" /> huge collection of premium templates and components.
              </p>
              <div className="flex gap-0 sm:gap-5 mt-5 w-full items-center justify-center">
                <Button
                  url={!session ? "/auth/login" : "/saas"}
                  className={"w-[80vw] sm:w-full"}
                >
                  Start for free
                </Button>
                <Button
                  url={"/templates"}
                  className={"hidden sm:block "}
                >
                  All templates
                </Button>
              </div>
            </div>
          </div>
        </Container_y>
      </Wrapper>
    </div>
  );
};

export default Hero;
