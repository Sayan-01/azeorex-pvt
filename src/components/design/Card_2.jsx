import Image from "next/image";
import React from "react";

const Card_2 = () => {
  return (
    <>
      <div className="flex flex-col w-full  bg-black-100 rounded-[16.42px] border border-black-200 p-4">
        <div className="">
          <Image
            src="/demo.png"
            height={200}
            width={300}
            alt="image"
            className="w-full aspect-[4/3] rounded-[14px]"
          />
        </div>
        <div className="text-white mt-5">
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-slate-50 rounded-full"></div>
              <div
                id="name"
              >
                Souvik Adak
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div
                id="name2"
                className="text-lg"
              >
                like
              </div>
              <div
                id="name3"
                className="text-lg"
              >
                seen
              </div>
            </div>
          </div>
          <div className="mt-2">
            <h2 className="text-[18px] font-semibold ">Dark mode Portfolio</h2>
            <p className=" text-white/70 text-[15px] my-[6px]">This is a good for mak hsd aeue ...</p>
          </div>
          <div className="mt-4">
            <h6 className='text-sm text-right opacity-40'>
              Added May 17, 2024
            </h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card_2;
