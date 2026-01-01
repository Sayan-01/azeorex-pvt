"use client";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { ArrowUp, CircleUser, ImagePlus as Imagee, X } from "lucide-react";
import Image from "next/image";
import { v4 } from "uuid";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCredits } from "@/hooks/credit-provider";

const AiComponent = ({ userId }: { userId: string | undefined }) => {
  const [userInput, setUserInput] = useState("");
  const [referanceImage, setReferanceImage] = useState<any>();
  const [referanceImagePreview, setReferanceImagePreview] = useState<string>();
  const [loading, setLoading] = useState(false);
  const {credits} = useCredits()

  const router = useRouter();
  const onSubmit = async () => {
    if (credits < 100) {
      toast.error("Not enough credits");
      return;
    }
    if (!userInput) {
      toast.error("Please fill all the fields");
      return;
    }
    if (!userId) {
      toast.error("Please login to create a project");
      return;
    }
    setLoading(true);
    try {
      const projectId = v4();
      const funnelPageId = v4();
      const message = [
        {
          role: "user",
          content: userInput,
        },
      ];
      const formData = new FormData();
      formData.append("messages", JSON.stringify(message));
      formData.append("projectId", projectId);
      formData.append("funnelPageId", funnelPageId);
      formData.append("userId", userId);

      const response = await fetch("/api/ai/ai-project-create", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message || "Project created successfully");
        router.push(`/playground/${funnelPageId}?userId=${userId}&projectId=${projectId}`);
      } else {
        console.log(data);
        toast.error(data.message || "Failed to create project");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="flex items-center flex-col w-full max-w-3xl mx-auto  md:mt-8 mt-10 p-6">
      <div className="w-full mb-6">
        <div className="flex items-center justify-start ">
          <Link
            href={"/saas/projects"}
            className="px-3 py-1.5 flex items-center gap-2 rounded-full bg-[#1e1f22] text-[12px] text-zinc-500 hover:text-zinc-300 duration-200"
          >
            <ArrowLeft size={13} />
            <p>Back</p>
          </Link>
        </div>
      </div>
      <h1 className="md:text-3xl text-2xl font-semibold text-center">
        Generate with <span className="text-orange-300">Creative AI</span>
      </h1>
      <p className="text-sm opacity-60 mt-1">What would like to create today</p>
      <div className="p-3 w-full rounded-2xl bg-[#ffffff08] mt-6">
        {referanceImagePreview ? (
          <div className="flex gap-2 items-center w-full mb-3">
            {referanceImagePreview ? (
              <div className="relative">
                <Image
                  src={referanceImagePreview as string}
                  className="object-cover w-18 h-18 rounded-lg"
                  alt="referanceImage"
                  width={100}
                  height={100}
                />
                <div
                  onClick={() => setReferanceImagePreview(undefined)}
                  className="bg-white w-4 h-4 flex items-center justify-center rounded-full pt-0.5 absolute -top-1 -right-1"
                >
                  <X
                    size={12}
                    color="black"
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
        <div className="flex gap-2 items-center w-full">
          <textarea
            onChange={(e) => setUserInput(e.target.value)}
            className="outline-0 h-16 resize-none flex text-white/70 w-full rounded-md bg-transparent text-sm placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="🏀 Enter your video title or description"
          />
        </div>
        <div className=" flex gap-3 ">
          <label
            htmlFor="referenceImage"
            className="group relative opacity-80 flex items-center justify-between gap-1.5 h-8 px-3 rounded-full bg-zinc-800/70 border border-zinc-700 text-white/80 text-sm cursor-pointer overflow-hidden transition-all duration-300 ease-in-out w-[160px] hover:w-[262px]"
          >
            <div className="flex gap-1.5 items-center justify-center">
              <Imagee
                size={16}
                className="shrink-0"
              />
              <span className="whitespace-nowrap">Reference Image</span>
            </div>
            <span className="absolute right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-white/60">(coming soon)</span>
          </label>
          <input
            disabled
            type="file"
            id="referanceImage"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setReferanceImage(file);
                setReferanceImagePreview(URL.createObjectURL(file));
              }
            }}
          />
          <button
            className="h-8 w-8 flex items-center justify-center ml-auto bg-gradient-to-br from-zinc-50 to-zinc-200 rounded-full"
            type="submit"
            onClick={onSubmit}
            disabled={!userInput || loading}
          >
            {loading ? (
              <Loader2
                className="animate-spin text-[#444444]"
                size={16}
              />
            ) : (
              <ArrowUp
                color="#444444"
                size={16}
              />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default AiComponent;
