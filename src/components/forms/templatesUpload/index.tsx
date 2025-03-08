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

interface DefaultData {
  title: string;
  description: string;
  funnelPage: any; 
}

interface TemplatesUploadProps {
  defaultData: DefaultData;
}

const TemplatesUpload: React.FC<TemplatesUploadProps> = ({defaultData}) => {
  console.log("sayan",defaultData);
  
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
    setLoading(true); // Set loading to true
    let poductResponce = await fetch(`/api/products`, {
      cache: "no-store",
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ title, description, longDescription, theme, category, access, price, platform, feature, image, file, FunnelPages }),
    });

    const responce = await poductResponce.json();
    setLoading(false); // Set loading to false
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
    <section className="w-full h-[580px] overflow-y-auto box-1">
      <Card className="bg-[#09090B] border-0 p-5">
        <form onSubmit={handleSubmit}>
          <CardHeader className="p-0 py-6">
            <CardTitle className="text-3xl ">Sell your Product</CardTitle>
            <CardDescription className="">Please describe your product details here</CardDescription>

            <h4 className="!mt-8">Company Profile</h4>
            <CardDescription className="max-w-[1400px]">Innovative software company providing scalable, custom web solutions and automation services.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-6 border-t p-0 py-6">
            <div className="flex flex-col md:flex-row border-b pb-2">
              <Label
                title="Title"
                description="Innovative software company providing scalable, custom web solutions and automation services."
              />
              <Input
                className="mt-0"
                name="title"
                type="text"
                placeholder="Enter a title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="flex flex-col md:flex-row border-b pb-2">
              <Label
                title="Description"
                description="Innovative software company providing scalable, custom web solutions and automation services."
              />
              <Input
                className="mt-0"
                name="description"
                type="text"
                placeholder="Enter a description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="flex flex-col md:flex-row border-b pb-2">
              <Label
                title="Long Description"
                description="Innovative software company providing scalable, custom web solutions and automation services."
              />
              <Input
                className="mt-0"
                name="longDescription"
                type="text"
                placeholder="Enter a detail description"
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="flex flex-col md:flex-row border-b pb-6">
              <Label
                title="Theme"
                description="Innovative software company providing scalable, custom web solutions and automation services."
              />
              <SelectTheme
                value={theme}
                onChange={setTheme}
              />
            </div>
            <div className="flex flex-col md:flex-row border-b pb-6">
              <Label
                title="Category"
                description="( Enter minimum five Category ) Innovative software company providing scalable, custom web solutions and automation services."
              />
              <MultiSelectTest
                value={category}
                onChange={setCategory}
              />
            </div>
            <div className="flex flex-col md:flex-row border-b pb-6">
              <Label
                title="Access"
                description="Innovative software company providing scalable, custom web solutions and automation services."
              />
              <SelectAccess
                value={access}
                onChange={setAccess}
              />
            </div>
            <div className="flex flex-col md:flex-row border-b pb-2">
              <Label
                title="Price"
                description="Innovative software company providing scalable, custom web solutions and automation services."
              />
              <Input
                className="mt-0"
                name="price"
                type="number"
                placeholder="$29"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="flex flex-col md:flex-row border-b pb-6">
              <Label
                title="Platform"
                description="Innovative software company providing scalable, custom web solutions and automation services."
              />
              <SelectPlatform
                value={platform}
                onChange={setPlatform}
              />
            </div>
            <div className="flex flex-col md:flex-row border-b pb-6">
              <Label
                title="Enter features as tag"
                description="( Enter minimum three Feature ) Innovative software company providing scalable, custom web solutions and automation services."
              />
              <SelectFeature
                value={feature}
                onChange={setFeature}
              />
            </div>
            <div className="flex flex-col md:flex-row border-b pb-6">
              <Label
                title="Upload Images"
                description="( Enter maximum 3 different Image ) Innovative software company providing scalable, custom web solutions and automation services."
              />
              <SelectImage
                value={image}
                onChange={setImage}
              />
              {/* <Input className='mt-0'
                  name="image"
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  onKeyDown={handleKeyDown}
                /> */}
            </div>
            <div className="flex flex-col md:flex-row border-b pb-2">
              <Label
                title="Upload File"
                description="Innovative software company providing scalable, custom web solutions and automation services."
              />
              <Input
                className="mt-0"
                name="file"
                type="text"
                placeholder="file"
                value={file}
                onChange={(e) => setFile(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            {error ? (
              <>
                <div className="text-red-500 border border-red-500 bg-red-500/10 p-1 px-3 rounded-[3px] text-center">{error}</div>
              </>
            ) : (
              ""
            )}
            <SubmitButton
              disable_className="w-full"
              className="w-full "
              loading={loading}
            >
              Add Topic
            </SubmitButton>
          </CardContent>
        </form>
      </Card>
    </section>
  );
};

const Label = ({ title, description }:{title: string, description: string}) => {
  return (
    <div className='max-w-[600px] mr-6 mb-4 md:mb-0'>
      <h4>{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default TemplatesUpload;
