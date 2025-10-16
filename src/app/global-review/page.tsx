import GlobalReviewForm from "@/components/forms/global-review-form";
import { Card } from "@/components/ui/card";
import { Poppins } from "next/font/google";
import Link from "next/link";
import React from "react";
import Header from "../(landing)/_components/home/Header";
import SpotLight from "@/components/design/SpotLight";

const popp = Poppins({ subsets: ["latin"], weight: "600" });

const LovableLandingPage: React.FC = () => {
  return (
    <div className="h-screen bg-[#141414] text-white ">
      {/* Navigation */}
      <div className="w-full border-b-2 border-dashed border-zinc-600">
        <Header />
      </div>
      
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center px-4 py-16 text-center sm:mt-[95px] mt-[75px] relative z-10">
        <div className="mb-8">{/* <HeartIcon /> */}</div>
        <h1 className={`text-4xl md:text-4xl font-bold mb-4 ${popp.className}`}>Give review to improve our app</h1>
        <p className="text-base mb-8 text-gray-300 flex items-center gap-2">
          Azeorex is full stack no-code saas solution.{" "}
          <Link
            href={"/saas/projects"}
            className="text-blue-500"
          >
            Start for free today.
          </Link>
        </p>

        {/* Input Section */}
        <div className="w-full max-w-3xl mb-8">
          <Card className="bg-zinc-800 border-2 border-dashed border-zinc-600 shadow-lg">
            <div className="px-5">
              <GlobalReviewForm />
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default LovableLandingPage;
