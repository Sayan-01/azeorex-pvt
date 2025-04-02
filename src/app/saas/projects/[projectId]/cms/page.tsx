// App.tsx
"use client";
import AddCMSBtn from "@/components/buttons/AddCMSBtn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart4, CheckSquare, ChevronLeft, Database, FileText, Globe, MoreHorizontal, PenSquare, PlayIcon, PlusCircle, PlusIcon, Puzzle, Search, Settings } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

interface CMSItem {
  id: number;
  title: string;
  slug: string;
  created: string;
  edited: string;
  icon: React.ReactNode;
}

const CMS = ({ params }: { params: { projectId: string } }) => {
  const [items, setItems] = useState<CMSItem[]>([
    {
      id: 1,
      title: "CMS",
      slug: "cms",
      created: "3/31/25, 12:37 PM",
      edited: "3/31/25, 12:37 PM",
      icon: <FileText className="h-4 w-4 text-zinc-400" />,
    },
    {
      id: 2,
      title: "Basics",
      slug: "basics",
      created: "3/31/25, 12:37 PM",
      edited: "3/31/25, 12:37 PM",
      icon: <FileText className="h-4 w-4 text-zinc-400" />,
    },
    {
      id: 3,
      title: "Pro Tips",
      slug: "pro-tips",
      created: "3/31/25, 12:37 PM",
      edited: "3/31/25, 12:37 PM",
      icon: <FileText className="h-4 w-4 text-zinc-400" />,
    },
    {
      id: 4,
      title: "Updates",
      slug: "updates",
      created: "3/31/25, 12:37 PM",
      edited: "3/31/25, 12:37 PM",
      icon: <FileText className="h-4 w-4 text-zinc-400" />,
    },
  ]);

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
        <aside className="w-64 border-r border-zinc-800 flex flex-col">
          <div className="p-5 flex flex-col">
            <h2 className="text-sm font-medium mb-4">Collections</h2>

            <div className="flex items-center justify-between py-2 px-3 hover:bg-zinc-800 cursor-pointer rounded-xl">
              <div className="flex items-center gap-2 text-sm text-zinc-400/80">
                <Database className="h-4 w-4" />
                <span>Articles</span>
              </div>
              <span className="text-xs text-zinc-400/80">5</span>
            </div>

            <div className="flex items-center justify-between py-2 px-3 hover:bg-zinc-800 cursor-pointer rounded-xl">
              <div className="flex items-center gap-2 text-sm text-zinc-400/80">
                <Database className="h-4 w-4" />
                <span>Categories</span>
              </div>
              <span className="text-xs text-zinc-400/80">4</span>
            </div>

            <AddCMSBtn projectId={params.projectId}/>
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

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="px-4 h-10 border-b border-zinc-800 flex items-center">
            <div className="relative flex-1 max-w-xs">
              <Search
                className="absolute left-0 top-[6px] h-4 w-4 text-zinc-400/80"
                size={12}
              />
              <Input
                placeholder="Search..."
                className="pl-6 bg-transparent text-zinc-300 border-none outline-none focus:outline-none focus:border-none h-[36px]"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto text-white"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-auto text-sm">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-zinc-800/40 border-b border-zinc-800">
                  <TableHead className="text-zinc-400/80">Title</TableHead>
                  <TableHead className="text-zinc-400/80">Slug</TableHead>
                  <TableHead className="text-zinc-400/80">Created</TableHead>
                  <TableHead className="text-zinc-400/80">Edited</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-zinc-800/40 border-b border-zinc-800 h-10"
                  >
                    <TableCell className="flex items-center gap-2 text-zinc-400/80">
                      {item.icon}
                      {item.title}
                    </TableCell>
                    <TableCell className="text-zinc-400/40">{item.slug}</TableCell>
                    <TableCell className="text-zinc-400/40">{item.created}</TableCell>
                    <TableCell className="text-zinc-400/40">{item.edited}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CMS;
