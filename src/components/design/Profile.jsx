import Image from "next/image";
import React from "react";

const Profile = ({ color, avatarUrl, name, description, constant }) => {
  return (
    <div className={`flex flex-col justify-between md:w-1/2 w-full text-left md:p-12 p-6  ${color}`}>
      <div className="flex flex-col ">
        <div className="border-2 md:w-[109px] md:h-[109px] w-[80px] py-6 h-[80px] flex justify-center items-center rounded-full relative">
          <Image
            className="md:h-[90px] md:w-[90px] h-16 w-16"
            src={avatarUrl}
            height={90}
            width={90}
            alt={name}
          />
        </div>

        <p className="text-yellow-500 md:mt-7 mt-4 leading-relaxed uppercase">{name}</p>
        <div className="font-bold md:text-4xl text-3xl md:my-5 my-4 leading-snug">
          {name == "sayan das" ? (
            <>
              Co-founder,
              <br className="block md:hidden" /> CEO and <br className="md:block hidden" /> Senior Developer.
            </>
          ) : (
            <>
              Co-founder and UI / UX
              <br className="lg:block hidden" /> Designer.
            </>
          )}
        </div>
        <div
          className="md:text-lg  max-w-[90%]"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
      <div className="flex  md:mt-6 mt-5">
        {constant.map((item) => {
          return (
            <div
              key={item.id}
              className={`bg-[#1e0160]  hover:-translate-y-2 duration-300 flex items-center justify-center md:border-2 border border-[#1a357d] w-12 h-12 rounded-full overflow-hidden ${
                item.id !== 1 ? "-ml-2" : ""
              }`}
            >
              <Image
                className=" rounded-full"
                src={item.url}
                width={23}
                height={23}
                alt={item.name}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
