import Wrapper from "@/components/design/Wrapper";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import { GoPerson } from "react-icons/go";
import { LuInfo } from "react-icons/lu";
import { RiAtLine } from "react-icons/ri";
import { TbReportSearch } from "react-icons/tb";

import { FaRegFileAlt } from "react-icons/fa";
import { MdAdsClick, MdAlternateEmail, MdOutlineEmail, MdOutlineFileDownload, MdOutlinePayment } from "react-icons/md";
import Link from "next/link";
import CopyButton from "@/components/buttons/CopyButton";
import PreviewButton from "@/components/buttons/PreviewBtn";
// import { Template } from "@prisma/client";
import TemplateCard from "@/components/design/TemplateCard";
import { searchSimilerProduct, temToProject } from "@/lib/queries";
import { template } from "lodash";
import BuyButtton from "@/components/buttons/BuyButtton";
import { Eye, Heart, MessageSquareMore, MoveRight, Star } from "lucide-react";
import CommentSection from "../_components/comments-section";
import { User } from "@prisma/client";
import LikeButton from "@/components/buttons/LikeButton";
import { auth } from "../../../../auth";

interface Template {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  theme: string;
  category: string[];
  access: string;
  price: number;
  platform: string[];
  feature: string[];
  image: string[];
  file: string | null;
  datePublished: Date;
  userId: string;
  likes: number;
  dislikes: number;
  User: User;
  likesArray: string[];
}

const getTemplateData = async (id: string): Promise<Template> => {
  let data = await fetch(`${process.env.NEXT_URL}/api/products/${id}`, { cache: "no-store" });
  if (!data.ok) throw new Error("Failed to fetch template");
  const res = await data.json();
  return res;
};

const similer_product = async (category: string) => {
  const res = await searchSimilerProduct(category);
  return res;
};

const page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const session = await auth();
  const { id } = params;
  const oneTemplate = await getTemplateData(id);

  const similerProduct = await similer_product(oneTemplate.category[0]);

  function formatNumber(input: number) {
    return parseFloat(`${input}`).toFixed(2);
  }

  const isLiked = !!oneTemplate.likesArray.includes(session?.user?.id as string);
  return (
    <>
      <div className="min-h-screen w-full bg-[#141414] sm:py-[95px] py-[75px] text-[15px]">
        <Wrapper>
          {/* route-path */}
          <p className="text-white/70 mb-6 mt-2 text-sm w-[85%] title_line">
            <Link href="/">Home</Link> / <Link href="/templates">templates</Link> / <span className="text-white">{oneTemplate.title}</span>
          </p>
          {/* top */}
          <div className="flex lg:flex-row flex-col-reverse items-start">
            {/* left */}
            <div className={"flex md:flex-[0.6] w-full flex-col"}>
              {/* left-top */}
              <div className={"w-full mx-auto relative"}>
                <Carousel>
                  <CarouselContent>
                    {oneTemplate?.image?.slice(0, 2).map((item, idx) => {
                      return (
                        <CarouselItem key={idx}>
                          <div className=" w-full mx-auto lg:mx-0">
                            <Image
                              className="w-full aspect-[10/6.5] object-cover object-top rounded-2xl"
                              src={item}
                              width={500}
                              height={500}
                              alt={oneTemplate.title + " " + idx}
                            ></Image>
                          </div>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                  <CarouselPrevious className={"ml-14"} />
                  <CarouselNext className={"mr-14"} />
                </Carousel>
                <div className="absolute right-3 bottom-3 bg-black-200 opacity-80 rounded-full p-2 border">
                  {oneTemplate.platform.includes("figma") ? (
                    <Image
                      src={"/platform/figma.png"}
                      width={100}
                      height={100}
                      alt="aximoris profile"
                      className="w-9 h-9 object-cover"
                    />
                  ) : (
                    <Image
                      src={"/azeorex.png"}
                      width={100}
                      height={100}
                      alt="aximoris profile"
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  )}
                </div>
              </div>
              {/* left-bottom */}
              <div className={"lg:w-full md:w-[60%] w-full mx-auto mt-10"}>
                <div>
                  <Heading>Long Description</Heading>
                  <p className="mb-10">{oneTemplate.longDescription}</p>
                  <Heading>Template Category</Heading>
                  <div className="mb-10">
                    {oneTemplate.category.map((i) => {
                      return <Badge key={i} className={"border rounded-lg mr-4 mb-4 py-2 bg-[#ffffff08]"}>{i}</Badge>;
                    })}
                  </div>
                  <Heading>Features</Heading>
                  <div className="mb-10">
                    {oneTemplate.feature?.map((i, idx) => {
                      return (
                        <div
                          key={idx}
                          className="p-5 py-4 rounded-xl my-4 bg-[#ffffff08]"
                        >
                          {i}
                        </div>
                      );
                    })}
                  </div>
                  <Heading>Support</Heading>
                  <div>
                    <ul className="">
                      <li className="flex items-center gap-4 mb-1">
                        <RiAtLine className="text-blue-500" /> Contact the design guy
                      </li>
                      <li className="flex items-center gap-4 mb-1">
                        <LuInfo className="text-blue-500" /> How those template works
                      </li>
                      <li className="flex items-center gap-4 mb-1">
                        <GoPerson className="text-blue-500" /> Get help from comunity
                      </li>
                      <li className="flex items-center gap-4 mb-1">
                        <TbReportSearch className="text-blue-500" /> Report this template
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* right */}
            <div className="lg:pl-[80px] lg:sticky sm:top-[115px] -mt-1 top-[70px] overflow-hidden flex md:flex-[0.4] w-full lg:w-[90%] md:flex-row  lg:flex-col  flex-col gap-x-10 mb-10 lg:mb-0 ">
              {/* part 1 */}
              <div className="w-full">
                <div className="w-full  mb-4 leading-none">
                  <h1 className="mb-5 font-semibold leading-tight sm:text-[32px] text-[30px] ">{oneTemplate?.title}</h1>
                  <p className="leading-tight sm:text-[16px] text-[14px] text-white/70 mb-5">{oneTemplate?.description}</p>
                  <div className="flex gap-5 mb-5 text-white/60">
                    <Image
                      src={"/star.svg"}
                      width={90}
                      height={40}
                      className="w-24 h-4"
                      alt="star"
                    />
                    <p>{"4.4 : 24 reviews >"}</p>
                  </div>
                </div>
                <div className="mb-4 font-semibold leading-tight sm:text-[30px] text-[30px] flex gap-5">
                  {oneTemplate.access === "Free" ? (
                    <p>Free</p>
                  ) : (
                    <>
                      <p>₹{formatNumber(oneTemplate.price * 50)}</p>
                      <p className=" line-through opacity-50 font-medium text-xl flex items-end">
                        <i>{Math.floor((oneTemplate.price * 50 * 120) / 100)}.00</i>
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* part 2 */}
              <div className="w-full">
                <div className="flex flex-col sm:flex-row gap-y-5 sm:gap-y-0 gap-x-5  mt-2">
                  {/* btn 1 */}
                  <BuyButtton oneTemplate={oneTemplate} />

                  <PreviewButton
                    className="w-full"
                    preview={oneTemplate?.image.length == 3 ? oneTemplate?.image[2] : false}
                  >
                    Preview
                  </PreviewButton>
                </div>

                <div className="bg-[#ffffff08] text-white p-4 rounded-xl mt-6">
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center space-x-3">
                      {/* Profile picture */}
                      <div className="relative h-10 w-10">
                        <Image
                          src={oneTemplate?.User?.avatarUrl || ""}
                          width={100}
                          height={100}
                          alt="aximoris profile"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </div>

                      {/* Author info */}
                      <div className="flex flex-col">
                        <span className="font-medium">{oneTemplate.User.name}</span>
                        <span className="text-sm text-gray-400">9778 followers</span>
                      </div>
                    </div>

                    {/* Stats section */}
                    <div className="flex items-center space-x-2 text-sm text-zinc-400">
                      {/* Views */}
                      <div className="flex items-center space-x-2 bg-zinc-800 rounded-full px-4 py-2">
                        <Eye size={18} />
                        <span>46K</span>
                      </div>

                      {/* Comments */}
                      <div className="flex items-center space-x-2 bg-zinc-800 rounded-full px-4 py-2">
                        <MessageSquareMore size={18} />
                        <span>169</span>
                      </div>

                      {/* Likes */}
                      <LikeButton
                        temId={params.id}
                        userId={session?.user?.id as string}
                        isLiked={isLiked}
                        totalLikes={oneTemplate.likes}
                      />
                    </div>
                  </div>
                </div>
                <p className="sm:text-[20px] text-[16px] text-white mt-6">How to Use Our Figma Template</p>
                <div className="flex sm:flex-row flex-col justify-between my-5">
                  <div className=" w-full">
                    <p className="opacity-50 mb-1.5 sm:mb-2  flex gap-2 items-center">
                      <MdAdsClick /> Press buy now Button
                    </p>
                    <p className="opacity-50 mb-1.5 sm:mb-2  flex gap-2 items-center">
                      <MdOutlinePayment /> Complete your payment
                    </p>
                    <p className="opacity-50 mb-1.5 sm:mb-2  flex gap-2 items-center">
                      <MdOutlineEmail /> Go to your gmail
                    </p>
                  </div>
                  <div className="w-full flex pr-5">
                    <div className="">
                      <p className="opacity-50 mb-1.5 sm:mb-2  flex gap-2 items-center">
                        <MdAlternateEmail /> See attach file on mail
                      </p>
                      <p className="opacity-50 mb-1.5 sm:mb-2  flex gap-2 items-center">
                        <MdOutlineFileDownload /> Download the file
                      </p>
                      <p className="opacity-50 mb-1.5 sm:mb-2  flex gap-2 items-center">
                        <FaRegFileAlt /> Open downloaded file
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* bottom */}
          <div className=" my-20 mb-10 relative">
            {/* heading */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">More Templates</h2>
              <div className="h-8 px-3 text-sm gap-2 flex items-center justify-center backdrop-blur bg-white/80 text-black-100 rounded-full ">
                Scroll{" "}
                <MoveRight
                  size={18}
                  strokeWidth={1.8}
                />
              </div>
            </div>

            <div className=" flex overflow-x-auto gap-7 pb-4 scrollbar-hide snap-x box relative">
              {similerProduct.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className="flex-shrink-0 snap-start lg:w-[calc(25%-21px)] md:w-[calc(33.33%-21px)]  min-[500px]:w-[calc(50%-21px)] w-full"
                  >
                    <TemplateCard item={item} />
                  </div>
                );
              })}
            </div>
          </div>
          {/* comments */}
          <div>
            {/* @ignore-ts */}
            <CommentSection
              userId={session?.user?.id as string}
              templateId={oneTemplate.id}
            />
          </div>
        </Wrapper>
      </div>
    </>
  );
};

const Heading = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{children}</h2>
      </div>
    </>
  );
};

export default page;
