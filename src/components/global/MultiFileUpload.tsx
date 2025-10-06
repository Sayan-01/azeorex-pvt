import { File, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { UploadDropzone } from "@/lib/uploadthings";
import clsx from "clsx";

type Prop = {
  apiEndpoint: "agencyLogo" | "avatar" | "subaccountLogo" | "media" | "favicon" | "thumbnails";
  onChange: (urls: string[]) => void; // ✅ now array of urls
  value?: string[];
  className?: string;
};

const MultiFileUpload = ({ apiEndpoint, onChange, value = [], className }: Prop) => {
  const handleRemove = (url: string) => {
    onChange(value.filter((v) => v !== url));
  };

  return (
    <div className={clsx("w-full border border-[#2c2d30] rounded-xl p-3 bg-[#202124]", className)}>
      {/* Uploaded files preview */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-2 w-full">
          {value.map((url, idx) => {
            const type = url.split(".").pop();
            return (
              <div
                key={idx}
                className="relative"
              >
                {type !== "pdf" ? (
                  <Image
                    src={url}
                    alt="upload"
                    width={100}
                    height={100}
                    className="object-cover w-full aspect-[16/12] rounded-lg border bg-zinc-900"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-2 text-center">
                    <File />
                    <Link
                      href={url}
                      target="_blank"
                      className="text-xs mt-1 text-indigo-400 hover:underline"
                    >
                      View PDF
                    </Link>
                  </div>
                )}
                <div
                  onClick={() => handleRemove(url)}
                  className="bg-white w-4 h-4 flex items-center justify-center rounded-full pt-0.5 absolute -top-1 -right-1"
                >
                  <X
                    size={12}
                    color="black"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload zone */}
      <UploadDropzone
        className="outline-none"
        endpoint={apiEndpoint}
        onClientUploadComplete={(res) => {
          if (res && res.length > 0) {
            const newUrls = res.map((file) => file.url);
            onChange([...value, ...newUrls]);
          }
        }}
        onUploadError={(error: Error) => {
          console.error(error);
        }}
      />
    </div>
  );
};

export default MultiFileUpload;
