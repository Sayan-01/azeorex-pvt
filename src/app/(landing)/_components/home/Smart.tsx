import Image from "next/image";
import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import Link from "next/link";
import Heading from "@/components/design/Heading";
import Button from "@/components/buttons/Button";

const Smart = () => {
  return (
    <section className="py-1  -mb-32  md:mb-0 max-w-7xl md:px-0 px-5 mx-auto relative bottom-24 h-[25rem] mt-60">
      <div className="absolute -top-10 left-1/2 -translate-x-1/2">
        <Image
          src={"/earth.png"}
          width={1000}
          height={1000}
          className="sm:scale-100 scale-150"
          alt="glob"
        />
      </div>
      <div className="w-full h-[30rem] sm:-bottom-56   absolute bg-bcgc blur-xl"></div>
      <Heading
        none={""}
        className={"md:!absolute md:bottom-5 -bottom-10 z-40"}
        h3={"-: ENDing :-"}
        h1={"Start Your Journey"}
        p={"Boost your creativity and business with Azeorex Team. Start your journey towards success and innovation today!"}
      />
      <Link
        href={`${process.env.NEXT_URL}/connection`}
        className="md:absolute relative  md:left-1/2 md:-translate-x-1/2 -bottom-16 md:-bottom-20 z-50 w-max"
      >
        <Button className={" w-full flex items-center justify-center gap-2 "}>
          Contact <MdOutlineArrowOutward />
        </Button>
      </Link>
    </section>
  );
};

export default Smart;
