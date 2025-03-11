import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Unauthorized = () => {
  return (
    <div className=" w-full h-screen flex items-center justify-center flex-col gap-2 px-6">
      <h2 className=" md:text-4xl sm:text-2xl text-2xl">Unauthorized access!</h2>
      <p className="mb-4 sm:text-base text-sm text-center">Please contact support or your login to get project or home page access</p>
      <Link href={"/"}>
        <Button className=" bg-blue-500 text-white hover:bg-blue-700">Back to Home</Button>
      </Link>
    </div>
  );
};

export default Unauthorized;
