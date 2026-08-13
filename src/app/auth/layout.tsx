import React from "react";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (session) redirect("/");

  return (
    <div className="min-h-screen ">
      <div className="relative flex flex-col md:flex-row h-screen p-4 pr-3">
        {/* Left side - Login Form */}
        <div className="w-full h-full flex items-center justify-center p-4 md:p-8">
          <div className="">{children}</div>
        </div>
        {/* Right - Branding and Info */}
        <div
          className="relative w-full mx-auto md:flex hidden items-center flex-col justify-center p-8 rounded-2xl overflow-hidden "
          style={{ background: 'linear-gradient(145deg, #0a0e27 0%, #1a1145 25%, #2d1b69 50%, #1e3a5f 75%, #0a0e27 100%)' }}
        >
          {/* Floating decorative orbs */}
          <div className="auth-orb auth-orb--1" />
          <div className="auth-orb auth-orb--2" />
          <div className="auth-orb auth-orb--3" />

          {/* Subtle grid overlay */}
          <div className="absolute inset-0 auth-grid-overlay" />

          {/* Content */}
          <div className="relative z-10 w-[420px] mx-auto space-y-8 mb-10">
            {/* Header section */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-sm border border-white/[0.08]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#818cf8] animate-pulse" />
                <span className="text-xs font-semibold tracking-widest text-white/60 uppercase">Welcome to Azeorex</span>
              </div>

              <h1
                className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent auth-shimmer-text"
                style={{
                  backgroundImage: 'linear-gradient(90deg, rgba(165,148,255,0.8), #e0e7ff, #ffffff, #e0e7ff, rgba(165,148,255,0.8))',
                }}
              >
                Welcome Back
              </h1>

              <p className="text-white/50 text-sm leading-relaxed max-w-[360px]">
                Streamline your workflow with our powerful platform. Sign in to access your personalized dashboard.
              </p>
            </div>

            {/* Separator */}
            <div className="auth-accent-line" />

            {/* Feature cards */}
            <div className="space-y-4">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: "Enterprise Security",
                  desc: "Military-grade encryption to keep your data safe",
                  gradient: "from-[#818cf8] to-[#a78bfa]",
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: "Lightning Fast",
                  desc: "Optimized for speed and peak performance",
                  gradient: "from-[#38bdf8] to-[#60a5fa]",
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ),
                  title: "Real-time Analytics",
                  desc: "Powerful insights from your analytics dashboard",
                  gradient: "from-[#c084fc] to-[#e879f9]",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="auth-feature-card group flex items-start gap-4 p-4 rounded-xl bg-white/[0.07] backdrop-blur-md border border-white/[0.1] hover:bg-white/[0.12] hover:border-white/[0.2] transition-all duration-300 hover:translate-x-1"
                >
                  <div className={`flex-shrink-0 p-2.5 rounded-lg bg-gradient-to-br ${item.gradient} text-white shadow-lg`}>
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white text-sm group-hover:translate-x-0.5 transition-transform duration-300">{item.title}</h3>
                    <p className="text-xs text-white/50 mt-0.5 leading-relaxed">{item.desc}</p>
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
