// 'use client'
// import React, { useState, useRef } from "react";

// const ResizableDivDs = () => {
//   const [width, setWidth] = useState(300);
//   const [height, setHeight] = useState(200);
//   const [isResizing, setIsResizing] = useState(false);
//   const [resizeDirection, setResizeDirection] = useState(null);
//   const divRef = useRef(null);

//   const handleMouseDown = (direction, e) => {
//     e.preventDefault();
//     setIsResizing(true);
//     setResizeDirection(direction);
//   };

//   const handleMouseMove = (e) => {
//     if (!isResizing) return;

//     const { clientX, clientY } = e;
//     const { left, top, right, bottom } = divRef.current.getBoundingClientRect();

//     switch (resizeDirection) {
//       case "top":
//         setHeight((prevHeight) => bottom - clientY);
//         break;
//       case "bottom":
//         setHeight((prevHeight) => clientY - top);
//         break;
//       case "left":
//         setWidth((prevWidth) => right - clientX);
//         break;
//       case "right":
//         setWidth((prevWidth) => clientX - left);
//         break;
//       case "top-left":
//         setWidth((prevWidth) => right - clientX);
//         setHeight((prevHeight) => bottom - clientY);
//         break;
//       case "top-right":
//         setWidth((prevWidth) => clientX - left);
//         setHeight((prevHeight) => bottom - clientY);
//         break;
//       case "bottom-left":
//         setWidth((prevWidth) => right - clientX);
//         setHeight((prevHeight) => clientY - top);
//         break;
//       case "bottom-right":
//         setWidth((prevWidth) => clientX - left);
//         setHeight((prevHeight) => clientY - top);
//         break;
//       default:
//         break;
//     }
//   };

//   const handleMouseUp = () => {
//     setIsResizing(false);
//     setResizeDirection(null);
//   };

//   React.useEffect(() => {
//     if (isResizing) {
//       window.addEventListener("mousemove", handleMouseMove);
//       window.addEventListener("mouseup", handleMouseUp);
//     } else {
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mouseup", handleMouseUp);
//     }

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [isResizing]);

//   return (
//     <div
//       ref={divRef}
//       className="relative border-2 border-white m-5"
//       style={{ width: `${width}px`, height: `${height}px` }}
//     >
//       {/* Resizable Handlers */}
//       <div
//         className="absolute top-0 left-0 right-0 h-1.5 bg-blue-400 cursor-ns-resize"
//         onMouseDown={(e) => handleMouseDown("top", e)}
//       />
//       <div
//         className="absolute bottom-0 left-0 right-0 h-1.5 bg-blue-400 cursor-ns-resize"
//         onMouseDown={(e) => handleMouseDown("bottom", e)}
//       />
//       <div
//         className="absolute top-0 left-0 w-1.5 h-full bg-blue-400 cursor-ew-resize"
//         onMouseDown={(e) => handleMouseDown("left", e)}
//       />
//       <div
//         className="absolute top-0 right-0 w-1.5 h-full bg-blue-400 cursor-ew-resize"
//         onMouseDown={(e) => handleMouseDown("right", e)}
//       />
//       <div
//         className="absolute top-0 left-0 w-2.5 h-2.5 bg-blue-400 cursor-nwse-resize"
//         onMouseDown={(e) => handleMouseDown("top-left", e)}
//       />
//       <div
//         className="absolute top-0 right-0 w-2.5 h-2.5 bg-blue-400 cursor-nesw-resize"
//         onMouseDown={(e) => handleMouseDown("top-right", e)}
//       />
//       <div
//         className="absolute bottom-0 left-0 w-2.5 h-2.5 bg-blue-400 cursor-nesw-resize"
//         onMouseDown={(e) => handleMouseDown("bottom-left", e)}
//       />
//       <div
//         className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-blue-400 cursor-nwse-resize"
//         onMouseDown={(e) => handleMouseDown("bottom-right", e)}
//       />
//     </div>
//   );
// };

// export default ResizableDivDs;
