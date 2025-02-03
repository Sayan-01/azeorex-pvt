// "use client";
// import "./try3.css";
// import React, { useState } from "react";

// const ResizableDiv = () => {
//   const [dimensions, setDimensions] = useState({
//     width: 300,
//     height: 200,
//   });

//   const [position, setPosition] = useState({
//     x: 0,
//     y: 0,
//   });

//   const handleResize = (e, direction) => {
//     e.preventDefault();

//     const startWidth = dimensions.width;
//     const startHeight = dimensions.height;
//     const startX = e.clientX;
//     const startY = e.clientY;

//     const onMouseMove = (event) => {
//       let newWidth = startWidth;
//       let newHeight = startHeight;

//       if (direction.includes("right")) {
//         newWidth = Math.max(100, startWidth + (event.clientX - startX));
//       }
//       if (direction.includes("bottom")) {
//         newHeight = Math.max(100, startHeight + (event.clientY - startY));
//       }
//       if (direction.includes("left")) {
//         newWidth = Math.max(100, startWidth - (event.clientX - startX));
//         setPosition((prev) => ({ ...prev, x: position.x + (event.clientX - startX) }));
//       }
//       if (direction.includes("top")) {
//         newHeight = Math.max(100, startHeight - (event.clientY - startY));
//         setPosition((prev) => ({ ...prev, y: position.y + (event.clientY - startY) }));
//       }

//       setDimensions({ width: newWidth, height: newHeight });
//     };

//     const onMouseUp = () => {
//       window.removeEventListener("mousemove", onMouseMove);
//       window.removeEventListener("mouseup", onMouseUp);
//     };

//     window.addEventListener("mousemove", onMouseMove);
//     window.addEventListener("mouseup", onMouseUp);
//   };

//   return (
//     <div
//       style={{
//         width: `${dimensions.width}px`,
//         height: `${dimensions.height}px`,
//         background: "#ddd",
//         position: "relative",
//         top: position.y,
//         left: position.y,
//       }}
//     >
//       <div
//         style={{ padding: "10px" }}
//         className="text-black"
//       >
//         w: {dimensions.width} h: {dimensions.height}
//       </div>

//       {/* Resizer Handlers */}
//       {["top-left", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left"].map((position) => (
//         <div
//           key={position}
//           onMouseDown={(e) => handleResize(e, position)}
//           className={`resizer ${position}`}
//         />
//       ))}
//     </div>
//   );
// };

// export default ResizableDiv;
