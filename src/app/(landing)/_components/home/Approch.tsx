import ApprochCard from "@/components/design/ApprochCard";
import Heading from "@/components/design/Heading";
import Wrapper from "@/components/design/Wrapper";
import React from "react";  

const Approch = () => {
  return (
    <div>
      <Wrapper>
        <Heading
          h3={"-: Journey :-"}
          h1={"Our Approaches"}
          p={"Discover our innovative approaches that ensure exceptional quality, efficiency, and success in every project we undertake."}
        />
        <div className="mt-20 ">
          <div className="flex sm:flex-row flex-col gap-10 mb-10 justify-center relative">
            {/* <div className=" absolute -top-10 -z-50 blur-3xl rounded-full bg-[#080c38]/40 w-full h-[300px]"></div> */}

            {/* card-1 */}
            <ApprochCard
              img={"/approch/b1.png"}
              imgClassName={"w-full bottom-0 a z-10 duration-500 right-0"}
              bgUrl={"/approch/bg3.png"}
              bgClassName={" opacity-50"}
              title={"Obtain the project from client"}
              num={"STEP 01"}
              titlePosi={"n top-[50px]"}
              numPosi={"n"}
            />

            {/* card-2 */}
            <ApprochCard
              img={"/approch/b2.svg"}
              imgClassName={"w-[50%] -bottom-[30px] b duration-500 left-2"}
              title={"Conduct a thorough project analysis"}
              num={"STEP 02"}
              titlePosi={"t text-right sm:max-w-56 max-w-40 right-5 sm:top-20 top-12"}
              numPosi={"t text-right right-5 sm:top-[55px] "}
            />
          </div>
          <div className="flex sm:flex-row flex-col gap-10 justify-center relative">
            {/* card-3 */}
            <ApprochCard
              img={"/approch/b3.svg"}
              imgClassName={"w-[48%] bottom-0 a z-10 duration-500 right-5"}
              bgUrl={"/approch/bg3.png"}
              bgClassName={" opacity-50"}
              title={"Prepare and finalize the design and layout"}
              num={"STEP 03"}
              numPosi={"n top-[56px]"}
              titlePosi={"n max-w-56 top-20"}
            />

            {/* card-4 */}
            <ApprochCard
              img={"/approch/b4.png"}
              bgUrl={"/approch/bg4.svg"}
              imgClassName={"-right-10 z-10 duration-500 c bottom-0"}
              title={"Develop the project as planned"}
              num={"STEP 04"}
              titlePosi={"n max-w-40 top-[50px]"}
              numPosi={"n"}
            />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Approch;
