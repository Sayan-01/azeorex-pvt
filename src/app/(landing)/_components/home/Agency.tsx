import React from "react";

const Agency = () => {
  return (
    <div className="relative min-h-[600px] flex flex-col justify-center items-center overflow-hidden bg-[#020617] p-4">
      {/* Background Glow Container */}
      <div className="absolute md:inset-x-4 inset-x-0 bottom-4 top-4 md:rounded-[40px] glow-bottom border-b border-sky-500/20 pointer-events-none"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 space-y-8 animate-in fade-in zoom-in duration-1000">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-normal tracking-tight text-slate-200">
            Designing the Future, <span className="text-slate-300">Building Digital Success</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">Innovating digital success through creative design. Elevate your online presence with us.</p>
        </div>

        <div className="flex items-center justify-center gap-4 pt-4">
          <button className="px-4 md:px-8 md:py-3.5 py-2 bg-white text-slate-900 font-medium rounded-full hover:bg-slate-200 transition-all transform hover:scale-105 active:scale-95 shadow-lg">
            Contact Us
          </button>
        </div>
      </div>

      {/* Floating UI Decorative Elements */}
      <div className="absolute top-12 left-12 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-12 right-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
    </div>
  );
};

export default Agency;
