import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

const page = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-zinc-900">
      <Card className="flex flex-col items-center justify-center p-4 w-[380px]">
        <h3 className="text-2xl font-bold border-b w-full text-center pb-4">Success</h3>
        <p className="text-gray-400 text-center">
          Thank you for your purchase, now you can start using our services. Go to
          <Link
            href="/dashboard"
            className="text-blue-500 underline ml-2"
          >
            Dashboard
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default page;
