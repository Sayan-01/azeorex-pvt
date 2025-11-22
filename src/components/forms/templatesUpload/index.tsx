"use client";
import React, { useState } from "react";

import { Input } from "../../ui/input";
import SelectTheme from "./SelectTheme";
import MultiSelectTest from "./SelectCategory";
import SelectAccess from "./SelectAccess";
import SelectPlatform from "./SelectPlatform";
import SelectFeature from "./SelectFeature";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../../buttons/SubmitBtn";
import MultiFileUpload from "@/components/global/MultiFileUpload";
import { Label as AzLabel } from "../../ui/label";

interface DefaultData {
  title: string;
  description: string;
  funnelPage: any;
}

interface TemplatesUploadProps {
  defaultData: DefaultData;
}

const TemplatesUpload: React.FC<TemplatesUploadProps> = ({ defaultData }) => {
  const [title, setTitle] = useState<string>(defaultData.title);
  const [description, setDescription] = useState<string>(defaultData.description);
  const [longDescription, setLongDescription] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [category, setCategory] = useState<string[]>([]);
  const [access, setAccess] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [platform, setPlatform] = useState<string[]>([]);
  const [feature, setFeature] = useState<string[]>([]);
  const [image, setImage] = useState<string[]>([]);
  const [file, setFile] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [FunnelPages, setFunnelPages] = useState<any>(defaultData.funnelPage);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let poductResponce = await fetch(`/api/products`, {
      cache: "no-store",
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ title, description, longDescription, theme, category, access, price, platform, feature, image, file, FunnelPages }),
    });

    const responce = await poductResponce.json();
    setLoading(false);
    if (poductResponce.ok) {
      router.push("/");
    } else setError(responce.error);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <section className="w-full h-full ">
      <div className="bg-zinc-900 rounded-2xl shadow-2xl w-fit">
        <form
          onSubmit={handleSubmit}
          className="w-full"
        >
          <div className="flex flex-col gap-y-5">
            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title Field */}
              <div className="space-y-2">
                <AzLabel children="Title" />
                <div className="relative group">
                  <Input
                    name="title"
                    type="text"
                    placeholder="Enter a captivating title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>

              {/* Price Field */}
              <div className="space-y-2">
                <AzLabel children="Price" />
                <div className="relative group">
                  <Input
                    name="price"
                    type="number"
                    placeholder="$29"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <AzLabel children="Description" />{" "}
              <div className="relative group">
                <Input
                  name="description"
                  type="text"
                  placeholder="Describe your template briefly"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>

            {/* Long Description Field */}
            <div className="space-y-2">
              <AzLabel children="Detailed Description" />
              <div className="relative group">
                <Input
                  name="longDescription"
                  type="text"
                  placeholder="Provide a comprehensive description"
                  value={longDescription}
                  onChange={(e) => setLongDescription(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>

            {/* Theme Selection */}
            <div className="space-y-3">
              <AzLabel children="Theme Selection" />
              <SelectTheme
                value={theme}
                onChange={setTheme}
              />
            </div>

            {/* Category */}
            <div className="space-y-3">
              <AzLabel children="Category (minimum 5)" />
              <MultiSelectTest
                value={category}
                onChange={setCategory}
              />
            </div>

            {/* Grid Layout for Select Components */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Access */}
              <div className="space-y-3">
                <AzLabel children="Access Level" />
                <SelectAccess
                  value={access}
                  onChange={setAccess}
                />
              </div>
              {/* Platform */}
              <div className="space-y-3">
                <AzLabel children="Platform" />
                <SelectPlatform
                  value={platform}
                  onChange={setPlatform}
                />
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <AzLabel children="Features (minimum 3)" />
              <SelectFeature
                value={feature}
                onChange={setFeature}
              />
            </div>

            {/* Media Upload Section */}
            <div className="grid grid-cols-1 gap-4">
              {/* Images */}
              <div className="space-y-3">
                <AzLabel children="Media & Files" />
                <MultiFileUpload
                  className="bg-[#202124] border border-[#2c2d30] mx-auto"
                  apiEndpoint="thumbnails"
                  value={image}
                  onChange={setImage}
                />
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <AzLabel children="Upload File" />
                <Input
                  name="file"
                  type="text"
                  placeholder="Upload your template file"
                  value={file}
                  onChange={(e) => setFile(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/30 text-red-400 p-4 rounded-xl text-center animate-pulse">
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  {error}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <SubmitButton
                disable_className="w-full opacity-50"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] border-0"
                loading={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    Add Template
                  </div>
                )}
              </SubmitButton>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default TemplatesUpload;
