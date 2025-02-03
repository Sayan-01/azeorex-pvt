"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { RiLoader2Line } from "react-icons/ri";

type Props = {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
  url?: string;
  onClick?: () => void;
  blue?: boolean;
  bigBlue?: boolean;
  loadingText?: string;
  loadingBtn?: boolean;
};

const Button = ({ children, dark, className, url, onClick, blue, bigBlue, loadingText = "Loading...", loadingBtn }: Props) => {
  const [load, setLoad] = useState(false);

  if (url) {
    return (
      <Link
        href={url}
        className="z-[30]"
      >
        <button
          onClick={onClick}
          className={cn(
            " z-[30] bg-gradient-to-tl from-bcgc-200/20 to-bcgc-100/20 backdrop-blur-lg  flex  px-[40px] md:py-[20px] py-[16.5px] md:text-[16px] text-[14px] sm:text-[14px]  items-center justify-center border-2 border-[#6971a2]/30 rounded-[14px]",
            className
          )}
        >
          {children}
        </button>
      </Link>
    );
  } else if (blue) {
    return (
      <>
        <button
          onClick={onClick}
          className={cn("z-[30] rounded-full bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow dark:hover:bg-blue-600/10 dark:hover:bg-b ", className)}
        >
          {children}
        </button>
      </>
    );
  } else if (bigBlue) {
    return (
      <>
        <button
          onClick={() => {
            setLoad(true);
          }}
          disabled={load}
          className={cn(
            "duration-200 z-[30] rounded-xl bg-blue-600 px-6 py-4 text-[16px] font-medium text-white shadow dark:hover:bg-blue-600/10 dark:hover:bg-b flex items-center justify-center",
            className
          )}
        >
          {load ? (
            <>
              <RiLoader2Line className="mr-2 size-4 animate-spin" />
              {loadingText}
            </>
          ) : (
            children
          )}
        </button>
      </>
    );
  } else if (loadingBtn) {
    return (
      <button
        onClick={() => {
          setLoad(true);
        }}
        disabled={load}
        className={cn("z-[30] h-10 px-4 flex items-center justify-center ", className)}
      >
        {load ? (
          <>
            <RiLoader2Line className="mr-2 size-4 animate-spin" />
            {loadingText}
          </>
        ) : (
          children
        )}
      </button>
    );
  } else
    return (
      <button
        onClick={onClick}
        className={cn(
          "z-[30] bg-gradient-to-tl from-bcgc-200 to-bcgc-100 flex  px-[40px] md:py-[20px] py-[16.5px] md:text-[16px] text-[14px] w-full md:w-[180px] items-center justify-center border-2 border-[#6971a2]/30 rounded-[14px] ",
          className
        )}
      >
        {children}
      </button>
    );
};

export default Button;
