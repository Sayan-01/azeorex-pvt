import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, Search } from "lucide-react";
import React from "react";
import { getAllItems } from "../../../../../../server/cms-item";
import { CMSField } from "@prisma/client";
import CMSLayout from "./cms-layout";
import { getAllCMSFields } from "../../../../../../server/cms-field";
import List from "@/icons/list-blue";

interface CMSItem {
  id: number;
  title: string;
  slug: string;
  created: string;
  edited: string;
  icon: React.ReactNode;
}

const CMS = async (
  props: { params: Promise<{ projectId: string }>; searchParams: Promise<{ node?: string }> }
) => {
  const searchParams = await props.searchParams;
  const params = await props.params;
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
          {items.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center flex-col gap-2">
              <List />
              <p className="text-xs w-40 text-center opacity-80">Your collection is empty. Add an item to get started.</p>
            </div>
          ) : (
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
          )}
        </div>
      </main>
    </CMSLayout>
  );
};

export default CMS;
