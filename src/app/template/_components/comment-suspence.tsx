import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CommentSuspence = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div>
          <Skeleton className="w-[200px] h-4 rounded-full mb-1.5" />
          <Skeleton className="w-[80px] h-3 rounded-full mb-4" />
          <Skeleton className="sm:w-[600px] w-[240px] h-4 rounded-full mb-2" />
          <Skeleton className="sm:w-[400px] w-[80%] h-4 rounded-full" />
        </div>
      </div>
      <div className="flex gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div>
          <Skeleton className="w-[200px] h-4 rounded-full mb-1.5" />
          <Skeleton className="w-[80px] h-3 rounded-full mb-4" />
          <Skeleton className="sm:w-[600px] w-[240px] h-4 rounded-full mb-2" />
          <Skeleton className="sm:w-[400px] w-[80%] h-4 rounded-full" />
        </div>
      </div>
      <div className="flex gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div>
          <Skeleton className="w-[200px] h-4 rounded-full mb-1.5" />
          <Skeleton className="w-[80px] h-3 rounded-full mb-4" />
          <Skeleton className="sm:w-[600px] w-[240px] h-4 rounded-full mb-2" />
          <Skeleton className="sm:w-[400px] w-[80%] h-4 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default CommentSuspence;
