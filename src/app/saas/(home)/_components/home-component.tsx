"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { IoIosSearch } from "react-icons/io";
import Image from "next/image";
import CreateProjectButton from "../../projects/_components/CreateProjectButton";
import Card from "../../_components/card";
import TemplateCard from "@/components/design/TemplateCard";
import EmptyStatefunnel from "@/components/global/empty/empty-state-funnel";
import UserBtn from "@/app/(landing)/_components/navbar/user-btn";

type Props = {
  funnels: any[];
  templates: any[];
  userId: string;
};
const HomeComponent = ({ funnels, templates, userId }: Props) => {
  const [query, setQuery] = useState("");
  return (
    <div className="pb-7">
      <nav className="flex justify-between items-center bg-[#141414] sticky top-0 z-[40] md:py-7 md:px-7 py-5 px-5">
        <div className=" md:flex hidden items-center gap-2 rounded-full w-max ">
          <h3 className="text-white/70">Home</h3>
          <ChevronRight size={16} />
        </div>
        <div className="md:ml-0 ml-12 flex gap-3 w-full md:w-auto sm:justify-between justify-between">
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
          <Button
            size="sm"
            className="bg-main hover:bg-main/80 text-white w-28 md:flex hidden"
          >
            Template's
          </Button>
          <CreateProjectButton
            userId={userId}
            className="md:flex hidden"
          />
          <h1 className="text-2xl font-extrabold tracking-wider flex md:hidden">Azeorex</h1>
          <UserBtn
            size="md:h-8 h-9 md:w-8 w-9"
            margin="mt-2 z-[101] rounded-2xl"
            className=" overflow-hidden  min-w-fit rounded-full bg-gradient-to-br from-[#08C741] to-[#0F39C8] text-violet-200 text-[20px] font-semibold items-center justify-center outline-none border-none"
          ></UserBtn>
        </div>
      </nav>
      <section className="mb-4 md:mb-6 md:px-7 px-5 sm:block hidden">
        <div className="bg-[#ffffff08] rounded-xl p-6 flex gap-3 items-center">
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
      <section className="text-3xl mb-4 md:px-7 px-5 font-semibold sm:hidden">
        {/* <p>Hello Sayan</p>
        <p className="text-violet-400">Start your journey.</p> */}
        <div className="flex items-center h-9 bg-[#2d2f33] hover:bg-[#242529] rounded-md border border-[#545454]/30 w-full ">
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
      </section>

      <section className="mb-6 md:px-7 px-5">
        {funnels.length === 0 ? (
          <EmptyStatefunnel />
        ) : (
          <>
            <div className="xxl md:gap-x-6 gap-x-5 md:gap-y-7 gap-y-6 mt-5">
              {funnels
                .filter((item) => item.name.toLocaleLowerCase().includes(query))
                .slice(0, 5)
                .map((item) => {
                  return (
                    <Card
                      id={item.id}
                      title={item.name}
                      updatedAt={item.updatedAt}
                    />
                  );
                })}
            </div>
            <div className="flex items-center justify-center mt-6">
              <Link
                href={"/saas/projects"}
                className="px-3 py-1.5 flex items-center gap-3 rounded-full bg-[#1e1f22] text-[12px] text-zinc-500 hover:text-zinc-300 duration-200"
              >
                <p>See all projects</p>
                <ArrowRight size={13} />
              </Link>
            </div>
          </>
        )}
      </section>
      <section className="mb-6 md:px-7 px-5">
        <div className="flex items-center justify-between">
          {/* <h3 className="text-white/70">Templates</h3> */}
          <div className=" flex items-center gap-3 px-4 pl-1.5 py-1.5 rounded-full ">
            <div className=" rounded-full bg-white/10 borde border-white/10 overflow-hidden w-10 h-10">
              <Image
                src="/azeorex.png"
                className="w-full h-full"
                width={200}
                height={200}
                alt="figma"
              />
            </div>
            Azeorex Templates
          </div>
          <div className="flex items-center justify-end ">
            <Link
              href={"/saas/projects"}
              className="px-3 py-1.5 flex items-center gap-3 rounded-full bg-[#1e1f22] text-[12px] text-zinc-500 hover:text-zinc-300 duration-200"
            >
              <p>View all</p>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
        <div className="xxl md:gap-x-6 gap-x-5 md:gap-y-7 gap-y-6 mt-5">
          {templates
            .filter((item) => item.title.toLocaleLowerCase().includes(query))
            .slice(0, 5)
            .map((item) => {
              return <TemplateCard item={item} />;
            })}
        </div>
      </section>
      <section className="mb-6 md:px-7 px-5">
        <div className="flex items-center justify-between">
          {/* <h3 className="text-white/70">Templates</h3> */}
          <div className=" flex items-center gap-3 px-4 pl-1.5 py-1.5 rounded-full ">
            <div className=" rounded-full bg-white/10 borde border-white/10 p-[8px] w-10 h-10">
              <Image
                src="/platform/figma.png"
                className="w-full h-full"
                width={200}
                height={200}
                alt="figma"
              />
            </div> 
            Figma Templates
          </div>
          <div className="flex items-center justify-end">
            <Link
              href={"/saas/projects"}
              className="px-3 py-1.5 flex items-center gap-3 rounded-full bg-[#1e1f22] text-[12px] text-zinc-500 hover:text-zinc-300 duration-200"
            >
              <p>View all</p>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
        <div className="xxl md:gap-x-6 gap-x-5 md:gap-y-7 gap-y-6 mt-5">
          {templates
            .filter((item) => item.title.toLocaleLowerCase().includes(query))
            .slice(0, 5)
            .map((item) => {
              return (
                <TemplateCard
                  // id={item.id}
                  // title={item.name}
                  // updatedAt={item.updatedAt}
                  item={item}
                />
              );
            })}
        </div>
      </section>
    </div>
  );
};

export default HomeComponent;
