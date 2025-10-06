import Heading from "@/components/design/Heading";
import { set1 } from "@/constants/azeorex-landing-page";
import Image from "next/image";
import React from "react";

const Project = () => {
  return (
    <>
      <div className="mt-[8rem] mb-[4rem] w-full text-center flex  items-center flex-col">
        <Heading
          h3={"-: OUR PARTNER :-"}
          h1={"Trusted Collaborators"}
          p={"Discover the esteemed allies who enhance Replex's capabilities and amplify your customer engagement."}
        />
      </div>
      <div className="logos mt-10 mx-auto w-full relative overflow-hidden  whitespace-nowrap ">
        <ProjectMarquee/>
        <ProjectMarquee/>
      </div>
    </>
  );
};

const ProjectMarquee = () => {
 return (
   <div className=" logos-slider inline-flex items-center sm:w-[80rem] w-[70rem]">
     <div className="flex sm:gap-10 gap-6 items-center ml-10">
       {set1.map((i) => (
         <div
           key={i.Id}
           className={`${i.Id == 1 || i.Id == 4 ? "h-60  " : "h-60 w-[410px]"} overflow-hidden rounded-2xl p-3 bg-blue-600/20`}
         >
           <Image
           alt={`image${i.Id}`}
             className={"w-full h-full rounded-2xl"}
             width={1000}
             height={800}
             src={i.Img}
           />
         </div>
       ))}
     </div>
   </div>
 );
}

export default Project;
