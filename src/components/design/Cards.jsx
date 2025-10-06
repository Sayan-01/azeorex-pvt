import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import LikeBtn from "../buttons/LikeBtn";

const Cards = ({ item, session = false, like = true }) => {
  const temId = item._id;
  const userId = session?.user?._id;
  const isLiked = !!item.likes.includes(userId);

  return (
    <div className="relative">
      {like ? (
          <LikeBtn
            temId={temId}
            userId={userId}
            isLiked={isLiked}
            className={"m-3 absolute z-[20] bottom-[62px] right-0"}
          />
      ) : (
        ""
      )}
      <Link href={`/templates/${item._id}`} className='relative'>
        {like ? (
          <div className=" bg-gradient-to-t h-16 from-zinc-950/60 to-zinc-950/0  w-full absolute bottom-[62px] z-10 flex justify-end  transition-opacity duration-300">
            
          </div>
        ) : (
          ""
        )}
        <div className="overflow-hidden cursor-pointer rounded-[10px]">
          <Carousel className={"w-full mx-auto rounded-[10px] overflow-hidden"}>
            <CarouselContent>
              {item?.image?.slice(0,2).map((item, idx) => {
                return (
                  <CarouselItem key={idx}>
                    <div className=" overflow-hidden rounded-[10px]">
                      <Image
                        className="w-full object-cover duration-500  aspect-[4/3] "
                        width={600}
                        height={600}
                        src={item}
                        alt={`image${idx}`}
                      />
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
          <div className="pt-[10px]">
            <div className="flex justify-between items-center overflow-hidden">
              <h2 className="text-[18px] leading-none font-normal">{`${item.title.substring(0, 15)}...`}</h2>
              <div>
                <Badge
                  className={
                    " text-[18px] uppercase leading-none text-sm p-0 border font-bold items-right justify-center tracking-widest hover:text-transparent w-[49.5px] bg-gradient-to-br from-[#0066ff] to-[#00fbff] inline-block text-transparent bg-clip-text "
                  }
                >
                  {item.access}
                </Badge>
              </div>
            </div>
            <div className=" text-white/[0.5]">
              <p className="h-[20px] max-w-[85%] overflow-hidden leading-tight my-[6px] mt-[2px] text-[15px]">{`${item.description.substring(0, 30)}...`}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Cards;
