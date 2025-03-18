import React from "react";

const Header = ({children}:{children:React.ReactNode}) => {
  return (
    <header className="flex justify-between items-center bg-[#141414] fixed sm:w-[calc(100%-240px)] w-full top-0 z-[40] md:py-7 md:px-7 py-5 px-5">
      {children}
    </header>
  );
};

export default Header;
