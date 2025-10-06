import React from "react";
import { access } from "@/constants/menus";
import { Card } from "@/components/ui/card";

const SelectAccess = ({value, onChange}:{value: string, onChange: (arg0: string)=> void}) => {
  return (
    <div className="w-full grid grid-cols-2 gap-4">
      {access.map((item) => {
        return (
          <div
            key={item.id}
            className=" cursor-pointer rounded-xl"
          >
            <div
              className={value == item.name ? "border-green-500 bg-green-500/10 border-2 duration-150 rounded-xl" : "border-2 rounded-xl"}
              onClick={() => onChange(item.name)}
            >
              <div className="flex items-center justify-center text-sm gap-2 w-full h-12 ">
                <span className="sm:block hidden">{item.image}</span>
                <span>{item.title}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SelectAccess;
