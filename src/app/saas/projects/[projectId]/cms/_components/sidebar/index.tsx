import AddCMSBtn from "@/components/buttons/AddCMSBtn";
import { Button } from "@/components/ui/button";
import { Database } from "lucide-react";
import React from "react";

const Sidebar = ({items, projectId}:any) => {
  return (
    <aside className="w-64 border-r border-zinc-800 flex flex-col">
      <div className="p-5 flex flex-col">
        <h2 className="text-sm font-medium mb-4">Collections</h2>

        {items.map((item:any) => (
          <div className="flex items-center justify-between py-2 px-3 hover:bg-zinc-800 cursor-pointer rounded-xl">
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
