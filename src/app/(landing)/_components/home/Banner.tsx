import Image from "next/image";

const Banner = () => {
  return (
    <div className=" -mt-[11.5rem] relative max-w-[100rem] mx-auto">
      <div className=" sm:w-full w-[200%] top-20 sm:top-0 relative -left-8 sm:left-0 ">
        <Image
          alt="banner"
          src={"/banner.png"}
          width={3500}
          height={2500}
          className=" w-full h-full"
        />
      </div>
    </div>
  );
};

export default Banner;
