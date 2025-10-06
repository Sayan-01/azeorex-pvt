"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import useViewportView from "@/hooks/useViewportWidth";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: true;
};

export const Container_y = ({ children, className, delay = 0.3, once = true }:Props) => {
  const view = useViewportView();

  if (view >= 900) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: once }}
        transition={{ delay: delay, duration: 0.5, ease: "easeInOut" }}
        className={cn("w-full h-full", className)}
      >
        {children}
      </motion.div>
    );
  } else return <div className="w-full h-full">{children}</div>;
};

export const Container_opacity_only = ({ children, className, delay = 0.3, once = true }:Props) => {
  const view = useViewportView();
  if (view >= 900) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: once }}
        transition={{ delay: delay, duration: 0.4, ease: "easeInOut" }}
        className={cn("w-full h-full", className)}
      >
        {children}
      </motion.div>
    );
  } else return <div className="w-full h-full">{children}</div>;
};
