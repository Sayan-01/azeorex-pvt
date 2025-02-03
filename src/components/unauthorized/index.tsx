import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Unauthorized = () => {
  return (
    <div className=" w-full h-screen flex items-center justify-center flex-col gap-2">
      <h2 className=" text-4xl">Unauthorized access!</h2>
      <p className="mb-4">Please contact support or your agency owner to get access</p>
      <Link href={"/"}>
        <Button className=" bg-blue-500 text-white hover:bg-blue-700">Back to Home</Button>
      </Link>
    </div>
  );
};

export default Unauthorized;
