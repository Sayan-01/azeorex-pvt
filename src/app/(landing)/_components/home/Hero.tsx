import React from "react";
import Button from "@/components/buttons/Button";
import SpotLight from "@/components/design/SpotLight";
import Wrapper from "@/components/design/Wrapper";
import { Container_y } from "./Container";
import { auth } from "../../../../../auth";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: "800" });

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
            <div className=" flex flex-col items-center justify-center max-w-[89vw] md:max-w-2xl lg:max-w-[60vw]">
              <p className="uppercase mb-3 tracking-widest text-xs text-center text-blue-100 ">Dynamic Web Magic with Next.js</p>

              <h1 className={`${poppins.className} text-center font-extrabold text-[35px] md:text-[48px] lg:text-[65px] leading-tight md:leading-[1.1]`}>
                We Convert
                <br className=" block sm:hidden" /> Your Dream Into Reality <span className="text-violet-400"> With Precision</span>
              </h1>
              <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-xl mt-6">
                Azeorex has a huge collection of premium templates and components. We <br className="lg:block hidden" /> also create complete mern stack & nextjs website.
              </p>
              <div className="flex gap-0 sm:gap-5 mt-5 w-full items-center justify-center">
                <Button
                  url={!session ? "/auth/agency/login" : "/demo"}
                  className={"w-[80vw] sm:w-full"}
                >
                  Get a Demo
                </Button>
                <Button
                  url={"/projects"}
                  className={"hidden sm:block "}
                >
                  See projects
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
