// import React, { useEffect, useState } from "react";
// import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
// import { Input } from "@/components/ui/custom-input";
// import { Button } from "@/components/ui/button";
// import { useEditor } from "../../../../../../../providers/editor/editor-provider";

// const TailwindClassesSection = () => {
//   const { state, getElementById } = useEditor();
//   const [classes, setClasses] = useState<string[]>([]);
//   const [newClass, setNewClass] = useState("");

//   useEffect(() => {
//     if (!state.selectedElement) return;

//     // set initial classes
//     const currentClasses = state.selectedElement?.className.split(" ").filter((c) => c.trim() !== "");
//     setClasses(currentClasses);

//     // watch for future class changes
//     const observer = new MutationObserver(() => {
//       const updated = state.selectedElement?.className.split(" ").filter((c) => c.trim() !== "");
//       setClasses(updated);
//     });

//     observer.observe(selectedElement, { attributes: true, attributeFilter: ["class"] });
//     return () => observer.disconnect();
//   }, [selectedElement]);

//   // Remove a class
//   const removeClass = (cls: string) => {
//     const updated = classes.filter((c) => c !== cls);
//     setClasses(updated);
//     // selectedElement?.className = updated.join(" ");
//   };

//   // Add new class
//   const addClass = () => {
//     const trimmed = newClass.trim();
//     if (!trimmed) return;
//     if (!classes.includes(trimmed)) {
//       const updated = [...classes, trimmed];
//       setClasses(updated);
//       //   selectedElement?.className = updated.join(" ");
//     }
//     setNewClass("");
//   };

//   return (
//     <AccordionItem
//       value="Classes"
//       className="px-3 py-0 border-none"
//     >
//       <AccordionTrigger className="!no-underline font-semibold">Classes</AccordionTrigger>
//       <AccordionContent className="flex flex-wrap gap-2 mt-2">
//         {classes.length > 0 ? (
//           classes.map((cls) => (
//             <span
//               key={cls}
//               className="flex text-xs items-center gap-1 px-2 py-1 rounded-full bg-zinc-800 border"
//             >
//               {cls}
//               <button
//                 onClick={() => removeClass(cls)}
//                 className="ml-1 text-red-500 hover:text-red-700"
//               >
//                 ×
//               </button>
//             </span>
//           ))
//         ) : (
//           <span className="text-gray-400 text-sm">No classes applied</span>
//         )}
//       </AccordionContent>

//       <div className="flex gap-2 mt-3">
//         <Input
//           className="h-[30px]"
//           value={newClass}
//           onChange={(e) => setNewClass(e.target.value)}
//           placeholder="Add class..."
//         />
//         <Button
//           className="h-[30px]"
//           type="button"
//           onClick={addClass}
//         >
//           Add
//         </Button>
//       </div>
//     </AccordionItem>
//   );
// };

// export default TailwindClassesSection;
