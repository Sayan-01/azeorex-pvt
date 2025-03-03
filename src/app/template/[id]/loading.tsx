import Wrapper from "@/components/design/Wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div>
      <Wrapper className="flex lg:flex-row flex-col-reverse items-start min-h-screen w-full sm:py-[150px] py-[135px]">
        <div className="w-full ">
          <Skeleton className="w-full aspect-[10/7] rounded-xl mb-5" />
          <Skeleton className="w-48 h-10 mb-3 rounded-lg" />
        </div>
        <div className="w-full lg:w-[90%] lg:pl-[80px]">
          <Skeleton className="w-[80%] h-12 mb-3 rounded-lg" />
          <Skeleton className="w-full h-5 mb-3 rounded-lg" />
          <Skeleton className="w-[60%] h-5 mb-4 rounded-lg " />
          <Skeleton className="w-24 h-12 mb-4 rounded-lg" />
          <div className="flex gap-5 mb-5">
            <Skeleton className="w-full h-10 rounded-lg" /> <Skeleton className="w-full h-10 rounded-lg" />
          </div>
          <Skeleton className="w-40 h-8 mb-4 rounded-lg" />
          <Skeleton className="w-[55%] h-5 mb-3 rounded-lg" />
          <Skeleton className="w-[50%] h-5 mb-3 rounded-lg" />
          <Skeleton className="w-[65%] h-5 mb-3 rounded-lg" />
          <div className="flex gap-5 mb-5 lg:mb-0">
            <Skeleton className="w-12 h-12 rounded-full" />
            <Skeleton className="w-12 h-12 rounded-full" />
            <Skeleton className="w-12 h-12 rounded-full" />
            <Skeleton className="w-12 h-12 rounded-full" />
          </div>
        </div>
      </Wrapper>
    </div>
  );
}; 

export default loading;
