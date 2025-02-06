import RegisterForm from "@/components/auth/RegisterFormZod";
import Wrapper from "@/components/design/Wrapper";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen relative">
      <Image
        src={"/sign_bg.svg"}
        width={500}
        height={100}
        className="absolute w-full h-[50rem] z-0"
        alt='sing_bg'
      />

      <Wrapper className={" relative"}>
        <RegisterForm />
      </Wrapper>
    </div>
  );
};

export default page;
