import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Award, Crown, MoveRight, Star } from "lucide-react";

const TemplateCard = ({ item }: { item: any }) => {
  const formatTitle = (title: string) => {
    const formattedTitle = String(title).charAt(0).toUpperCase() + String(title).slice(1);
    return formattedTitle.length > 28 ? formattedTitle.slice(0, 24) + "..." : formattedTitle;
  };

  return (
    <div className="relative">
      <Link
        href={`/template/${item.id}`}
        className="relative"
      >
        <div className="overflow-hidden cursor-pointer rounded-[10px]">
          <div className={"w-full mx-auto rounded-[12px] overflow-hidde duration-200 "}>
            <div className=" overflow-hidden rounded-[12px] group ">
              <Image
                className="w-full object-cover duration-300  aspect-[3/1.9] group-hover:scale-110 transition-transform"
                width={600}
                height={600}
                src={item.image[0] || "/funnel-page-placeholder.svg"}
                alt={`image`}
              />
            </div>
          </div>
          <div className="pt-[12px] relative flex items-start  gap-3  w-full">
            <div className={"flex items-center gap-1 md:text-xs text-sm backdrop-blur-lg w-9 h-9 rounded-full items-right justify-center mt-1"}>
              {/* {item.access === "pro" ? (
                <Crown
                  size={18}
                  strokeWidth={1.5}
                />
              ) : (
                <Award
                  size={18}
                  strokeWidth={1.5}
                />
              )} */}
              <Image
                src={item?.User.avatarUrl || "/avater.svg"}
                width={200}
                height={200}
                className="w-9 h-9  rounded-full "
                alt="profile img"
              />
            </div>
            {/* <div className=" overflow-hidden -mb-[1px] w-[76%]">
              <h2 className="text-[15px] title_line text-white ">{item.title}</h2>
              <p className="text-[13px] title_line text-gray-400 font-light">{item.description}</p>
            </div> */}
            <div className=" -mb-[1px] w-[76%]">
              <h2 className="text-[15px] title_line text-white mb-0.5">{item.title}</h2>
              <p className="text-[13px] description_line text-gray-400 leading-tight font-light mb-[7px]  ">{item.description}</p>
              <div className="md:text-xs text-[13px] gap-3 text-zinc-300/90 flex items-center font-[600]">
                <span className="flex items-center gap-1 text-[#7e6cc5]">
                  {/* <Star
                    strokeWidth={2.2}
                    size={13}
                    color="#7e6cc5"
                    className="mb-[0.5px]"
                  /> */}
                  {item.likes} likes
                </span>
                <p className="text-[#8D5394]">{item.Reviews.length} reviews</p>
              </div>
            </div>
          </div>
          {/* <div className="flex gap-3 pt-[12px]">
            <div>
              <h2 className="md:text-sm text-base title_line text-zinc-300/90 w-[calc(100%-20px)] mb-1">{item.title}</h2>
              <p className="md:text-xs text-sm description_line text-zinc-500 leading-snug mb-2">{item.description}</p>{" "}
              <div className="md:text-xs text-sm gap-3 text-zinc-300/90 flex items-center">
                <span className="flex items-center gap-1 ">
                  <Star size={14} /> 4.6
                </span>
                <p className="text-zinc-500">56 reviews</p>
              </div>
            </div>
            <div>
              <div className="h-9 w-9 flex items-center justify-center bg-zinc-200 text-black-100 rounded-full mt-1">
                <MoveRight size={18} />
              </div>
            </div>
          </div> */}
        </div>
      </Link>
    </div>
  );
};

export default TemplateCard;
