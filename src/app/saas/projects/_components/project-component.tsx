"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import CreateProjectButton from "./CreateProjectButton";
import Card from "../../_components/card";
import { IoIosSearch } from "react-icons/io";
import { ChevronRight } from "lucide-react";
type Props = {
  funnels: any[];
  userId: string;
};
const ProjectComponent = ({ funnels, userId }: Props) => {
  const [query, setQuery] = useState("");
  return (
    <div className="">
      <nav className="flex justify-between items-center">
        <div className=" flex items-center gap-2 rounded-full w-max">
          <h3 className="text-white/70">Projects</h3> <ChevronRight size={16} />
        </div>
        <div className=" flex gap-3">
          <div className="flex items-center h-8 bg-[#2d2f33] hover:bg-[#242529] rounded-md border border-[#545454]/30">
            <div className="h-full  pl-2 rounded-l-md flex items-center text-white/60">
              <IoIosSearch size={18} />
            </div>
            <input
              className="h-full bg-transparent rounded-r-md px-2 text-xs w-[210px] outline-none border-none"
              type="text"
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
              placeholder="Search..."
            />
          </div>

          <Button
            size="sm"
            className="bg-main hover:bg-main/80 text-white w-28"
          >
            Template's
          </Button>
          <CreateProjectButton userId={userId} />
        </div>
      </nav>
      <section className="my-7">
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
          <p className="flex gap-3 items-center text-[13px] text-zinc-500">
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
      <section>
        <div className="grid grid-cols-5 gap-6">
          {funnels
            .filter((item) => item.name.toLocaleLowerCase().includes(query))
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
      </section>
    </div>
  );
};

export default ProjectComponent;
