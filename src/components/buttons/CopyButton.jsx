// "use client";
// import { cn } from "@/lib/utils";
// import React from "react";
// import { useState } from "react";
// import { Button } from "../ui/button";
// import Link from "next/link";

// const CopyButton = ({ className, children, fileUrl }) => {
//   const copyToClipBoard = async () => {
//     try {
//       console.log("Fetching file from URL:", fileUrl);
//       const response = await fetch(fileUrl);

//       if (!response.ok) {
//         throw new Error(`Network response was not ok: ${response.statusText}`);
//       }

//       const contentType = response.headers.get("Content-Type");

//       if (contentType.includes("image/svg+xml")) {
//         const svgText = await response.text();
//         await navigator.clipboard.writeText(svgText);
//         console.log("SVG image copied to clipboard successfully!");
//       } else {
//         console.error("The provided file is not an SVG. Only SVG files are supported for this operation.");
//       }
//     } catch (error) {
//       console.error("Failed to copy file to clipboard:", error);
//     }
//   };
//   const [open, setOpen] = useState(false);
//   const [openState, setOpenState] = useState("hidden");

//   const show = () => {
//     setOpen((prevOpen) => {
//       if (!prevOpen) {
//         setOpenState("p-2 w-full bg-black-200 border-2 z-50 border-bor-200 mt-4 rounded-lg ");
//       } else {
//         setOpenState("hidden");
//       }
//       return !prevOpen;
//     });
//   };

//   return (
//     <div className="relative w-full">
//       <button
//         onClick={show}
//         className={` cursor-pointer ${className}`}
//       >
//         {children}
//       </button>
//       <div className={cn(`absolute duration-500`, openState)}>
//         <ul className={` mb-4`}>
//           <li className="text-sm opacity-70 mb-2">
//             &bull; Currently Buy now feature is in beta stage. If you need this template then presurve this by click heart icon. And you show this in dashboard
//           </li>
//           <li className="text-sm opacity-70">
//             &bull; If its uregent then plese contact with us in our mail ID:{" "}
//             <span className="text-blue-400">
//               <Link href="mailto:azeorex01@gmail.com">azeorex01@gmail.com</Link>
//             </span>
//           </li>
//         </ul>
//         <Button
//           size="small"
//           onClick={show}
//           className="py-1 text-center w-full text-sm"
//         >
//           All right
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default CopyButton;

"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

const CopyButton = ({ className, children, fileUrl }) => {
  
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className={`${className}`}>{children}</button>
        </DialogTrigger>
        <DialogContent>
          <div className={"my-5"}>
            <ul className={` mb-4`}>
              <li className="text-lg opacity-70 mb-2">
                &bull; Currently Buy now or dowenload feature is in beta stage. If you need this template then presurve this by click heart icon. And you show this in dashboard
              </li>
              <li className="text-lg opacity-70">
                &bull; If its uregent then please contact with us in our mail ID:{" "}
                <span className="text-blue-400">
                  <Link href="mailto:azeorex01@gmail.com">azeorex01@gmail.com</Link>
                </span>
              </li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CopyButton;
