"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { platform } from "@/constants/menus";
import Image from "next/image";
import React, { useState } from "react";

const SelectPlatform = ({ value, onChange }: { value: string[]; onChange: any }) => {
  const handlePlatformClick = (name: string) => {
    onChange((prevPlatforms: string[]) => {
      if (prevPlatforms.includes(name)) {
        return prevPlatforms.filter((platform) => platform !== name);
      } else {
        return [...prevPlatforms, name];
      }
    });
  };

  return (
    <div className="w-full grid grid-cols-2 gap-4">
      {platform.map((item) => {
        return (
          <div
            key={item.id}
            className=" cursor-pointer rounded-full"
          >
            <div
              className={value.includes(item.name) ? "border-green-500 bg-green-500/10 border-2 duration-150 rounded-full" : "border-2 rounded-full"}
              onClick={() => onChange(item.name)}
            >
              <div className="flex items-center justify-center text-sm gap-2 w-full h-9 ">
                <Image
                  src={item.image}
                  width={400}
                  height={400}
                  className={`w-5 h-5 ${item.name === "figma" ? "" : "rounded-full"}`}
                  alt={item.title}
                />
                <span>{item.title}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SelectPlatform;
