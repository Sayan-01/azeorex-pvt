import { Roboto_Mono } from "next/font/google";
import React, { useEffect, useState } from "react";
import "./AiLoadingAnimation.css"

const LoadingStages = [
  "AI is analyzing your request...",
  "Designing the perfect layout...",
  "Crafting beautiful components...",
  "Optimizing responsive design...",
  "Writing clean code...",
  "Almost ready...",
];

const roboto = Roboto_Mono({ subsets: ["latin"] });

const AiLoadingAnimation = ({loading}: {loading: boolean}) => {
  const [loadingStage, setLoadingStage] = useState(0);
  useEffect(() => {
    if (!loading) {
      setLoadingStage(0);
      return;
    }

    const interval = setInterval(() => {
      setLoadingStage((prev) => (prev + 1) % LoadingStages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [loading]);
  return (
    <div className={`absolute ${roboto.className} inset-0 z-[9999] flex items-start pb-24 justify-center pt-20 bg-black/50 backdrop-blur-sm `}>
      <div className="bg-zinc-900 rounded-3xl shadow-2xl p-5 mx-4 animate-in fade-in slide-in-from-top-4 duration-500 lg:w-[480px] md:w-[400px] w-[300px] lg:scale-100 md:scale-90 scale-75">
        <div className="flex flex-col items-center space-y-6">
          {/* Animated Spinner */}

          <div className="loader-wrapper mb-2 ">
            <span className="loader-letter">G</span>
            <span className="loader-letter">e</span>
            <span className="loader-letter">n</span>
            <span className="loader-letter">e</span>
            <span className="loader-letter">r</span>
            <span className="loader-letter">a</span>
            <span className="loader-letter">t</span>
            <span className="loader-letter">i</span>
            <span className="loader-letter">n</span>
            <span className="loader-letter">g</span>

            <div className="loader"></div>
          </div>

          {/* Stage Text */}
          <div className="text-center space-y-2">
            <h3 className="text-[20px] font-bold text-white animate-pulse">{LoadingStages[loadingStage]}</h3>
            <p className="text-white/80 text-sm">This might take a few seconds</p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${((loadingStage + 1) / LoadingStages.length) * 100}%` }}
            ></div>
          </div>

          {/* Dots Animation */}
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-white rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiLoadingAnimation;
