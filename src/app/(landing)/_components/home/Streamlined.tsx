"use client";
import Gradient from "@/components/design/Gradient";
import Heading from "@/components/design/Heading";
import Wrapper from "@/components/design/Wrapper";
import { ArrowRight, Layout, Palette, Rocket, Upload } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const Streamlined = () => {
  const steps = [
    {
      step: "1. Choose template",
      desc: "Kick off by crafting a script with a prompt or by choosing from available template suggestions.",
      title: "Enter Your Story Topic",
      mock: (
        <div className="bg-[#1A1D29] p-4 rounded-lg space-y-3">
          <div className="text-xs text-gray-500">Write a story about Spanish lullaby</div>
          <div className="h-2 w-full bg-white/5 rounded"></div>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-[10px] rounded border border-purple-500/30">Funny ×</span>
            <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-[10px] rounded border border-purple-500/30">Fairy ×</span>
            <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-[10px] rounded border border-purple-500/30">Lullaby ×</span>
          </div>
        </div>
      ),
    },
    {
      step: "2. Customize Your Site",
      desc: "Select orientation and pick a background scene and music from free templates.",
      title: "Video Orientation",
      mock: (
        <div className="space-y-4">
          <div className="flex gap-2 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-16 h-10 bg-white/5 rounded border border-white/10 shrink-0 relative overflow-hidden"
              >
                <img
                  src={`https://picsum.photos/id/${100 + i}/100/100`}
                  className="opacity-50 object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[10px] text-gray-400 bg-[#1A1D29] p-2 rounded">
            <span>Beach Mermaid</span>
            <span>Deep Ocean</span>
          </div>
        </div>
      ),
    },
    {
      step: "3. Launch with a Click",
      desc: "Select the export format and download the generated videos, script, or narration.",
      title: "Download",
      mock: (
        <div className="flex items-center justify-center h-full py-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.4)] animate-pulse-slow">
            <Upload className="w-8 h-8 text-white" />
          </div>
        </div>
      ),
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-[#0F111A]/90 border border-white/10 rounded-2xl p-1 overflow-hidden hover:border-blue-400/30 transition-colors"
            >
              <div className="bg-[#151722] rounded-xl p-6 h-48 mb-1 flex flex-col justify-center border-b border-white/5">
                <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider">{item.title}</div>
                {item.mock}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{item.step}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Wrapper>
    </section>
  );  
};

export default Streamlined;
