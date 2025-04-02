import React from "react";
import { getAllCMSCollection } from "../../../../../../server/cms";
import Link from "next/link";
import { BarChart4, CheckSquare, ChevronLeft, Database, FileText, Globe, MoreHorizontal, PenSquare, PlayIcon, PlusCircle, PlusIcon, Puzzle, Search, Settings } from "lucide-react";
import Sidebar from "./_components/sidebar";
import { Button } from "@/components/ui/button";

const CMSLayout = async({params, children}:{params: { projectId: string } , children: React.ReactNode}) => {
    const items = await getAllCMSCollection(params.projectId);

  return (
    <div className="flex flex-col h-screen border-l ml-6 bg-bcgc-editor text-white">
      {/* Top Navbar */}
      <header className="flex items-center justify-between p-5 border-b border-zinc-800 h-[88px]">
        <div className="flex items-center space-x-4 w-[240px]">
          <Link
            href={`/saas/projects/${params.projectId}`}
            className="px-1.5 pl-1 flex gap-1 items-center bg-zinc-800 rounded-xl h-[36px] text-zinc-100/80 w-max"
          >
            <ChevronLeft
              size={20}
              strokeWidth={1.1}
            />
          </Link>
          <Button
            size="sm"
            variant="ghost"
            className="text-white flex items-center gap-1 h-[36px] bg-zinc-800 text-zinc-100/80 rounded-xl"
          >
            <FileText className="h-4 w-4" />
            <span>CMS</span>
            <svg
              className="h-4 w-4 ml-1"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
        <div className="flex-1 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-white flex items-center gap-1 bg-zinc-800 rounded-xl h-[36px] text-zinc-100/80"
            >
              <PlusCircle className="h-4 w-4" />
              <span>New Item</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white flex items-center gap-1 bg-zinc-800 rounded-xl h-[36px] text-zinc-100/80"
            >
              <CheckSquare className="h-4 w-4" />
              <span>Select</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white flex items-center gap-1 bg-zinc-800 rounded-xl h-[36px] text-zinc-100/80"
            >
              <PenSquare className="h-4 w-4" />
              <span>Edit Fields</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white flex items-center gap-1 bg-zinc-800 rounded-xl h-[36px] text-zinc-100/80"
            >
              <Puzzle className="h-4 w-4" />
              <span>Plugins</span>
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 text-white border-none"
            >
              SD
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white"
            >
              <Globe className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white"
            >
              <Settings className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white"
            >
              <BarChart4 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white"
            >
              <PlayIcon className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white"
            >
              Invite
            </Button>
            <Button
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Publish
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          items={items}
          projectId={params.projectId}
        />

        {/* Main Content */}
        {children}
      </div>
    </div>
  );
};

export default CMSLayout;
