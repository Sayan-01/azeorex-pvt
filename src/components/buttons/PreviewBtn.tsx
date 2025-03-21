"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import Image from "next/image";

type Props = {className?: string; children: React.ReactNode; preview: string | false};
const PreviewButton = ({ className, children, preview }:Props) => {
  return (
    <div className="bg-[#ffffff08] h-[42px] text-white rounded-lg flex items-center justify-center font-lg w-full">
      <Dialog>
        <DialogTrigger asChild>
          <button className={`${className}`}>{children}</button>
        </DialogTrigger>
        <DialogContent className="  md:w-[600px] sm:w-[400px] w-full md:h-[90%] h-full">
          {preview ? (
            <>
              <h1 className="text-2xl font-semibold">Preview Image</h1>
              <div className=" w-full h-full overflow-auto box">
                <Image
                  src={preview}
                  width={500}
                  height={0}
                  className="w-full h-auto border-2 border-white/20 rounded-xl"
                  alt="Preview"
                />
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <h1 className="md:text-2xl sm:text-lg text-sm font-semibold">No image provided for Preview</h1>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PreviewButton;
