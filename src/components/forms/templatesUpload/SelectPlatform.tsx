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
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8">
      {platform.map((item) => {
        return (
          <div
            key={item.id}
            className="cursor-pointer"
          >
            <Card
              className={value.includes(item.name) ? "border-green-400 border-2 duration-150" : "border-2"}
              onClick={() => handlePlatformClick(item.name)}
            >
              <CardHeader className="flex-row items-center gap-5 space-y-0 ">
                <Image
                  src={item.image}
                  width={400}
                  height={400}
                  className={`w-6 h-6 ${item.name === "figma" ? "" : "rounded-full"}`}
                  alt={item.title}
                />
                <span>{item.title}</span>
              </CardHeader>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default SelectPlatform;
