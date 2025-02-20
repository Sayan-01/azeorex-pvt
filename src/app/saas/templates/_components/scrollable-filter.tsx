import { category } from "@/constants/azeorex-landing-page";
import React from "react";

const ScrollableFilter = ({ filterQuery, setFilterQuery }: { filterQuery: string; setFilterQuery: any }) => {
  return (
    <div className=" w-full md:mb-6 mb-5 flex items-center md:gap-4 gap-4 overflow-x-auto box">
      {category.map((item) => {
        return (
          <button
            onClick={() => setFilterQuery(item.value)}
            className={`md:border-2 border w-fit whitespace-nowrap md:px-4 px-3 md:py-3 py-2 rounded-xl text-white/60 text-xs ${filterQuery === item.value ? "border-blue-500" : ""}`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default ScrollableFilter;
