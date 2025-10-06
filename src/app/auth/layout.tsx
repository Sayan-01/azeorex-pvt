import React from "react";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (session) redirect("/");

  return (
    <div className="min-h-screen ">
      <div className="relative flex flex-col md:flex-row h-screen p-2">
        {/* Right side - Login Form */}
        <div className="w-full h-full flex items-center justify-center p-4 md:p-8">
          <div className="">{children}</div>
        </div>
        {/* Left side - Branding and Info */}
        <div className="w-full mx-auto space-y-8 md:flex hidden items-center flex-col justify-center p-8 rounded-2xl bg-gradient-to-br from-gray-900 via-purple-900  to-gray-900">
          {/* <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80" />
          </div> */}
          <div className="w-[400px] mx-auto space-y-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                <span className="text-sm font-medium text-purple-400">WELCOME TO AZEOREX</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-300% animate-gradient">Welcome Back</h1>
              <p className="text-gray-400 text-sm">Streamline your workflow with our powerful platform. Sign in to access your dashboard.</p>
            </div>

            <div className="space-y-5 pt-2">
              {[
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-purple-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  ),
                  title: "Enterprise Security",
                  desc: "Military-grade encryption to keep your data safe",
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  ),
                  title: "Lightning Fast",
                  desc: "Optimized for speed and performance",
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-pink-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  ),
                  title: "Real-time Analytics",
                  desc: "Get insights with our powerful analytics dashboard",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 group"
                >
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-all duration-300">{item.icon}</div>
                  <div>
                    <h3 className="font-medium text-gray-200 group-hover:text-white transition-colors">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
