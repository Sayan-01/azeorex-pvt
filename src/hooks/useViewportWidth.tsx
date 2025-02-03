import { useState, useEffect } from "react";

const useViewportWidth = () => {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
  }, []);

  return width;
};

export default useViewportWidth;
