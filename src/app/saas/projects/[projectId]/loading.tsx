import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, CircleDot, Globe } from "lucide-react";
import { Roboto_Mono } from "next/font/google";

const outf = Roboto_Mono({ subsets: ["latin"], weight: "400" });

export default function Loading() {
  return (
    <div className={`h-full flex flex-col gap-3 md:pl-6 ${outf.className}`}>
      <div className="flex-1 flex flex-col md:border-l border-zinc-800">
        {/* Header */}
        <header className="md:h-[88px] h-[76px] border-b border-zinc-800 flex items-center justify-between px-6">
          <div className="sm:pl-3 text-sm opacity-70" />
          <div className="sm:flex hidden items-center gap-3 sm:mr-12 md:mr-0">
            <Button
              variant="outline"
              size="sm"
              className="text-zinc-400 border-zinc-700 hover:bg-zinc-800 pointer-events-none"
              disabled
            >
              <CircleDot className="w-4 h-4 mr-2" />
              Feedback
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-zinc-400 pointer-events-none"
              disabled
            >
              Help
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-zinc-400 pointer-events-none"
              disabled
            >
              Docs
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 md:p-8 p-5">
          <div className="max-w-5xl mx-auto relative">
            {/* Domain header */}
            <div className="flex sm:items-center items-start sm:flex-row flex-col mb-8">
              <div className="w-20 h-20 p-[4px] rounded-[18px] border-2 border-white/40 sm:mr-4 sm:mb-0 mb-3 shrink-0">
                <div className="rounded-[12px] bg-amber-950 w-full h-full flex items-center justify-center">
                  <Globe className="w-8 h-8 text-amber-400" />
                </div>
              </div>

              <div className="flex sm:items-center items-start sm:gap-2 gap-1 h-min w-full">
                <div className="min-w-0 max-md:flex-1">
                  <div className="text-sm font-semibold text-zinc-500 text-left">
                    Domain
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <Skeleton className="h-7 md:h-8 w-60 sm:w-72 bg-[#272727] rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md bg-[#272727] shrink-0" />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions & Filters */}
            <div className="flex md:items-center items-start py-6 w-full justify-between gap-4">
              <Skeleton className="h-9 w-48 sm:w-56 rounded-md bg-[#272727]" />
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-32 rounded-[16px] bg-[#272727]" />
                <Skeleton className="h-9 w-24 rounded-md bg-[#272727] sm:block hidden" />
              </div>
            </div>

            {/* Table */}
            <div
              className={`rounded-md border border-zinc-800 bg-[#18181B] ${outf.className}`}
            >
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-zinc-800 hover:bg-transparent">
                    <TableHead className="text-zinc-400 font-medium sm:w-[30%]">
                      Pages
                    </TableHead>
                    <TableHead className="text-zinc-400 font-medium sm:w-[40%]">
                      Path Name
                    </TableHead>
                    <TableHead className="text-zinc-400 font-medium sm:w-[20%]">
                      <div className="flex items-center gap-2">
                        <span>Updated At</span>
                        <ArrowUpDown size={15} />
                      </div>
                    </TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { nameW: "w-28", pathW: "w-56" },
                    { nameW: "w-20", pathW: "w-44" },
                    { nameW: "w-32", pathW: "w-60" },
                    { nameW: "w-24", pathW: "w-48" },
                  ].map((row, index) => (
                    <TableRow
                      key={index}
                      className="border-b border-zinc-800/80 hover:bg-transparent"
                    >
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2 md:min-w-[130px]">
                          <Skeleton className="h-4 w-4 rounded bg-[#272727] shrink-0" />
                          <Skeleton
                            className={`h-4 ${row.nameW} bg-[#272727]`}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <Skeleton
                          className={`h-4 ${row.pathW} max-w-full bg-[#272727]`}
                        />
                      </TableCell>
                      <TableCell className="py-4">
                        <Skeleton className="h-4 w-24 bg-[#272727]" />
                      </TableCell>
                      <TableCell className="py-4 text-right">
                        <div className="w-full flex justify-end">
                          <Skeleton className="h-4 w-5 bg-[#272727]" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination & Selection Footer */}
            <div className="flex items-center justify-between py-4">
              <Skeleton className="h-4 w-40 bg-[#272727]" />
              <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-20 rounded-md bg-[#272727]" />
                <Skeleton className="h-8 w-16 rounded-md bg-[#272727]" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
