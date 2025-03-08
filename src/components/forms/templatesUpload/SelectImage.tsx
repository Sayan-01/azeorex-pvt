import React from "react";
import Image from "next/image";
import { HiOutlineXMark } from "react-icons/hi2";
import { Input } from "@/components/ui/input";

const SelectImage = ({ value, onChange }: { value: string[]; onChange: (arg0: string[]) => void }) => {
  const maxTags = 10;

  const addTag = (e:any) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault(); // Prevent form submission
      let tag = e.target.value.trim();
      if (tag && !value.includes(tag) && value.length < maxTags) {
        onChange([...value, tag]);
        e.target.value = "";
      }
    }
  };

  const removeTag = (tag:string) => {
    onChange(value.filter((t) => t !== tag));
  };

  const removeAllTags = () => {
    onChange([]);
  };

  return (
    <div className="w-full flex flex-col">
      <div>
        <ul className="flex flex-wrap items-center rounded ">
          {value.map((tag, index) => (
            <li
              key={index}
              className="flex px-2 py-2  mr-4 mb-4 rounded border relative"
            >
              <span>
                <Image
                alt={tag}
                  src={tag}
                  height={100}
                  width={80}
                  className="w-32 aspect-[10/7]"
                />
              </span>
              <i
                className="ml-2 cursor-pointer w-6 h-6 flex p-1 items-center justify-center border border-white rounded-full absolute top-4 right-4 text-white"
                onClick={() => removeTag(tag)}
              >
                <HiOutlineXMark size={26} />
              </i>
            </li>
          ))}
          <Input
            type="text"
            spellCheck="false"
            onKeyDown={addTag} // Use onKeyDown to prevent default behavior
          />
        </ul>
      </div>
      <p className="text-sm mb-5">Press enter after each tag</p>

      <div className="flex justify-between mt-4">
        <button
          className="bg-blue-600 text-white text-sm py-1 px-3 rounded hover:bg-blue-700"
          onClick={removeAllTags}
        >
          Remove All
        </button>
      </div>
    </div>
  );
};

export default SelectImage;
