import Image from "next/image";
import React from "react";
import Button from "../buttons/Button";
import { MdOutlineArrowOutward } from "react-icons/md";
import { TbBrightness } from "react-icons/tb";
import Link from "next/link";

interface CategoryItemProps {
  item: {
    id: number;
    title: string;
    description: string;
    feature: string[];
    img_url: string;
    url: string;
  };
}

const CategoryItem = ({ item }: CategoryItemProps) => {
  return (
    <>
      <div className={`flex flex-col lg:max-w-5xl md:max-w-lg max-w-sm mx-auto gap-20 lg:mb-20 mb-10 ${item.id % 2 != 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
        <div className="w-full z-10">
          <Image
            alt={item.title}
            className="w-full aspect-[1/1] rounded-[30px]"
            width={200}
            height={200}
            src={item.img_url}
          ></Image>
        </div>
        <div className="z-10 text-center lg:text-left w-full items-start flex flex-col justify-center ">
          <div className="font-medium text-[#6689ff] bg-[#0C112D] md:text-[18px] px-[10px] py-[5px] border-2 border-[#29305e74] rounded-full mb-4 lg:mt-0 -mt-[112px] lg:mx-0 mx-auto">{item.title}</div>
          <div className=" mb-6 font-semibold leading-tight md:text-[40px] sm:text-[35px] text-[32px] ">{item.description}</div>
          <div className=" justify-center w-full lg:justify-start flex flex-wrap gap-x-2">
            <div className="font-medium md:text-[18px] text-base px-[7px] pr-[10px] py-[5px] bg-[#1b29811e] border-2 border-[#29305e74] rounded-full mb-3 flex items-center gap-4">
              <div className="text-[#4e76fb] font-bold">
                <TbBrightness size={22} />
              </div>
              <p>{item.feature[0]}</p>
            </div>
            <div className="font-medium md:text-[18px] text-base px-[7px] pr-[10px] py-[5px] bg-[#1b29811e] border-2 border-[#29305e74] rounded-full mb-3 flex items-center gap-4">
              <div className="text-[#4e76fb] font-bold">
                <TbBrightness size={22} />
              </div>
              <p>{item.feature[1]}</p>
            </div>
            <div className="font-medium md:text-[18px] text-base px-[7px] pr-[10px] py-[5px] bg-[#1b29811e] border-2 border-[#29305e74] rounded-full mb-3 flex items-center gap-4">
              <div className="text-[#4e76fb] font-bold">
                <TbBrightness size={22} />
              </div>
              <p>{item.feature[2]}</p>
            </div>
          </div>

          <Link
            href={item.url}
            className="mx-auto lg:mx-0"
          >
            <Button
              bigBlue
              className={"flex w-[162px] items-center mt-5"}
            >
              Explore More <MdOutlineArrowOutward />
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CategoryItem;
