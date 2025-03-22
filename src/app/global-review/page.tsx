import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Header from "../(landing)/_components/home/Header";
import Link from "next/link";
import { Paytone_One, Poppins } from "next/font/google";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { emailsend } from "../../../server/contact";
import GlobalReviewForm from "@/components/forms/global-review-form";

const popp = Poppins({ subsets: ["latin"], weight: "600" });

// Icons
const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="84"
    height="84"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="0"
    strokeLinecap="round"
    strokeLinejoin="round"
    // className="text-orange-400"
  >
    <path
      d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
      fill="url(#heart-gradient)"
    />
    <defs>
      <linearGradient
        id="heart-gradient"
        x1="2"
        y1="3"
        x2="22"
        y2="20"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset="0%"
          stopColor="#ff5e62"
        />
        <stop
          offset="50%"
          stopColor="#ff9966"
        />
        <stop
          offset="100%"
          stopColor="#7661ff"
        />
      </linearGradient>
    </defs>
  </svg>
);

const AttachIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
);

const ImportIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3v12" />
    <path d="m8 11 4 4 4-4" />
    <path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m5 12 7-7 7 7" />
    <path d="M12 19V5" />
  </svg>
);

const LovableLandingPage: React.FC = () => {
  

  return (
    <div className="h-screen bg-black text-white">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center px-4 py-16 text-center sm:mt-[95px] mt-[75px]">
        <div className="mb-8">
          {/* <HeartIcon /> */}
        </div>
        <h1 className={`text-4xl md:text-4xl font-bold mb-6 ${popp.className}`}>Give review to improve our app</h1>
        <p className="text-xl mb-8 text-gray-300 flex items-center gap-2">
          Azeorex is full stack no-code saas solution.{" "}
          <Link
            href={"#"}
            className="text-blue-500"
          >
            Start for free today.
          </Link>
        </p>

        {/* Input Section */}
        <div className="w-full max-w-3xl mb-8">
          <Card className="bg-gray-800 border-0 shadow-lg">
            <div className="p-3">
              <GlobalReviewForm/>
              
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap justify-center gap-3 mb-24">
          {["AI image generator", "Remotion video", "Fitness tracker", "Task manager"].map((item) => (
            <Button
              key={item}
              variant="outline"
              className="bg-gray-900 border-gray-700 text-white rounded-full hover:bg-gray-800"
            >
              {item}
              <ArrowUpIcon />
            </Button>
          ))}
        </div>

        {/* Footer Section */}
        <div className="mt-2 flex flex-col items-center">
          <div className="mb-4">
            <p className="text-xl font-medium">Join 140,000+ people using Lovable</p>
          </div>
          <div className="flex -space-x-3 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gray-600 border-2 border-black"
              ></div>
            ))}
          </div>
          <div className="flex items-center space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="orange"
                stroke="orange"
                strokeWidth="0"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex flex-col items-center">
              <div className="text-xl font-bold">WIRED</div>
              <div className="text-sm text-gray-400">Hottest startups of 2024</div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">P</div>
              <div className="ml-2">
                <div className="text-lg font-bold">4.9 / 5.0</div>
                <div className="text-sm text-gray-400">150 reviews</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LovableLandingPage;
