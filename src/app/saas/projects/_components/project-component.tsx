"use client";
import EmptyStatefunnel from "@/components/global/empty/empty-state-funnel";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import Card from "../../_components/card";
import CreateProjectButton from "./CreateProjectButton";
type Props = {
  funnels: any[];
  userId: string;
};
const ProjectComponent = ({ funnels, userId }: Props) => {
  const [query, setQuery] = useState("");
  return (
    <div className="pb-7">
      <nav className="flex justify-between items-center bg-[#141414] sticky top-0 z-[40] md:py-7 md:px-7 py-5 px-5">
        <div className=" md:flex items-center gap-2 rounded-full w-max hidden">
          <h3 className="text-white/70">Projects</h3> <ChevronRight size={16} />
        </div>
        <div className="md:ml-0 ml-12 flex gap-3 w-full md:w-auto">
          <div className="flex items-center md:h-8 h-9 bg-[#2d2f33] hover:bg-[#242529] rounded-md border border-[#545454]/30 w-full">
            <div className="h-full  pl-2 rounded-l-md flex items-center text-white/60">
              <IoIosSearch size={18} />
            </div>
            <input
              className="h-full bg-transparent rounded-r-md px-2 text-xs md:w-[210px] w-full outline-none border-none"
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
        </div>
      </nav>
      <section className="mb-4 md:mb-6 md:px-7 px-5">
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

      <section className="mb-6 md:px-7 px-5">
        {funnels.length === 0 ? (
          <EmptyStatefunnel />
        ) : (
          <div className="xxl md:gap-x-6 gap-x-5 md:gap-y-7 gap-y-6 mt-5">
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
        )}
      </section>
    </div>
  );
};

export default ProjectComponent;
