import Heading from "@/components/design/Heading";
import Wrapper from "@/components/design/Wrapper";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { IoSend } from "react-icons/io5";

type Comments = {
  id: number;
  comment: string;
  avatar: string;
  name: string;
};

const ReviewSection = () => {
  const comments: Comments[] = [
    {
      id: 1,
      comment:
        "Their website builder is incredibly easy to use, with stunning templates and seamless customization. No coding needed, and customer support is fantastic. A perfect solution for quick, professional websites! Highly recommended!",
      avatar: "",
      name: "sumonykoloy",
    },
    {
      id: 2,
      comment: "Azeorex delivers high-quality, modern, and customized websites. Fast, reliable, and professional—perfect for businesses and freelancers. Highly recommended!",
      avatar: "",
      name: "ankanmistry",
    },
    {
      id: 3,
      comment:
        "I built my website effortlessly using their no-code platform. It offers advanced features, responsive designs, and seamless integrations. Perfect for freelancers and businesses looking for a reliable and hassle-free website solution!",
      avatar: "",
      name: "jeetbose",
    },
  ];
  return (
    <div className="mt-40">
      <Wrapper className="flex flex-col items-center">
        <Heading
          h3={"-: Journey :-"}
          h1={"Lovable Review"}
          p={"Hear from our happy clients about our fast, reliable, and high-quality website services and solutions."}
        />
        <div className="mt-20 grid grid-cols-3 gap-6">
          {comments.map((item) => {
            return (
              <div
                key={item.id}
                className="z-10 card p-6 w-full max-w-[490px] h-60 relative rounded-2xl border border-bor-100 bg-gradient-to-r from-[#04071d]/80 to-[#0d1027]/80 overflow-hidden flex flex-col justify-between"
              >
                <div>"{item.comment}"</div>
                <div className="flex items-center gap-4 mt-5">
                  <div className="w-10 h-10 rounded-full bg-white/10"></div>
                  <div>
                    <p className="text-white/60">@{item.name}</p>
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <Link href={'/reviews'} className="flex items-center gap-3 hover:gap-4 duration-200 mt-4 opacity-40 hover:opacity-80 cursor-pointer">
          click to see All reviews <MoveRight size={15}/>
        </Link>
      </Wrapper>
    </div>
  );
};

export default ReviewSection;
