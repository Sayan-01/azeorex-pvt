'use client'
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { ArrowUp, CircleUser, ImagePlus as Imagee, X } from "lucide-react";
import Image from "next/image";

const AiComponent = () => {
  const [userInput, setUserInput] = useState("");
  const [referanceImage, setReferanceImage] = useState<any>();
  const [referanceImagePreview, setReferanceImagePreview] = useState<string>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    console.log("Hi client!", userInput);

    try {
      const formData = new FormData();
      formData.append("userInput", userInput);
      formData.append("referanceImage", referanceImage);
      const response = await fetch("/api/youtube-content-api/generate-thumbnail", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="flex items-center flex-col w-full max-w-3xl mx-auto  mt-8">
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
      <h1 className="text-3xl font-semibold">
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
            htmlFor="referanceImage"
            className="rounded-full px-3 h-8 bg-zinc-800/70 border flex items-center justify-center gap-1.5 text-white/80 text-sm"
          >
            <Imagee size={16} />
            Referace Image
          </label>
          <input
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
          >
            <ArrowUp color="black" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AiComponent;
