"use client";
import EmptyStatefunnel from "@/components/global/empty/empty-state-funnel";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import Card from "../../_components/card";
import CreateProjectButton from "./create-project-button";
import Link from "next/link";
import Image from "next/image";
import UserBtn from "@/app/(landing)/_components/navbar/user-btn";
import { IoSearchOutline } from "react-icons/io5";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "../../_components/info-header";

type Props = { funnels: any[]; userId: string };
const ProjectComponent = ({ funnels, userId }: Props) => {
  const [query, setQuery] = useState("");

  return (
    <div className="pb-7 min-h-screen pt-[88px]">
      <Header>
        <div className=" md:flex items-center gap-2 rounded-full w-max hidden">
          <h3 className="text-white/70">Projects</h3> <ChevronRight size={16} />
        </div>
        <div className="md:mr-0 mr-[52px] flex gap-3 w-full md:w-auto sm:justify-between justify-between">
          <div className="items-center h-8 ml-2 bg-[#2d2f33] hover:bg-[#242529] rounded-md border border-[#545454]/30 w-auto md:flex hidden">
            <div className="h-full  pl-2 rounded-l-md flex items-center text-white/60">
              <IoSearchOutline size={18} />
            </div>
            <input
              className="h-full bg-transparent rounded-r-md px-2 text-xs max-w-[210px]  w-full outline-none border-none"
              type="text"
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
              placeholder="Search..."
            />
          </div>
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
        </div>
      </Header>
      <section className="mb-4 md:mb-6 md:px-7 px-5">
        <div className="bg-[#ffffff08] rounded-xl p-4 flex gap-3 items-center">
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
              strokeLinejoin="round"
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
          </p>
        </div>
      </section>
      <div className="my-8 md:px-7 px-5 hidden ml-2 md:flex items-center ">
        <div>
          <h1 className=" text-2xl font-semibold">Your Projects</h1>
          <p className=" text-zinc-400 text-sm mt-1">All of your letest project in one palce, explore</p>
        </div>
        
      </div>
      <section className="text-3xl mb-4 md:px-7 px-5  sm:hidden flex flex-col items-center">
        <h1 className="text-center font-bold text-2xl mb-2 mt-7">All Projects</h1>
        <p className="text-center text-sm mb-5 opacity-60 w-[90%]">The best azeorex and figma templates and websites from Azeorex community.</p>{" "}
        <div className="flex items-center h-11 bg-[#2d2f33] hover:bg-[#242529] rounded-full border border-[#545454]/30 w-full px-2">
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
      </section>
      <section className="mb-6 md:px-7 px-5">
        {funnels.length === 0 ? (
          <EmptyStatefunnel />
        ) : (
          <div className="xxl md:gap-x-7 gap-x-5 md:gap-y-7 gap-y-6">
            {funnels
              .filter((item) => item.name.toLocaleLowerCase().includes(query))
              .map((item) => {
                return (
                  <Card
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    updatedAt={item.updatedAt}
                    description={item.description}
                    subDomainName={item.subDomainName}
                    favicon={item.favicon}
                  />
                );
              })}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProjectComponent;
