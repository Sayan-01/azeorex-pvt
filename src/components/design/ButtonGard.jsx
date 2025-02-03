import React from "react";

const ButtonGard = ({className}) => {
  return (
    <>
      <div className={`mb-4 mt-4 sm:mt-0 sm:w-max w-fulll`}>
        <button className="sss p-[3px] sm:w-max w-full flex items-center justify-center bg-gradient-to-r from-purple-600 via-blue-700 to-pink-500 rounded-[14px]">
          <div className="p-5 flex justify-center py-3 sm:w-max w-full rounded-xl bg-[#02031C] font-semibold">
            <span class="flex items-center justify-center w-6 h-6 bg-gray-800 rounded-full mr-2">
              <svg
                class="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
            </span>
            Create Template
          </div>
        </button>
      </div>
    </>
  );
};

export default ButtonGard;
