"use client";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const uploadImages = ({ images, setImages }: { images: string[]; setImages: any}) => {
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // const onSubmit = async () => {
  //   setLoading(true);
  //   console.log("Hi client!", image);

  //   try {
  //     const formData = new FormData();
  //     formData.append("templateImage", templateImage);
  //     const response = await fetch("/api/youtube-content-api/generate-thumbnail", {
  //       method: "POST",
  //       body: formData,
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  return (
    <div>
      {imagePreview ? (
        <div className="grid grid-cols-3 gap-2 items-center w-full mb-2 ">
          {imagePreview ? (
            imagePreview.map((image, idx) => {
              return (
                <div
                  className="relative"
                  key={image}
                >
                  <Image
                    src={image as string}
                    className="object-cover w-16 h-12 rounded-lg"
                    alt="referanceImage"
                    width={100}
                    height={100}
                  />
                  <div
                    onClick={() => setImagePreview((prev) => prev.filter((img) => img !== image))}
                    className="bg-white w-4 h-4 flex items-center justify-center rounded-full pt-0.5 absolute -top-1 -right-1"
                  >
                    <X
                      size={12}
                      color="black"
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
      <div>
        <label
          htmlFor="image"
          className="rounded-full px-4 h-10 bg-zinc-800/70 border flex items-center justify-center gap-1.5 text-white/80 text-sm"
        >
          <ImagePlus size={16} />
          Referace Image
        </label>
        <input
          type="file"
          id="image"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const imageURL = URL.createObjectURL(file);
              setImages((prev:string[]) => [...prev, imageURL]);
              setImagePreview((prev:string[]) => [...prev, imageURL]);
            }
          }}
        />
      </div>
    </div>
  );
};

export default uploadImages;
