// "use client";
// import clsx from "clsx";
// import React, { useRef, useState } from "react";

// const Page = () => {
//   const boxRef = useRef(null);
//   const [boxSize, setBoxSize] = useState({ width: 160, height: 160 }); // Default size (width: 40px, height: 40px)
//   const [isResizing, setIsResizing] = useState(false);
//   const [resizeDirection, setResizeDirection] = useState(null);

//   const handleMouseDown = (direction) => {
//     setIsResizing(true);
//     setResizeDirection(direction);
//   };

//   const handleMouseMove = (e) => {
//     if (!isResizing || !resizeDirection) return;

//     const box = boxRef.current;
//     const rect = box.getBoundingClientRect();

//     const newSize = { ...boxSize };
//     if (resizeDirection === "e") {
//       newSize.width = Math.max(40, e.clientX - rect.left); // Minimum width: 40px
//     } else if (resizeDirection === "w") {
//       newSize.width = Math.max(40, rect.right - e.clientX);
//     } else if (resizeDirection === "n") {
//       newSize.height = Math.max(40, rect.bottom - e.clientY);
//     } else if (resizeDirection === "s") {
//       newSize.height = Math.max(40, e.clientY - rect.top);
//     }

//     setBoxSize(newSize);
//   };

//   const handleMouseUp = () => {
//     setIsResizing(false);
//     setResizeDirection(null);
//   };

//   return (
//     <div
//       className="relative z-[1004] inset-0"
//       style={{
//         width: `${boxSize.width}px`,
//         height: `${boxSize.height}px`,
//       }}
//       ref={boxRef}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//       onMouseLeave={handleMouseUp} // Stop resizing if mouse leaves the box
//     >
//       <div className="w-full h-full bg-orange-600 z-[1002]">Page 1</div>
//       <div className={clsx("absolute overflow-visible shadow-inner-border-blue-500 pointer-events-none z-[1002] inset-0")}></div>
//       {/* East handle */}
//       <div
//         className={clsx("absolute overflow-visible shadow-inner-border-blue-500 bg-white w-2 h-2 z-[1002] top-1/2 right-0 -translate-y-1/2 translate-x-1/2 cursor-e-resize")}
//         onMouseDown={() => handleMouseDown("e")}
//       ></div>
//       {/* West handle */}
//       <div
//         className={clsx("absolute overflow-visible shadow-inner-border-blue-500 bg-white w-2 h-2 z-[1002] top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 cursor-w-resize")}
//         onMouseDown={() => handleMouseDown("w")}
//       ></div>
//       {/* North handle */}
//       <div
//         className={clsx("absolute overflow-visible shadow-inner-border-blue-500 bg-white w-2 h-2 z-[1002] top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 cursor-n-resize")}
//         onMouseDown={() => handleMouseDown("n")}
//       ></div>
//       {/* South handle */}
//       <div
//         className={clsx("absolute overflow-visible shadow-inner-border-blue-500 bg-white w-2 h-2 z-[1002] bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 cursor-s-resize")}
//         onMouseDown={() => handleMouseDown("s")}
//       ></div>
//     </div>
//   );
// };

// export default Page;
import React from "react";

const page = () => {
  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: "#f9f9f9", display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: "320px",
          maxWidth: "400px",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "1.5rem",
          padding: "12px",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: "800", color: "#4a4a4a", marginBottom: "0.75rem" }}>Azeorex</h1>
        <h3 style={{ color: "#27272a", fontSize: "1.125rem", fontWeight: "600" }}>Confirm your email!</h3>
        <p style={{ color: "#71717a", textAlign: "center", fontSize: "0.875rem" }}>Thanks! Please use the following code to complete your registration.</p>
        <div
          style={{
            backgroundColor: "#ECE3FF",
            borderRadius: "8px",
            padding: "12px 24px",
            margin: "1rem 0",
            letterSpacing: "6px",
            color: "#27272a",
            fontSize: "1.125rem",
            fontWeight: "600",
          }}
        >
          123456
        </div>
        <p style={{ color: "#444", fontSize: "0.875rem" }}>This code is valid for 1 hr</p>
      </div>
    </div>
  );
};

export default page;
