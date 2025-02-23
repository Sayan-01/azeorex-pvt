import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { MoveRight, Star } from "lucide-react";

const TemplateCard = ({ item }: { item: any }) => {
  const formatTitle = (title: string) => {
    const formattedTitle = String(title).charAt(0).toUpperCase() + String(title).slice(1);
    return formattedTitle.length > 28 ? formattedTitle.slice(0, 24) + "..." : formattedTitle;
  };

  return (
    <div className="relative">
      <Link
        href={`/templates/${item._id}`}
        className="relative"
      >
        <div className="overflow-hidden cursor-pointer rounded-[10px]">
          <Carousel className={"w-full mx-auto rounded-[12px] overflow-hidden hover:outline-blue-500/80 hover:outline-2 duration-200"}>
            <CarouselContent>
              {item?.image?.slice(0, 2).map((item: any, idx: number) => {
                return (
                  <CarouselItem key={idx}>
                    <div className=" overflow-hidden rounded-[10px]">
                      <Image
                        className="w-full object-cover duration-500  aspect-[3/2] "
                        width={600}
                        height={600}
                        src={item || "/funnel-placeholder.svg"}
                        alt={`image${idx}`}
                      />
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
          <div className="pt-[12px] relative">
            
            <div className="flex justify-between items-center overflow-hidden mb-[4px]">
              <h2 className="md:text-sm text-base title_line text-zinc-300/90 w-[calc(100%-20px)]">{item.title}</h2>
              <div className={" md:text-xs text-sm absolute top-3 right-0 bg-zinc-800 px-2 py-[2px] rounded-md text-blue-400 items-right justify-center "}>{item.access}</div>
            </div>
            <p className="md:text-xs text-sm description_line text-zinc-500 leading-snug">{item.description}</p>
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
