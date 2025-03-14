import UserBtn from "@/app/(landing)/_components/navbar/user-btn";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import CreateProjectButton from "../projects/_components/create-project-button";
import { auth } from "../../../../auth";

const page = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  return (
    <div className="pb-7">
      <nav className="flex justify-between items-center bg-[#141414] sticky top-0 z-[40] md:py-7 md:px-7 py-5 px-5">
        <div className=" md:flex items-center gap-2 rounded-full w-max hidden">
          <h3 className="text-white/70">Intelligence</h3> <ChevronRight size={16} />
        </div>
        <div className="md:mr-0 mr-[52px] flex gap-3 w-full md:w-auto sm:justify-between justify-between">
          <div className="items-center h-8 ml-2 bg-[#2d2f33] hover:bg-[#242529] rounded-md border border-[#545454]/30 w-full md:flex hidden">
            <div className="h-full  pl-2 rounded-l-md flex items-center text-white/60">
              <IoSearchOutline size={18} />
            </div>
            <input
              className="h-full bg-transparent rounded-r-md px-2 text-xs md:w-[210px] w-full outline-none border-none"
              type="text"
              // onChange={(e) => setQuery(e.target.value.toLowerCase())}
              placeholder="Search..."
            />
          </div>
          <div className="md:hidden flex md:items-center md:gap-12 w-[146px] gap-[12px]">
            <UserBtn
              size="md:h-8 h-9 md:w-8 w-9"
              margin="mt-2 z-[101] rounded-2xl"
              className=" overflow-hidden  min-w-fit rounded-full bg-gradient-to-br from-[#08C741] to-[#0F39C8] text-violet-200 text-[20px] font-semibold items-center justify-center outline-none border-none "
            ></UserBtn>
            <Link
              className=" flex items-center opacity-80"
              href="/"
            >
              <Image
                src="/logo.svg"
                height={400}
                width={400}
                className="w-[132px]"
                alt="logo"
              />
            </Link>
          </div>
          <Button
            size="sm"
            className="bg-main hover:bg-main/80 text-white w-28 md:flex hidden"
          >
            Template's
          </Button>
          <CreateProjectButton
            userId={userId}
            className="md:flex hidden"
          />
        </div>
      </nav>
      <section className="flex items-center flex-col w-full max-w-3xl mx-auto  mt-8">
        <div className="w-full mb-6">
          <div className="flex items-center justify-start ">
            <Link
              href={"/saas/projects"}
              className="px-3 py-1.5 flex items-center gap-2 rounded-full bg-[#1e1f22] text-[12px] text-zinc-500 hover:text-zinc-300 duration-200"
            >
              <ArrowLeft size={13} />
              <p>Back</p>
            </Link>
          </div>
        </div>
        <h1 className="text-3xl font-semibold">
          Generate with <span className="text-orange-300">Creative AI</span>
        </h1>
        <p className="text-sm opacity-60 mt-1">What would like to create today</p>
        <div className="h-16 w-full rounded-xl bg-[#ffffff08] mt-6"></div>
      </section>
    </div>
  );
};

export default page;
