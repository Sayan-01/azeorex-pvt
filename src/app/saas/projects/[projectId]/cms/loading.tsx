import { Skeleton } from "@/components/ui/skeleton";

export default function CMSSkeleton() {
  return (
    <div className="flex h-screen flex-col bg-[#141414] border-l ml-[24px]">
      {/* Top Navigation */}
      <header className="flex items-center justify-between border-b  p-5 h-[88px] ">
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-9 rounded-xl bg-[#272727]" />
          <Skeleton className="h-9 w-28 rounded-xl bg-[#272727]" />

          <div className="ml-20 flex items-center gap-4">
            <Skeleton className="h-9 w-24 rounded-xl bg-[#272727]" />
            <Skeleton className="h-9 w-24 rounded-xl bg-[#272727]" />
            <Skeleton className="h-9 w-24 rounded-xl bg-[#272727]" />
            <Skeleton className="h-9 w-24 rounded-xl bg-[#272727]" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Skeleton className="h-9 w-12 rounded-xl bg-[#272727]" />
          <Skeleton className="h-9 w-9 rounded-xl bg-[#272727]" />
          <Skeleton className="h-9 w-9 rounded-xl bg-[#272727]" />
          <Skeleton className="h-9 w-9 rounded-xl bg-[#272727]" />
          <Skeleton className="h-9 w-9 rounded-xl bg-[#272727]" />
          <Skeleton className="h-9 w-20 rounded-xl bg-[#272727]" />
          <Skeleton className="h-9 w-24 rounded-xl bg-[#272727]" />
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 border-r  p-5">
          <Skeleton className="mb-4 h-6 w-32 rounded-xl bg-[#272727]" />

          <div className="space-y-4">
            {/* Collection items */}
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-lg bg-[#272727]" />
                  <Skeleton className="h-5 w-24 rounded-lg bg-[#272727]" />
                </div>
                <Skeleton className="h-5 w-5 rounded-lg bg-[#272727]" />
              </div>
            ))}

            <div className="flex items-center gap-2 pt-2">
              <Skeleton className="h-5 w-5 rounded-lg bg-[#272727]" />
              <Skeleton className="h-5 w-16 rounded-lg bg-[#272727]" />
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <Skeleton className="h-10 w-full rounded-xl bg-[#272727]" />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {/* Search Bar */}
          <div className="border-b  p-4">
            <Skeleton className="h-10 w-full rounded-xl bg-[#272727]" />
          </div>

          {/* Table */}
          <div className="p-4">
            <div className="grid grid-cols-4 gap-4 border-b  pb-2">
              <Skeleton className="h-5 w-16 rounded-lg bg-[#272727]" />
              <Skeleton className="h-5 w-24 rounded-lg bg-[#272727]" />
              <Skeleton className="h-5 w-16 rounded-lg bg-[#272727]" />
              <Skeleton className="h-5 w-24 rounded-lg bg-[#272727]" />
            </div>

            {/* Table Rows - Loading State */}
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-4 border-b  py-4"
              >
                <Skeleton className="h-5 w-full rounded-lg bg-[#272727]" />
                <Skeleton className="h-5 w-full rounded-lg bg-[#272727]" />
                <Skeleton className="h-5 w-full rounded-lg bg-[#272727]" />
                <Skeleton className="h-5 w-full rounded-lg bg-[#272727]" />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
