// "use client";
// import { Loader } from "@/components/global/Loader";
// import { Badge } from "@/components/ui/badge";
// import { useToast } from "@/hooks/use-toast";
// import { getFunnel, getSubaccountDetails } from "@/lib/queries";
// import { EditorElement, useEditor } from "../../../../../../../../../../../../providers/editor/editor-provider";
// import { EditorBtns } from "@/types/types";

// import clsx from "clsx";
// import { Trash } from "lucide-react";
// import React, { useEffect, useMemo, useState } from "react";

// type Props = {
//   element: EditorElement;
// };

// const Checkout = (props: Props) => {
//   const { dispatch, state, subaccountId, funnelId } = useEditor();
//   const [clientSecret, setClientSecret] = useState("");
//   const [livePrices, setLivePrices] = useState([]);
//   const [subAccountConnectAccId, setSubAccountConnectAccId] = useState("");
//   const options = useMemo(() => ({ clientSecret }), [clientSecret]);
//   const styles = props.element.styles;
//   const { toast } = useToast();

//   useEffect(() => {
//     if (!subaccountId) return;
//     const fetchData = async () => {
//       const subaccountDetails = await getSubaccountDetails(subaccountId);
//       if (subaccountDetails) {
//         if (!subaccountDetails.connectAccountId) return;
//         setSubAccountConnectAccId(subaccountDetails.connectAccountId);
//       }
//     };
//     fetchData();
//   }, [subaccountId]);

//   useEffect(() => {
//     if (funnelId) {
//       const fetchData = async () => {
//         const funnelData = await getFunnel(funnelId);
//         setLivePrices(JSON.parse(funnelData?.liveProducts || "[]"));
//       };
//       fetchData();
//     }
//   }, [funnelId, toast]);

//   useEffect(() => {
//     if (livePrices.length && subaccountId && subAccountConnectAccId) {
//       const getClientSercet = async () => {
//         try {
//           const body = JSON.stringify({
//             subAccountConnectAccId,
//             prices: livePrices,
//             subaccountId,
//           });
//           const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/stripe/create-checkout-session`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body,
//           });
//           const responseJson = await response.json();
//           console.log(responseJson);
//           if (!responseJson) throw new Error("somethign went wrong");
//           if (responseJson.error) {
//             throw new Error(responseJson.error);
//           }
//           if (responseJson.clientSecret) {
//             setClientSecret(responseJson.clientSecret);
//           }
//         } catch (error) {
//           toast({
//             open: true,
//             className: "z-[100000]",
//             variant: "destructive",
//             title: "Oppse!",
//             //@ts-expect-error xyz
//             description: error.message,
//           });
//         }
//       };
//       getClientSercet();
//     }
//   }, [livePrices, subaccountId, subAccountConnectAccId]);

//   const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
//     if (type === null) return;
//     e.dataTransfer.setData("componentType", type);
//   };

//   const handleOnClickBody = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     dispatch({
//       type: "CHANGE_CLICKED_ELEMENT",
//       payload: {
//         elementDetails: props.element,
//       },
//     });
//   };

//   // const goToNextPage = async () => {
//   //   if (!state.editor.liveMode) return;
//   //   const funnelPages = await getFunnel(funnelId);
//   //   if (!funnelPages || !pageDetails) return;
//   //   if (funnelPages.FunnelPages.length > pageDetails.order + 1) {
//   //     console.log(funnelPages.FunnelPages.length, pageDetails.order + 1);
//   //     const nextPage = funnelPages.FunnelPages.find((page) => page.order === pageDetails.order + 1);
//   //     if (!nextPage) return;
//   //     router.replace(`${process.env.NEXT_PUBLIC_SCHEME}${funnelPages.subDomainName}.${process.env.NEXT_PUBLIC_DOMAIN}/${nextPage.pathName}`);
//   //   }
//   // };

//   const handleDeleteElement = () => {
//     dispatch({
//       type: "DELETE_ELEMENT",
//       payload: { elementDetails: props.element },
//     });
//   };

//   return (
//     <div
//       style={styles}
//       draggable
//       onDragStart={(e) => handleDragStart(e, "contactForm")}
//       onClick={handleOnClickBody}
//       className={clsx("p-[2px] w-full ok relative text-[16px] transition-all flex items-center justify-center", {
//         "!border-blue-500": state.editor.selectedElement.id === props.element.id,

//         "!border-solid": state.editor.selectedElement.id === props.element.id,
//         "border-dashed border-[1px] border-slate-300 hover:border-blue-500 ": !state.editor.liveMode,
//       })}
//     >
//       {state.editor.selectedElement.id === props.element.id && !state.editor.liveMode && (
//         <Badge className="absolute -top-[20px] h-5 -left-[1px] rounded-none rounded-t-lg ">{state.editor.selectedElement.name}</Badge>
//       )}

//       <div className="border-none transition-all w-full">
//         <div className="flex flex-col gap-4 w-full">
//           {options.clientSecret && subAccountConnectAccId && (
//             <div className="text-white">
//               {/* <EmbeddedCheckoutProvider
//                 stripe={getStripe(subAccountConnectAccId)}
//                 options={options}
//               >
//                 <EmbeddedCheckout />
//               </EmbeddedCheckoutProvider> */}
//             </div>
//           )}

//           {!options.clientSecret && (
//             <div className="flex items-center justify-center w-full h-40">
//               <Loader loading={!!options?.clientSecret} />
//             </div>
//           )}
//         </div>
//       </div>

//       {state.editor.selectedElement.id === props.element.id && !state.editor.liveMode && (
//         <div className="absolute bg-blue-500 px-2.5 py-1 text-xs font-bold  -top-[20px] -right-[1px] rounded-none rounded-t-lg !text-white">
//           <Trash
//             className="cursor-pointer"
//             size={12}
//             onClick={handleDeleteElement}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Checkout;
