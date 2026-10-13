"use client";

import React, { useState } from "react";
import { ChevronRight, Play, Clock, Sparkles, Video, CheckCircle2 } from "lucide-react";
import UserBtn from "@/app/(landing)/_components/navbar/user-btn";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Header from "../../_components/info-header";

export default function TutorialsComponent() {
  const [isPlaying, setIsPlaying] = useState(false);

  // Single featured tutorial
  const tutorial = {
    title: "Getting Started with Azeorex: Complete Platform Walkthrough",
    description:
      "Learn how to create high-converting projects, customize layouts in the visual canvas, configure domains, and leverage AI website generation step-by-step.",
    duration: "5:20 min",
    level: "Beginner",
    badge: "Official Guide",
    // Replace with any YouTube embed ID or video URL when ready
    youtubeId: "dQw4w9WgXcQ",
  };

  return (
    <div className="pb-16 pt-[88px] min-h-screen text-white">
      {/* Top Header consistent with Home & Templates */}
      <Header>
        <div className="md:flex hidden items-center gap-2 rounded-full w-max">
          <h3 className="text-white/70">Tutorials</h3>
          <ChevronRight size={16} />
        </div>

        <div className="md:mr-0 mr-[52px] flex gap-3 w-full md:w-auto sm:justify-between justify-between items-center">
          <Link href="/saas/azeorex-intelligence">
            <Button
              size="sm"
              className="bg-main hover:bg-main/80 text-white gap-1.5 md:flex hidden h-8 text-xs font-medium px-3 rounded-lg"
            >
              <Sparkles size={14} /> Try AI Builder
            </Button>
          </Link>

          <div className="md:hidden flex md:items-center md:gap-12 w-[146px] gap-[12px]">
            <UserBtn
              size="md:h-8 h-9 md:w-8 w-9"
              margin="mt-2 z-[101] rounded-2xl"
              className="overflow-hidden min-w-fit rounded-full bg-gradient-to-br from-[#08C741] to-[#0F39C8] text-violet-200 text-[20px] font-semibold items-center justify-center outline-none border-none"
            />
            <Link
              className="flex items-center opacity-80"
              href="/"
            >
              <Image
                src="/logo.svg"
                height={400}
                width={400}
                className="w-[132px] h-[30px]"
                alt="logo"
              />
            </Link>
          </div>
        </div>
      </Header>

      <div className="px-5 md:px-8 max-w-5xl mx-auto space-y-6">
        {/* Title Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Video size={12} /> {tutorial.badge}
            </span>
            <span className="text-xs text-zinc-500">• {tutorial.duration}</span>
            <span className="text-xs text-zinc-500">• {tutorial.level}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
            {tutorial.title}
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-3xl">
            {tutorial.description}
          </p>
        </div>

        {/* Dedicated Single Video Player Container */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#121214] border border-zinc-800 shadow-2xl">
          {isPlaying ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${tutorial.youtubeId}?autoplay=1`}
              title={tutorial.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div
              onClick={() => setIsPlaying(true)}
              className="group relative w-full h-full flex flex-col items-center justify-center cursor-pointer bg-gradient-to-br from-[#1c1c20] to-[#0f0f11] hover:from-[#202026] hover:to-[#121216] transition-all"
            >
              {/* Radial glow background */}
              <div className="absolute inset-0 bg-blue-600/10 opacity-40 group-hover:opacity-70 transition-opacity blur-2xl pointer-events-none" />

              {/* Big Play Button */}
              <div className="relative z-10 w-20 h-20 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-xl shadow-blue-600/20">
                <Play size={32} className="ml-1 fill-current" />
              </div>

              <div className="relative z-10 mt-4 text-center">
                <p className="text-base font-semibold text-zinc-200 group-hover:text-white transition-colors">
                  Click to Play Tutorial
                </p>
                <div className="flex items-center justify-center gap-2 mt-1 text-xs text-zinc-400">
                  <Clock size={13} />
                  <span>{tutorial.duration}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Key Takeaways / Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-xl bg-[#161618] border border-zinc-800/80">
            <div className="flex items-center gap-2 text-xs font-semibold  mb-1">
              <CheckCircle2 size={15} /> Project Setup
            </div>
            <p className="text-xs text-zinc-400">
              Create and manage multiple website funnels with customizable templates and slugs.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#161618] border border-zinc-800/80">
            <div className="flex items-center gap-2 text-xs font-semibold  mb-1">
              <CheckCircle2 size={15} /> Visual Editor
            </div>
            <p className="text-xs text-zinc-400">
              Easily edit typography, colors, sections and preview on desktop, tablet & mobile.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#161618] border border-zinc-800/80">
            <div className="flex items-center gap-2 text-xs font-semibold mb-1">
              <CheckCircle2 size={15} /> AI Generation
            </div>
            <p className="text-xs text-zinc-400">
              Generate entire responsive web sections with one prompt using Azeorex Intelligence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
