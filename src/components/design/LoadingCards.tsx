import React from "react";
import { Skeleton } from "../ui/skeleton";

const LoadingCards = () => {
  return (
    <div>
      <Skeleton className="w-full aspect-[4/2.8] mb-3 rounded-xl" />
      <Skeleton className="h-5 w-32 mb-3" />
      <Skeleton className="h-4 w-[90%] mb-3" />
    </div>
  );
};

export default LoadingCards;
