'use client'
import React from "react";

import { useRouter } from "next/navigation";
import { Sign_Out } from "../../../server/auth";

const VerifyBtn = () => {
  const router = useRouter() 
  const verifyUser = async () => {
    await Sign_Out()
    router.push("/auth/register")
  };
  return (
    <>
      <p className="text-blue-700">
        <button
          onClick={verifyUser}
          className="underline"
        >
          verify?
        </button>
      </p>
    </>
  );
};

export default VerifyBtn;
