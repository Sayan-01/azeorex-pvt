import UserBtn from "@/app/(landing)/_components/navbar/user-btn";
import { Bell, Message, Settings } from "@/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { auth } from "../../../auth";

const InfoBar = async() => {
  const session = await auth();
  return (
    // <div className="h-[68px] z-[100000] w-full flex items-center justify-between  bg-black top-0 px-4 border-b">
    //   <Link
    //     href="/"
    //     className="md:ml-0 ml-12"
    //   >
    //     <p className="font-bold w-[100px] text-2xl">Sayan.</p>
    //   </Link>
    //   <div className="flex items-center gap-5">
    //     <div className=" md:flex  gap-4 hidden">
    //       <Bell />
    //       <Settings />
    //       <Message />
    //     </div>
    //     {session ? (
    //       <UserBtn
    //         margin="mr-2 mt-5"
    //         imageUrl={session?.user?.image || "/user.png"}
    //         username={session?.user?.name || ""}
    //         email={session?.user?.email || ""}
    //       >
    //         <div className="w-9 h-9 rounded-full overflow-hidden">
    //           <Image
    //             alt="profile-image"
    //             src={session?.user?.image || "/user.png"}
    //             className="w-full h-full"
    //             width={100}
    //             height={100}
    //           />
    //         </div>
    //       </UserBtn>
    //     ) : (
    //       <></>
    //     )}
    //   </div>
    // </div>
    <div></div>
  );
};

export default InfoBar;
