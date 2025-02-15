"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Card from "../../_components/card";
import { IoIosSearch } from "react-icons/io";
import { MoveRight } from "lucide-react";
import TemplateCard from "@/components/design/TemplateCard";
import ScrollableFilter from "./scrollable-filter";
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
        <div className=" flex items-center gap-3 rounded-full w-max">
          <h3 className="text-white/70">Home</h3>
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
          <Button
            size="sm"
            className={"bg-blue-500 hover:bg-blue-500/80 text-white items-center flex gap-2"}
          >
            Became a creator <MoveRight size={15} />
          </Button>
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
      <ScrollableFilter
        filterQuery={filterQuery}
        setFilterQuery={setFilterQuery}
      />
      <section>
        <div className="grid grid-cols-5 gap-6">
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
