"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { IoSearchOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";

const SearchBar = ({className}) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputHandler = (e) => {
    e.preventDefault();
    router.push(`/templates/products/search/${query}`);
  };
  return (
    <form
      onSubmit={inputHandler}
      className={cn("w-full h-full flex items-center relative", className)}
    >
      <Input
        className=" h-full m-0 py-3 px-5 rounded-full border-bor-200 bg-black-200 text-white/60"
        placeholder="Search here"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
      />
      <button
        className="absolute right-[5px] w-10 h-10 flex items-center justify-center "
        type="submit"
      >
        <IoSearchOutline size={20} />
      </button>
    </form>
  );
};

export default SearchBar;
