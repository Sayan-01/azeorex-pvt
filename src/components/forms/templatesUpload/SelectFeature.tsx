import { Input } from "@/components/ui/input";
import React from "react";

const SelectFeature = ({ value, onChange }: { value: string[]; onChange: (arg0: string[]) => void }) => {
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
              className="flex items-centermr-2 px-2 py-1 mr-5 mb-1 rounded border "
            >
              <span>{tag}</span>
              <i
                className="ml-2 text-gray-600 cursor-pointer"
                onClick={() => removeTag(tag)}
              >
                &times;
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
      <p className="text-sm mt-2">Press enter after each tag</p>

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

export default SelectFeature;
