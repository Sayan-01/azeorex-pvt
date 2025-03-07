"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal, Pencil, PencilRuler, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Roboto_Mono } from "next/font/google";
import { FileDuoToneBlack } from "@/icons";
import { FunnelPage } from "@prisma/client";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const outfi = Roboto_Mono({ subsets: ["latin"], weight: "400" });

export const columns: ColumnDef<FunnelPage>[] = [
  {
    accessorKey: "name",
    header: "Pages",
    cell: ({ row }) => (
      <div className="flex items-center gap-2  md:min-w-[130px]">
        <FileDuoToneBlack />
        <div className="capitalize">{row.getValue("name")}</div>
      </div>
    ),
  },
  {
    accessorKey: "pathName",
    header: () => <div className="text-left ">Path Name</div>,
    cell: ({ row }) => (
      <div className="lowercase">
        {process.env.NEXT_PUBLIC_URL}
        {row.getValue("pathName")}
      </div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p>Updated At</p>
          <ArrowUpDown size={15} />
        </div>
      );
    },
    cell: ({ row }) => {
      const updatedAt = row.getValue("updatedAt");
      if (!updatedAt) return "N/A";

      const date = new Date(updatedAt as string | number | Date);
      if (isNaN(date.getTime())) return "Invalid Date"; // Handle potential invalid dates

      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <div className="w-full flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="outline-none border-none"
            >
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 outline-none border-none"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal
                  strokeWidth={1.5}
                  size={15}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="sm:w-[14rem] p-2 rounded-xl m-0 mt-2"
            >
              <Dialog>
                <DropdownMenuItem
                  className="bg-white/5 opacity-60 flex items-center gap-2 px-3 py-2 rounded-[10px] mb-2"
                  onSelect={(e) => e.preventDefault()} // Prevent dropdown from closing
                >
                  <DialogTrigger asChild>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <PencilRuler size={15} />
                      Edit details
                    </div>
                  </DialogTrigger>
                </DropdownMenuItem>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit details</DialogTitle>
                    <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <DropdownMenuItem className="bg-white/5 opacity-60 flex items-center gap-2 px-3 py-2 rounded-[10px]">
                <Trash size={15} />
                Delete the page
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export function FunnelPageTable({ pageDetails }: { pageDetails: FunnelPage[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [pagesState, setPagesState] = React.useState(pageDetails);

  const table = useReactTable({
    data: pageDetails,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-6">
        <Input
          placeholder="Filter page name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto md:flex hidden gap-1"
            >
              Columns{" "}
              <ChevronDown
                strokeWidth={1.5}
                size={16}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className={`rounded-md border bg-[#18181B] ${outfi.className}`}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
