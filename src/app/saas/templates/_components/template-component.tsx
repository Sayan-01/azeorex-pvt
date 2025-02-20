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

type Props = {
  templates: any[];
};
const TemplateComponent = ({ templates }: Props) => {
  const [query, setQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  console.log(templates);

  return (
    <div className="pb-7">
      <nav className="flex justify-between items-center">
        <div className=" md:flex items-center gap-2 rounded-full w-max hidden">
          <h3 className="text-white/70">Templates</h3>
          <ChevronRight size={16} />
        </div>
        <div className="md:ml-0 ml-11 flex gap-3">
          <div className="flex items-center h-8 bg-[#2d2f33] hover:bg-[#242529] rounded-md border border-[#545454]/30">
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
          <CreatorBtn className="md:flex hidden"/>
          
        </div>
      </nav>
      <section className="my-7 mb-6">
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
      <ScrollableFilter
        filterQuery={filterQuery}
        setFilterQuery={setFilterQuery}
      />
      <section>
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3  gap-6">
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
