import Image from "next/image"
import AnimationContainer from "./AnimationContainer";
import { BorderBeam } from "./BorderBeam";

const DashboardSnippet = () => {
  return (
    // <div className="relative md:py-24 py-16 border">
    //   <div className="w-full h-3/6 absolute rounded-[50%] radial--blur md:opacity-40 opacity-50 mx-auto" />
    //   <div className="w-full aspect-video relative">
    //     <Image
    //       priority
    //       src="/dashboard-snippet.png"
    //       className="opacity-[0.95] object-contain"
    //       alt="snippet"
    //       sizes="100vw"
    //       fill

    //     />
    //   </div>
    // </div>
    <div
      // delay={0.2}
      className="relative md:py-[98px] py-16 md:px-2 bg-transparent w-full"
    >
      {/* <div className="w-full h-3/6 absolute rounded-[50%] radial--blur md:opacity-40 opacity-50 mx-auto" /> */}
      <div className="absolute md:top-[15%] left-1/2 gradient w-3/4 -translate-x-1/2 h-1/4 md:h-1/3 inset-0 blur-[5rem] md:opacity-80"></div>
      <div className="rounded-xl p-2 ring-1 ring-inset ring-foreground/20 md:m-0 lg:rounded-[24px] bg-opacity-50 backdrop-blur-3xl">
        <BorderBeam
          size={250}
          duration={12}
          delay={9}
        />
        <Image
          src="/image.png"
          alt="Dashboard"
          width={1200}
          height={1200}
          quality={100}
          className="rounded-md lg:rounded-[20px] bg-foreground/10 ring-1 ring-border w-full"
        />
        <div className="absolute -bottom-4 inset-x-0 w-full h-1/2 bg-gradient-to-t from-[#000000] z-40"></div>
        <div className="absolute bottom-0 md:-bottom-8 inset-x-0 w-full h-1/4 bg-gradient-to-t from-[#000000] z-50"></div>
      </div>
    </div>
  );
}

export default DashboardSnippet
