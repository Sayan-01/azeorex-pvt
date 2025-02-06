import Wrapper from "@/components/design/Wrapper";
import LoginForm from "@/components/auth/LoginFormZod";
import Image from "next/image";
import React from "react";

const page = async () => {
  return (
    <div className="min-h-screen relative">
      <Image
        src={"/sign_bg.svg"}
        width={500}
        height={500}
        className="absolute w-full h-[50rem] z-0"
        alt='sign_bg'
      />

      <Wrapper className={"relative"}>
        <LoginForm />
      </Wrapper>
    </div>
  );
};

export default page;
