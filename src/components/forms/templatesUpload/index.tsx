"use client";
import React, { useState } from "react";
import Wrapper from "../../design/Wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import SelectTheme from "./SelectTheme";
import MultiSelectTest from "./SelectCategory";
import SelectAccess from "./SelectAccess";
import SelectPlatform from "./SelectPlatform";
import SelectFeature from "./SelectFeature";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../../buttons/SubmitBtn";
import SelectImage from "./SelectImage";
import UploadImages from "./uploadImages";
import MultiFileUpload from "@/components/global/MultiFileUpload";

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
    <section className="w-full h-[312px] overflow-y-auto box rounded-2xl border">
      <div className="bg-zinc-900 rounded-2xl shadow-2xl w-fit">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col gap-y-5 p-2">
            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title Field */}
              <div className="space-y-2">
                <Label
                  title="Title"
                  icon="✦"
                />
                <div className="relative group">
                  <Input
                    className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50 text-gray-200 placeholder:text-gray-500 rounded-xl transition-all duration-300 focus:border-blue-400/50 focus:bg-gray-800/60 focus:shadow-lg focus:shadow-blue-500/10 hover:border-gray-600/50"
                    name="title"
                    type="text"
                    placeholder="Enter a captivating title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Price Field */}
              <div className="space-y-2">
                <Label
                  title="Price"
                  icon="💰"
                />
                <div className="relative group">
                  <Input
                    className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50 text-gray-200 placeholder:text-gray-500 rounded-xl transition-all duration-300 focus:border-green-400/50 focus:bg-gray-800/60 focus:shadow-lg focus:shadow-green-500/10 hover:border-gray-600/50"
                    name="price"
                    type="number"
                    placeholder="$29"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    onKeyDown={handleKeyDown}
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <Label
                title="Description"
                icon="📝"
              />{" "}
              <div className="relative group">
                <Input
                  className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50 text-gray-200 placeholder:text-gray-500 rounded-xl transition-all duration-300 focus:border-blue-400/50 focus:bg-gray-800/60 focus:shadow-lg focus:shadow-blue-500/10 hover:border-gray-600/50"
                  name="description"
                  type="text"
                  placeholder="Describe your template briefly"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Long Description Field */}
            <div className="space-y-2">
              <Label
                title="Detailed Description"
                icon="📋"
              />
              <div className="relative group">
                <Input
                  className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50 text-gray-200 placeholder:text-gray-500 rounded-xl transition-all duration-300 focus:border-purple-400/50 focus:bg-gray-800/60 focus:shadow-lg focus:shadow-purple-500/10 hover:border-gray-600/50"
                  name="longDescription"
                  type="text"
                  placeholder="Provide a comprehensive description"
                  value={longDescription}
                  onChange={(e) => setLongDescription(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Theme Selection */}
            <div className="space-y-3">
              <Label
                title="Theme Selection"
                icon="🎨"
              />
              <div className="bg-gray-800/20 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30">
                <SelectTheme
                  value={theme}
                  onChange={setTheme}
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-3">
              <Label
                title="Category"
                icon="📂"
              />
              <div className="bg-gray-800/20 backdrop-blur-sm rounded-xl p-3 border border-gray-700/30">
                <MultiSelectTest
                  value={category}
                  onChange={setCategory}
                />
              </div>
            </div>

            {/* Grid Layout for Select Components */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Access */}
              <div className="space-y-3">
                <Label
                  title="Access Level"
                  icon="🔐"
                />
                <div className="bg-gray-800/20 backdrop-blur-sm rounded-xl p-3 border border-gray-700/30">
                  <SelectAccess
                    value={access}
                    onChange={setAccess}
                  />
                </div>
              </div>
              {/* Platform */}
              <div className="space-y-3">
                <Label
                  title="Platform"
                  icon="💻"
                />
                <div className="bg-gray-800/20 backdrop-blur-sm rounded-xl p-3 border border-gray-700/30">
                  <SelectPlatform
                    value={platform}
                    onChange={setPlatform}
                  />
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <Label
                title="Features"
                icon="⭐"
              />
              <div className="bg-gray-800/20 backdrop-blur-sm rounded-xl p-3 border border-gray-700/30">
                <SelectFeature
                  value={feature}
                  onChange={setFeature}
                />
              </div>
            </div>

            {/* Media Upload Section */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Images */}
                <div className="space-y-3">
                  <Label
                    title="Media & Files"
                    icon="🎬"
                  />
                  {/* <UploadImages
                    images={image}
                    setImages={setImage}
                  /> */}

                  <MultiFileUpload
                    className="bg-[#202124] border border-[#2c2d30] mx-auto"
                    apiEndpoint="thumbnails"
                    value={image}
                    onChange={setImage}
                  />
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label
                    title="Upload File"
                    icon="📁"
                  />
                  <div className="relative group">
                    <Input
                      className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50 text-gray-200 placeholder:text-gray-500 rounded-xl transition-all duration-300 focus:border-orange-400/50 focus:bg-gray-800/60 focus:shadow-lg focus:shadow-orange-500/10 hover:border-gray-600/50"
                      name="file"
                      type="text"
                      placeholder="Upload your template file"
                      value={file}
                      onChange={(e) => setFile(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
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
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] border-0"
                loading={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
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

const Label = ({ title, icon }: { title: string; icon: string }) => {
  return (
    <div className="flex items-center gap-3 group cursor-default">
      <div className="relative">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-gray-700/30 group-hover:border-blue-500/30 transition-all duration-300">
          <span className="text-sm group-hover:scale-110 transition-transform duration-300">{icon}</span>
        </div>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="space-y-1">
        <h4 className="text-sm font-bold text-gray-200 tracking-wide group-hover:text-white transition-colors duration-300">{title}</h4>
        <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"></div>
      </div>
    </div>
  );
};
export default TemplatesUpload;
