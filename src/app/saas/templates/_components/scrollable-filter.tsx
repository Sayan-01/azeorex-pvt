import { category } from "@/constants/azeorex-landing-page";
import React from "react";

const ScrollableFilter = ({ filterQuery, setFilterQuery }: { filterQuery: string; setFilterQuery: any }) => {
  return (
    <div className=" w-full mb-6 flex items-center gap-4 overflow-x-auto box">
      {category.map((item) => {
        return (
          <button
            onClick={() => setFilterQuery(item.value)}
            className={`border-2 w-fit whitespace-nowrap px-4 py-3 rounded-xl text-white/60 text-xs ${filterQuery === item.value ? "border-blue-500" : ""}`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default ScrollableFilter;
