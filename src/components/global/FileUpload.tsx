import { File, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { UploadDropzone } from "@/lib/uploadthings";
import clsx from "clsx";

type Prop = {
  apiEndpoint: "agencyLogo" | "avatar" | "subaccountLogo" | "media";
  onChange: (url?: string) => void;
  value?: string;
  className?: string 
};

const FileUpload = ({ apiEndpoint, onChange, value, className }: Prop) => {
  const type = value?.split(".").pop();

  if (value) {
    return (
      <div className="flex flex-col items-center justify-center">
        {type != "pdf" ? (
          <div className={`relative w-60 h-60 rounded-md overflow-hidden`}>
            <Image
              src={value}
              alt="upload image"
              className=" object-contain rounded-md overflow-hidden"
              fill
            />
          </div>
        ) : (
          <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
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
          className="border-2 border-red-400/20 text-red-400/80 mt-[12px] w-full"
          onClick={() => onChange("")}
          variant="ghost"
          type="button"
        >
          <X className=" h-4 w-4 mr-2" />
          Remove logo
        </Button>
      </div>
    );
  }
  return <div className={clsx(" w-full bg-muted/30 rounded-xl", className)}>
    <UploadDropzone endpoint={apiEndpoint} onClientUploadComplete={(res)=>{
      onChange(res?.[0].url)
    }}
    onUploadError={(error: Error)=> {
      console.log(error);
      
    }}/>
  </div>
};

export default FileUpload;
