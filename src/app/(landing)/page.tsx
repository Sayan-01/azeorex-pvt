import dynamic from "next/dynamic";
import DashboardSnippet from "./_components/dashboard-snippet";
import Header from "./_components/home/Header";
import Hero from "./_components/home/Hero";
import Banner from "./_components/home/Banner";
import Technology from "./_components/home/Technology";
import Approch from "./_components/home/Approch";
import Smart from "./_components/home/Smart";
import Footer from "./_components/home/Footer";
import ReviewSection from "./_components/home/ReviewSection";
import Streamlined from "./_components/home/Streamlined";

const PriceSection = dynamic(() => import("./_components/pricing").then((component) => component.PricingSection), { ssr: true });
const Marquee = dynamic(() => import("./_components/home/Marquee").then((component) => component.default), { ssr: true });
const Category = dynamic(() => import("./_components/home/Category").then((component) => component.default), { ssr: true });

export default async function Home() {
  return (
    <div className="bg-bcgc x">
      <Header /> {/* sm:h-[85px] h-[70px] -> sm:pt-[95px] pt-[75px] sm:mb-[95px] mb-[75px] */}
      <div className=" overflow-hidden w-full ">
        <Hero />
        {/* <Container_y> */}
        <Banner />
        {/* </Container_y> */}
        {/* <Container_y> */}
        <Marquee />
        {/* </Container_y> */}
        <Streamlined/>
        <Category />
        {/* <Container_y> */}
        <Technology />
        {/* </Container_y> */}
        {/* <Container_y> */}
        <Approch />
        {/* </Container_y> */}
        <PriceSection />
        {/* <Container_y> */}
        <ReviewSection/>
        <Smart />
        {/* </Container_y> */}
      </div>
      <Footer />
    </div>
  );
}
