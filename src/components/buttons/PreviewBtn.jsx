"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import Image from "next/image";

const PreviewButton = ({ className, children, fileUrl, preview }) => {
  return (
    <div className="bg-black-100 border border-white/10 h-[42px] text-white rounded-lg flex items-center justify-center font-lg w-full">
      <Dialog className="w-full">
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
            <div>
              <h1 className="text-2xl font-semibold">No image provided for Preview</h1>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PreviewButton;
