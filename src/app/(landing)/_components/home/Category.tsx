import React from "react";
import Wrapper from "@/components/design/Wrapper";
import Heading from "@/components/design/Heading";
import CategoryItem from "@/components/design/CategoryItem";
import Gradient from "@/components/design/Gradient";
import { Container_opacity_only } from "./Container";
import { card } from "@/constants/azeorex-landing-page";

const Category = () => {
  return (
    <Wrapper className="pb-16 ">
      <Heading
        className={"mb-20"}
        h3={"-: OUR CATEGORY :-"}
        h1={"Our All Categories"}
        p={"Explore the diverse range of offerings that elevate Replex's value and cater to your specific needs."}
      />
      {card.map((item:any,idx) => {
        return (
          <Container_opacity_only key={idx}>
            <div
              key={item.id}
              className="relative "
            >
              <Gradient className={"sm:-top-[129px] top-[300px] sm:scale-[1.1] scale-[2] sm:left-0 -left-24"} />
              <CategoryItem item={item} />
            </div>
          </Container_opacity_only>
        );
      })}
    </Wrapper>
  );
};

export default Category;
