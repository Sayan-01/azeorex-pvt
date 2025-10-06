import React from "react";
import { theme } from "@/constants/azeorex-landing-page";
import { Card, CardHeader } from "@/components/ui/card";

const SelectTheme = ({ value, onChange }: { value: string; onChange: (arg0: string) => void }) => {
  return (
    <div className="w-full grid grid-cols-3 gap-4">
      {theme.map((item) => {
        return (
          <div
            key={item.id}
            className=" cursor-pointer rounded-xl"
          >
            <div
              className={value == item.name ? "border-green-500 bg-green-500/10 border-2 duration-150 rounded-xl" : "border-2 rounded-xl"}
              onClick={() => onChange(item.name)}
            >
              <div className="flex items-center justify-center  gap-2 w-full h-12 text-sm">
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

export default SelectTheme;
