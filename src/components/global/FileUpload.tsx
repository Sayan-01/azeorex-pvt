import { File, Trash, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { UploadDropzone } from "@/lib/uploadthings";
import clsx from "clsx";

type Prop = {
  apiEndpoint: "agencyLogo" | "avatar" | "subaccountLogo" | "media" | "favicon";
  onChange: (url?: string) => void;
  value?: string;
  className?: string;
};

const FileUpload = ({ apiEndpoint, onChange, value, className }: Prop) => {
  const type = value?.split(".").pop();

  if (value) {
    return (
      <div className="flex flex-col items-center justify-center w-full  rounded-xl h-60 bg-[#202124]">
        {type != "pdf" ? (
          <div className={`relative w-28 h-28 rounded-md overflow-hidden g-[#202124] `}>
            <Image
              src={value}
              alt="upload image"
              className=" object-contain rounded-md overflow-hidden"
              fill
            />
          </div>
        ) : (
          <div className="relative flex items-center p-2 rounded-md bg-[#202124] ">
            <File />
            <Link
              href={value}
              target="_blank"
              className=" ml-2 text-sm text-indigo-400  hover:underline"
            >
              View PDF
            </Link>
          </div>
        )}
        <Button
          className="border  text-red-500 hover:text-red-600 w-28 mt-3 bg-red-500/10 hover:bg-red-500/20 border-red-600/70"
          onClick={() => onChange("")}
          variant="ghost"
          type="button"
        >
          Remove logo
        </Button>
      </div>
    );
  }
  return (
    <div className={clsx("w-full", className)}>
      <UploadDropzone
        className="outline-none mt-0 border-none p-3"
        endpoint={apiEndpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          console.log(error);
        }}
        appearance={{
          container: {
            border: "1px dashed #2c2d30",
            borderRadius: "0.5rem",
            backgroundColor: "#202124",
          },
          uploadIcon: {
            color: "#6366f1",
          },
          label: {
            color: "#e2e8f0",
          },
          button: {
            backgroundColor: "#4f46e5",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "0.375rem",
            margin: "0.5rem 0",
          },
          allowedContent: {
            color: "#9ca3af",
          },
        }}
      />
    </div>
  );
};

export default FileUpload;
