"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxContainerProps {
  children: React.ReactNode;
  stickyContent: React.ReactNode;
}

const ParallaxContainer = ({ children, stickyContent }: ParallaxContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: pricingRef,
    offset: ["start start", "end end"],
  });

  // Upper content moves up as we scroll
  const upperY = useTransform(scrollYProgress, [0, 0.5], [0, -400]);

  // Blur increases as we scroll past the sticky point
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 20]);

  // Opacity decreases as blur increases
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  return (
    <div
      ref={containerRef}
      className="relative"
    >
      {/* Upper content that scrolls away */}
      <motion.div
        className="relative z-10"
        style={{ y: upperY }}
      >
        {children}
      </motion.div>

      {/* Sticky pricing section container */}
      <div
        ref={pricingRef}
        className="relative"
        style={{
          minHeight: "200vh",
        }}
      >
        {/* Fixed pricing card */}
        <motion.div
          className="sticky top-0 left-0 right-0 z-20 bg-background"
          style={{
            filter: useTransform(blur, (v) => `blur(${v}px)`),
            opacity,
          }}
        >
          {stickyContent}
        </motion.div>
      </div>
    </div>
  );
};

export default ParallaxContainer;
