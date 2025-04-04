'use client'
import AddCMSBtn from "@/components/buttons/AddCMSBtn";
import { Button } from "@/components/ui/button";
import { CMSCollection } from "@prisma/client";
import { Database } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

type Props = {
  items: CMSCollection[];
  projectId: string;
}

const Sidebar = ({items, projectId}:Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedNode = searchParams.get("node")

  if (items[0]) {
    router.push(`/saas/projects/${projectId}/cms?node=${items[0].id}`);
  }
  
  return (
    <aside className="w-64 border-r border-zinc-800 flex flex-col">
      <div className="p-5 flex flex-col gap-y-1">
        <h2 className="text-sm font-medium mb-3">Collections</h2>

        {items.map((item) => (
          <div className={`flex items-center justify-between py-2 px-3 hover:bg-zinc-800 cursor-pointer rounded-xl ${selectedNode === item.id ? "bg-zinc-800": ""}`} onClick={() => router.push(`/saas/projects/${projectId}/cms?node=${item.id}`, {scroll:false})} key={item.id}> 
            <div className="flex items-center gap-2 text-sm text-zinc-400/80">
              <Database className="h-4 w-4" />
              <span>{item.name}</span>
            </div>
            <span className="text-xs text-zinc-400/80">5</span>
          </div>
        ))}
        <AddCMSBtn projectId={projectId} />
      </div>

      <div className="mt-auto p-4 border-t border-zinc-800">
        <Button
          variant="outline"
          size="sm"
          className="w-full text-white border-zinc-600 bg-zinc-800"
        >
          Watch Tutorial
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
