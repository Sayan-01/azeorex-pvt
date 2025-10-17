import { UserCircle } from "lucide-react";
import React from "react";

const layout = ({children}:{children:React.ReactNode}) => {
  
  return (
    <div className="md:h-screen md:p-4 md:pl-6">
      <div className="md:border md:rounded-xl h-full w-full bg-zinc-900">
        <nav className="border-b md:p-3 p-6 ">
          <div className="flex items-center text-sm gap-1">
            <p className="opacity-60">My Account /</p>
            <p className="flex items-center gap-1">
              <UserCircle
                className="opacity-60"
                strokeWidth={1.7}
                size={16}
              />
              Profile
            </p>
          </div>
        </nav>
        <section className="p-6">{children}</section>
      </div>
    </div>
  );
};

export default layout;
