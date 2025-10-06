import { UserCircle } from "lucide-react";
import React from "react";

const layout = ({children}:{children:React.ReactNode}) => {
  
  return (
    <div className="h-screen p-4 pl-6">
      <div className="border rounded-xl h-full w-full bg-zinc-900">
        <nav className="border-b p-3">
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
