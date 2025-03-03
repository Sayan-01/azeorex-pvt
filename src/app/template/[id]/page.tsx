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
import { Template } from "@prisma/client";
import TemplateCard from "@/components/design/TemplateCard";
import { searchSimilerProduct } from "@/lib/queries";

// interface TemplateData {
//   oneTemplate: {
//     id: string;
//     title: string;
//     description: string;
//     longDescription: string;
//     category: string[];
//     feature: string[];
//     image: string[];
//     price: number;
//     access: string;
//   };
//   similer_product: {
//     title: string;
//     description: string;
//     longDescription: string;
//     category: string[];
//     feature: string[];
//     image: string[];
//     price: number;
//     access: string;
//   }[];
// }

const getTemplateData = async (id: string): Promise<Template> => {
  
    let data = await fetch(`${process.env.NEXT_URL}/api/products/${id}`, { cache: "no-store" });
    if (!data.ok) throw new Error("Failed to fetch template");
    const res = await data.json();
    return res;
};

const similer_product = async (category: string): Promise<Template[]> => {
  const res = await searchSimilerProduct(category) 
  return res;
};

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const oneTemplate = await getTemplateData(id);
  console.log(oneTemplate);
  
  const similerProduct= await similer_product(oneTemplate.category[0]);

  function formatNumber(input:number) {
    return parseFloat(`${input}`).toFixed(2);
  }

  return (
    <>
      <div className="min-h-screen w-full bg-black sm:py-[95px] py-[75px]">
        <Wrapper>
          {/* route-path */}
          <p className="text-white/70 mb-6 mt-2 text-sm">
            <Link href="/">Home</Link> / <Link href="/templates/products">templates</Link> / <span className="text-white">{oneTemplate.title}</span>
          </p>
          {/* top */}
          <div className="flex lg:flex-row flex-col-reverse items-start">
            {/* left */}
            <div className={"flex w-full flex-col"}>
              {/* left-top */}
              <div className={"w-full mx-auto"}>
                <Carousel>
                  <CarouselContent>
                    {oneTemplate?.image?.slice(0, 2).map((item, idx) => {
                      return (
                        <CarouselItem key={idx}>
                          <div className=" w-full mx-auto lg:mx-0">
                            <Image
                              className="w-full aspect-[10/7] rounded-2xl"
                              src={item}
                              width={500}
                              height={500}
                              alt={oneTemplate.title}
                            ></Image>
                          </div>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                  <CarouselPrevious className={"ml-14"} />
                  <CarouselNext className={"mr-14"} />
                </Carousel>
              </div>
              {/* left-bottom */}
              <div className={"lg:w-full md:w-[60%] w-full mx-auto mt-10                                            "}>
                <div>
                  <Heading>Long Description</Heading>
                  <p className="mb-10">{oneTemplate.longDescription}</p>
                  <Heading>Template Category</Heading>
                  <div className="mb-10">
                    {oneTemplate.category.map((i) => {
                      return <Badge className={"border rounded-lg mr-4 mb-4 py-2 bg-white/10"}>{i}</Badge>;
                    })}
                  </div>
                  <Heading>Features</Heading>
                  <div className="mb-10">
                    {oneTemplate.feature?.map((i, idx) => {
                      return (
                        <div
                          key={idx}
                          className="p-5 py-4 rounded-xl my-4 bg-white/10"
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
            <div className="lg:pl-[80px] lg:sticky sm:top-[153px] top-[70px] overflow-hidden flex w-full lg:w-[90%] md:flex-row  lg:flex-col  flex-col gap-x-10 mb-10 lg:mb-0">
              {/* part 1 */}
              <div className="w-full">
                <div className="w-full  mb-4 leading-none">
                  <h1 className="mb-5 font-semibold leading-tight md:text-[36px] sm:text-[32px] text-[30px] ">{oneTemplate?.title}</h1>
                  <p className="leading-tight sm:text-[16px] text-[14px] text-white/70 mb-5">{oneTemplate?.description}</p>
                  <div className="flex gap-5 mb-5">
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
                <div className="mb-6 font-semibold leading-tight md:text-[36px] sm:text-[32px] text-[30px] flex gap-6">
                  {oneTemplate.access === "Free" ? (
                    <p>Free</p>
                  ) : (
                    <>
                      <p>₹{formatNumber(oneTemplate.price * 50)}</p>
                      <p className=" line-through opacity-50 font-medium text-2xl flex items-end">
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
                  {/* <form
                    className="w-full"
                    action={buyProduct}
                  >
                    <input
                      type="hidden"
                      name="id"
                      value={oneTemplate._id}
                    />
                    <button
                      type="submit"
                      className="flex gap-5 w-full"
                    >
                      <div className=" bg-blue-600 h-[40px] text-white rounded-lg flex items-center justify-center flex-1 font-lg ">Buy now</div>
                    </button>
                  </form> */}
                  {/* <CopyButton className="w-full bg-blue-600 h-[40px] text-white rounded-lg flex items-center justify-center font-lg ">Buy now</CopyButton> */}
                  {/* btn 2 */}

                  {/* <PreviewButton
                    className="w-full"
                    preview={oneTemplate?.image.length == 3 ? oneTemplate?.image[2] : false}
                  >
                    Preview
                  </PreviewButton> */}
                </div>
                <p className="sm:text-[20px] text-[16px] text-white mt-6 mb-4">How to Use Our Template</p>
                <div className="flex sm:flex-row flex-col justify-between mb-2">
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
                        <FaRegFileAlt /> Open your downloaded file
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-4 text-[20px]">Chose Your Template Type</div>
                <div className=" flex gap-5 items-center">
                  <button className="flex w-[45px] h-[45px] bg-[#ffffff]/10 items-center justify-center rounded-full">
                    <Image
                      src={"/platform/figma.png"}
                      width={20}
                      height={20}
                      alt="figma"
                    />
                  </button>
                  <button className="flex w-[45px] h-[45px] bg-[#ffffff]/10 items-center justify-center rounded-full">
                    <Image
                      src={"/platform/framer.svg"}
                      width={20}
                      height={20}
                      alt="framer"
                    />
                  </button>
                  <button className="flex w-[45px] h-[45px] bg-[#ffffff]/10 items-center justify-center rounded-full">
                    <Image
                      src={"/platform/webflow_icon.webp"}
                      width={20}
                      height={20}
                      alt="webflow"
                    />
                  </button>
                  <button className="flex w-[45px] h-[45px] bg-[#ffffff]/10 items-center justify-center rounded-full">
                    <Image
                      src={"/platform/code.svg"}
                      width={24}
                      height={24}
                      alt="platform"
                    />
                  </button>
                  <div className="ml-4 text-sm bg-gradient-to-r bg-[#7D2AE8] px-2 rounded-[40px] pb-[2px] border-2 border-purple-400 h-6">Beta</div>
                </div>
              </div>
            </div>
          </div>
          {/* bottom */}
          <div className=" my-20">
            {/* heading */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">More Templates</h2>
              <p className=" text-blue-500/60">see all</p>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
              {similerProduct.map((item, idx) => {
                return (
                  <div key={idx}>
                    <TemplateCard item={item} />
                  </div>
                );
              })}
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  );
};

const Heading = ({ children }:{children:React.ReactNode}) => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{children}</h2>
      </div>
    </>
  );
};

export default page;
