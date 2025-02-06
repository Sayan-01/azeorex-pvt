"use client"
import React, { useState } from "react";

const DropArea = () => {
  const [showDrop, setShowDrop] = useState(false)
  return <div onDragEnter={() => setShowDrop(true)} onDragLeave={() => setShowDrop(false)} className={`bg-orange-600 h-[2px] w-full rounded-full ${!showDrop && "hidden"}`}></div>;
};

export default DropArea;
