"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Card from "../../_components/card";
import { IoIosSearch } from "react-icons/io";
import { MoveRight } from "lucide-react";
import TemplateCard from "@/components/design/TemplateCard";
import ScrollableFilter from "./scrollable-filter";
import { ChevronRight } from "lucide-react";
import CreatorBtn from "./creator-btn";
import UserBtn from "@/app/(landing)/_components/navbar/user-btn";
import { IoSearchOutline } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";

type Props = {
  templates: any[];
};
const TemplateComponent = ({ templates }: Props) => {
  const [query, setQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("");

  return (
    <div className="pb-7 ">
      <nav className="flex justify-between items-center bg-[#141414] sticky top-0 z-[40] md:py-7 md:px-7 py-5 px-5 ">
        <div className=" md:flex hidden items-center gap-2 rounded-full w-max ">
          <h3 className="text-white/70">Templates</h3>
          <ChevronRight size={16} />
        </div>
        <div className="md:mr-0 mr-[52px] flex gap-3 w-full md:w-auto sm:justify-between justify-between">
          <div className="items-center h-8 ml-2 bg-[#2d2f33] hover:bg-[#242529] rounded-md border border-[#545454]/30 w-full md:flex hidden">
            <div className="h-full  pl-2 rounded-l-md flex items-center text-white/60">
              <IoIosSearch size={18} />
            </div>
            <input
              className="h-full bg-transparent rounded-r-md px-2 text-xs max-w-[210px] w-full outline-none border-none"
              type="text"
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
              placeholder="Search..."
            />
          </div>
          <CreatorBtn className="md:flex hidden" />
          <div className="md:hidden flex md:items-center md:gap-12 w-[146px] gap-[12px]">
            <UserBtn
              size="md:h-8 h-9 md:w-8 w-9"
              margin="mt-2 z-[101] rounded-2xl"
              className=" overflow-hidden  min-w-fit rounded-full bg-gradient-to-br from-[#08C741] to-[#0F39C8] text-violet-200 text-[20px] font-semibold items-center justify-center outline-none border-none "
            ></UserBtn>
            <Link
              className=" flex items-center opacity-80"
              href="/"
            >
              <Image
                src="/logo.svg"
                height={400}
                width={400}
                className="w-[132px] h-[30px]"
                alt="logo"
              />
            </Link>
          </div>
        </div>
      </nav>
      <section className="mb-4 md:mb-6 md:px-7 px-5 sm:block hidden">
        <div className="bg-[#ffffff08] rounded-xl md:p-6 p-4 flex gap-3 items-center">
          <svg
            width="12"
            height="18"
            viewBox="0 0 12 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.5 10.3333L7.375 1V7.66667H11.5L4.625 17V10.3333H0.5Z"
              fill="#726fff"
              stroke="#726fff"
              stroke-linejoin="round"
            ></path>
          </svg>
          <h4>Upgrade to Super today!</h4>
          <p className="md:flex gap-3 items-center text-[13px] text-zinc-500 hidden">
            We improved Spline Super payments in your region.
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                id="Dark / Open Link v2"
                opacity="0.6"
              >
                <path
                  id="Vector 1"
                  d="M11.4998 4.49977L4.49951 11.5M11.4998 4.49977L11.4998 8.74241M11.4998 4.49977L7.25713 4.49977"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </g>
            </svg>
          </p>
        </div>
      </section>
      <section className="text-3xl mb-4 md:px-7 px-5  sm:hidden flex flex-col items-center">
        <h1 className="text-center font-bold text-2xl mb-2 mt-7">All Templates</h1>
        <p className="text-center text-sm mb-5 opacity-60 w-[90%]">The best azeorex and figma templates and websites from Azeorex community.</p>{" "}
        <div className="flex items-center gap-4 w-full">
          <div className="flex flex-1 items-center h-11 bg-[#2d2f33] hover:bg-[#242529] rounded-full border border-[#545454]/30 w-full px-2">
            <div className="h-full  pl-2 rounded-l-md flex items-center text-white/60">
              <IoSearchOutline size={20} />
            </div>
            <input
              className="h-full bg-transparent rounded-r-md px-2 text-xs max-w-[210px] w-full outline-none border-none"
              type="text"
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
              placeholder="Search..."
            />
          </div>
          <CreatorBtn className="h-11 w-11 rounded-full !bg-blue-500 flex items-center justify-center text-white" />
        </div>
      </section>
      <div className="md:px-7 px-5">
        <ScrollableFilter
          filterQuery={filterQuery}
          setFilterQuery={setFilterQuery}
        />
      </div>
      <section className="md:px-7 px-5">
        <div className="xxl md:gap-x-7 gap-x-5 md:gap-y-7 gap-y-6">
          {templates
            .filter((item) => item.title.toLowerCase().includes(query) && (filterQuery === "" || item.category.includes(filterQuery)))
            .map((item) => {
              return <TemplateCard item={item} />;
            })}
        </div>
      </section>
    </div>
  );
};

export default TemplateComponent;
