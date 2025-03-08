import React from "react";
import { access } from "@/constants/menus";
import { Card, CardHeader } from "@/components/ui/card";

const SelectAccess = ({value, onChange}:{value: string, onChange: (arg0: string)=> void}) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2  gap-8">
      {access.map((item) => {
        return (
          <div
            key={item.id}
            className=" cursor-pointer"
          >
            <Card
              className={value == item.name ? "border-green-400 border-2 duration-150" : "border-2"}
              onClick={() => onChange(item.name)}
            >
              <CardHeader className="flex-row items-center gap-5 space-y-0 ">
                <span>{item.image}</span>
                <span>{item.title}</span>
              </CardHeader>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default SelectAccess;
