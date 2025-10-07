"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const ClientDashboardBtn = ({ children, btnClass, childrenClass, href }) => {
  const {data: session} = useSession()
  const isLogin = !!session?.user

  return (
    <button
      className={`w-full ${btnClass}`}
      disable={isLogin}
      onClick={() => {
        if (isLogin) return;
        else {
          toast({
            variant: "destructive",
            title: "User is not Loged In",
          });
        }
      }}
    >
      {session?.user ? (
        <Link
          href={href}
          className={`${childrenClass}`}
        >
          {children}
        </Link>
      ) : (
        <div className={`${childrenClass}`}>{children}</div>
      )}
    </button>
  );
};

export default ClientDashboardBtn;
