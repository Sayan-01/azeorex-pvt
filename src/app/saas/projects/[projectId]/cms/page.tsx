import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, Search } from "lucide-react";
import React from "react";
import { getAllCMSItems, getAllItems } from "../../../../../../server/cms-item";
import { CMSField } from "@prisma/client";
import CMSLayout from "./cms-layout";
import { getAllCMSFields } from "../../../../../../server/cms-field";

interface CMSItem {
  id: number;
  title: string;
  slug: string;
  created: string;
  edited: string;
  icon: React.ReactNode;
}

const CMS = async ({ params, searchParams }: { params: { projectId: string }; searchParams: { node?: string } }) => {
  const cmsId = searchParams.node || "";
  const cmsAllFields = await getAllCMSFields(cmsId);

  const cmsAllItems = await getAllItems(cmsId);
  const xyz = cmsAllItems.data || [];
  const items = xyz.map((item) => item.values);

  return (
    <CMSLayout
      params={params}
      cmsId={searchParams.node || ""}
    >
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="px-4 h-10 border-b border-zinc-800 flex items-center">
          <div className="relative flex-1 max-w-xs">
            <Search
              className="absolute left-0 top-[9px] h-4 w-4 text-zinc-400/80"
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
                {(cmsAllFields.data || []).map((field: CMSField) => (
                  <TableHead className="text-zinc-400/60">{field.name}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item: any, index) => (
                <TableRow
                  key={index}
                  className="text-zinc-400/60 hover:text-white"
                >
                  {(cmsAllFields.data || []).map((key) => (
                    <TableCell key={key.name}>{item[key.name] || "-"}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </CMSLayout>
  );
};

export default CMS;
