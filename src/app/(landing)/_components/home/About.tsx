import React from "react";
import Component from "./Component";
import Wrapper from "@/components/design/Wrapper";
import Heading from "@/components/design/Heading";

const About = () => {
  return (
    <div className="mt-32">
      <Wrapper>
        <Heading
          className={"mb-20"}
          h3={"-: ABOUT :-"}
          h1={"About Azeorex Owner"}
          p={"Get to know the visionary behind Azeorex, whose leadership and passion fuel our mission and inspire our team."}
        />
        <Component />
      </Wrapper>
    </div>
  );
};

export default About;
