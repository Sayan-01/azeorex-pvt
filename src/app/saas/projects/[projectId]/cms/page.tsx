import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, Search } from "lucide-react";
import React from "react";
import { getAllCMSItems } from "../../../../../../server/cms";

interface CMSItem {
  id: number;
  title: string;
  slug: string;
  created: string;
  edited: string;
  icon: React.ReactNode;
}

const CMS = async ({ params, searchParams }: { params: { projectId: string }, searchParams:{ node? : string} }) => {
  const cmsId = searchParams.node
  

  //TODO: Fetch CMS items from the server using query params
  const allCMSItems = getAllCMSItems(cmsId)

  // const [items, setItems] = useState<CMSItem[]>([
  //   {
  //     id: 1,
  //     title: "CMS",
  //     slug: "cms",
  //     created: "3/31/25, 12:37 PM",
  //     edited: "3/31/25, 12:37 PM",
  //     icon: <FileText className="h-4 w-4 text-zinc-400" />,
  //   },
  //   {
  //     id: 2,
  //     title: "Basics",
  //     slug: "basics",
  //     created: "3/31/25, 12:37 PM",
  //     edited: "3/31/25, 12:37 PM",
  //     icon: <FileText className="h-4 w-4 text-zinc-400" />,
  //   },
  //   {
  //     id: 3,
  //     title: "Pro Tips",
  //     slug: "pro-tips",
  //     created: "3/31/25, 12:37 PM",
  //     edited: "3/31/25, 12:37 PM",
  //     icon: <FileText className="h-4 w-4 text-zinc-400" />,
  //   },
  //   {
  //     id: 4,
  //     title: "Updates",
  //     slug: "updates",
  //     created: "3/31/25, 12:37 PM",
  //     edited: "3/31/25, 12:37 PM",
  //     icon: <FileText className="h-4 w-4 text-zinc-400" />,
  //   },
  // ]);

  return (
    
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
              {cmsId }
            </Table>
          </div>
        </main>
      
  );
};

export default CMS;
