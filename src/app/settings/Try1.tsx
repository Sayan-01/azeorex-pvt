"use client";

import React, { useState, useEffect } from "react";

const useElementDimensions = (id:any) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      const element = document.getElementById(id);
      if (element) {
        const { width, height } = element.getBoundingClientRect();
        setDimensions({
          width: Math.round(width),
          height: Math.round(height),
        });
      }
    };

    // Update dimensions initially
    updateDimensions();

    // Add a resize event listener
    window.addEventListener("resize", updateDimensions);

    // Clean up the event listener
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [id]);

  return dimensions;
};

export default function Try1() {
  const dimensions = useElementDimensions("sayan");

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div
        id="sayan"
        style={{
          margin: "50px",
          width: "70%",
          height: "70%",
          border: "1px solid white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Dimensions: {dimensions.width}w x {dimensions.height}h
      </div>
    </div>
  );
}
