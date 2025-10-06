"use client";
import React, { useEffect, useState } from "react";
import { getAllCMSCollectionWithItems } from "../../../../../../../../../server/cms";
import { useEditor } from "../../../../../../../../../providers/editor/editor-provider";

const CMS = () => {
  const [result, setResult] = useState<any>([]);
  const { funnelId } = useEditor();

  useEffect(() => {
    const getCollection = async () => {
      const data = await getAllCMSCollectionWithItems(funnelId);
      console.log(data);
      setResult(data);
    };
    getCollection();
  }, []);

  return (
    <div className="bg-editor-bcgc p-4">
      <div className="border-b border-main-black pb-3">
        <h3 className="text-lg font-semibold mb-3">Your all collections</h3>
        <p className="text-sm text-muted-foreground mb-1">You can write prompt for generate template conponents threough AI</p>
      </div>
      <div className="my-4"></div>
      <div>
        {result ? (
          result.map((item:any, idx:number) => {
            const cmsItem = item.Item.map((item: any) => item.values)

            return (
              <div
              key={idx}
                onDragStart={(e) => {
                  // json string pathabo
                  e.dataTransfer.setData("componentType", JSON.stringify(cmsItem));
                  console.log("ankan", cmsItem)
                }}
                draggable
                className="mb-2 rounded-md bg-[#242424] text-xs p-2 px-3 h-20 flex items-center justify-center relative"
              >
                <p>{item.name}</p>
                <div className="absolute top-2 right-2 opacity-60 flex gap-1"></div>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CMS;
