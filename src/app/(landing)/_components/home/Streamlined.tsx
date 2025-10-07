'use client'
import Gradient from "@/components/design/Gradient";
import Heading from "@/components/design/Heading";
import Wrapper from "@/components/design/Wrapper";
import { ArrowRight, Layout, Palette, Rocket } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const Streamlined = () => {
  const streamlined = [
    {
      logo: (
        <Layout
          className="group-hover:scale-110 transition-transform duration-300"
          size={26}
        />
      ),
      title: "Four Simple Steps to Success",
      description: "Choose from a wide variety of templates.",
      color: "from-purple-500/20 to-purple-600/10",
      iconColor: "text-purple-400",
    },
    {
      logo: (
        <Palette
          className="group-hover:scale-110 transition-transform duration-300"
          size={26}
        />
      ),
      title: "Customize Your Site",
      description: "Use our intuitive drag-and-drop editor for customization.",
      color: "from-blue-500/20 to-blue-600/10",
      iconColor: "text-blue-400",
    },
    {
      logo: (
        <Rocket
          className="group-hover:scale-110 transition-transform duration-300"
          size={26}
        />
      ),
      title: "Launch with a Click",
      description: "Go live and start sharing your content instantly.",
      color: "from-emerald-500/20 to-emerald-600/10",
      iconColor: "text-emerald-400",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };


  return (
    <section>
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
          <div className="h-full w-full bg-gradient-to-b from-transparent to-black/30" />
        </div>
      </div>

      <Wrapper className="pb-16 my-20 sm:mb-30 mb-16">
        <Heading
          className={"mb-24"}
          h3={"-: STREAMLINED :-"}
          h1={"Build Website in Minutes"}
          p={"Creating a stunning website has never been easier. Follow our simple steps to bring your vision to life."}
        />
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6 relative z-10"
        >
          {streamlined.map((step, index) => (
            <motion.div
              key={index}
              variants={item}
              className={cn("border group relative overflow-hidden rounded-2xl p-px transition-all duration-500  hover:shadow-white/5", `bg-gradient-to-br ${step.color} via-transparent`)}
            >
              <div className="relative z-10 flex flex-col h-full p-6 bg-gradient-to-br from-gray-900 to-gray-950/90 rounded-2xl">
                <div
                  className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300",
                    "bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 group-hover:border-white/10",
                    step.iconColor
                  )}
                >
                  {step.logo}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 mb-6">{step.description}</p>
                <div className="mt-auto flex items-center text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                  Learn more
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>

                {/* Animated gradient border effect */}
                <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={cn("absolute inset-0 rounded-2xl", "bg-[radial-gradient(400px_circle_at_var(--mouse-x,0px)_var(--mouse-y,0px),rgba(255,255,255,0.05),transparent_40%)]")} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Wrapper>
    </section>
  );
};

export default Streamlined;
