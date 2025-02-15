import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

const TemplateCard = ({ item }: { item: any }) => {
  const temId = item._id;
  console.log(item);

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
                        className="w-full object-cover duration-500  aspect-[4/2.8] "
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
          <div className="pt-[10px]">
            <div className="flex justify-between items-center overflow-hidden mb-[4px]">
              <h2 className="text-[14px] text-zinc-300/90 ">{String(item.title).charAt(0).toUpperCase() + String(item.title).slice(1)}</h2>
              <div className={" text-xs  items-right justify-center hover:text-transparent bg-gradient-to-br from-[#0066ff] to-[#00fbff] inline-block text-transparent bg-clip-text "}>
                {item.access}
              </div>
            </div>
            <p className="text-[12px] text-zinc-500 leading-snug ">{`${item.description.substring(0, 70)}...`}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TemplateCard;
