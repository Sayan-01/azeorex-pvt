import React from "react";
import TextComponent from "./text";
import Container from "./container";
import VideoComponent from "./video";
import LinkComponent from "./link-component";
import ContactFormComponent from "./contact-form-component";
import Checkout from "./checkout";
import Section from "./section";
import ImageComponent from "./image";
import { EditorElement } from "../../../../../../../../providers/editor/editor-provider";
import SVGComponent from "./svg";
import HeadingComponent from "./heading";

type Props = {
  element: EditorElement;
};

const Recursive = ({ element }: Props) => {
  switch (element.type) {
    case "text":
      return <TextComponent element={element} />;
    case "container":
      return <Container element={element} />;
    case "section":
      return <Section element={element} />;
    case "video":
      return <VideoComponent element={element} />;
    case "image":
      return <ImageComponent element={element} />;
    case "contactForm":
      return <ContactFormComponent element={element} />;
    case "2Col":
      return <Container element={element} />;
    case "__body":
      return <Container element={element} />;
    case "link":
      return <LinkComponent element={element} />;
    // case "svg":
    //   return <SVGComponent element={element} />;
    case "heading":
      return <HeadingComponent element={element} />;
    default:
      return null;
  }
};

export default Recursive;
