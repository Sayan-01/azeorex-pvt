"use client";
import SpotLight from "@/components/design/SpotLight";
import Wrapper from "@/components/design/Wrapper";
import ContactForm from "@/components/forms/ContactForm";
import { contact_feature, contact_feature_2 } from "@/constants/menus";

const page = () => {
  return (
    <div className="bg-bcgc">
      <div className="absolute w-full z-0">
        <SpotLight />
      </div>

      <Wrapper className="min-h-screen relative sm:pt-[90px] pt-[70px] sm:mb-[95px] mb-[75px] z-10 ">
        {/* heading */}
        <div className="text-center w-full mb-12">
          <h1 className="mt-2 mb-6  font-semibold leading-[1.1] md:text-[55px] sm:text-[45px] text-[38px]">Start Your Conversation with Azeorex</h1>
          <p className="max-w-[44rem] mx-auto text-center text-[16px] opacity-70">
            From web design to branding, our expert team delivers creative solutions that elevate your brand and captivate your audience.From web design to branding,
          </p>
        </div>

        <div className="flex flex-col-reverse sm:flex-row">
          {/* left-side */}
          <div className="w-full items-start flex flex-col">
            <div className="px-5 py-2 md:mt-0 mt-6 rounded-full bg-gradient-to-r from-[#191e47] via-[#2b1d72] font-semibold">Conatct</div>
            <h1 className="mt-5 md:mb-6 mb-4 font-semibold leading-tight md:text-[35px] sm:text-[32px] text-[30px] ">Get In Touch</h1>
            <p className="text-white/60 md:max-w-[80%] ">Connect with Azeorex for innovative web design, impactful branding, and dedicated expert support to elevate your brand.</p>
            <div className="my-8 flex lg:flex-row flex-col gap-10">
              <div>
                {contact_feature.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-6 mt-6"
                    >
                      <div className="bg-gradient-to-br from-[#2b1d72] to-[#06050c] w-[52px] h-[52px] flex items-center justify-center rounded-full">{item.logo}</div>
                      <div>
                        <div className="text-lg">{item.title}</div>
                        <div className="text-sm text-white/60">{item.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div>
                {contact_feature_2.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-6 mt-6"
                    >
                      <div className="bg-gradient-to-br from-[#2b1d72] to-[#06050c] w-[52px] h-[52px] flex items-center justify-center rounded-full">{item.logo}</div>
                      <div>
                        <div className="text-lg">{item.title}</div>
                        <div className="text-sm text-white/60">{item.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* right-side */}
          <ContactForm />
        </div>
      </Wrapper>
    </div>
  );
};

export default page;
