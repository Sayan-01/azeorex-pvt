import { Skeleton } from "@/components/ui/skeleton";

const categories = ["All", "Business", "Restaurant", "E-commerce", "Traveling", "Ed-tech", "Health [medical]", "Real estate", "Sports", "Dark theme", "Light theme", "3d"];

function TemplateCardSkeleton() {
  return (
    <div className="min-w-0">
      {/* Template preview */}
      <Skeleton className="aspect-[16/9] w-full rounded-xl bg-[#292929]" />

      {/* Creator and template details */}
      <div className="mt-4 flex items-start gap-3">
        <Skeleton className="size-10 shrink-0 rounded-full bg-[#303030]" />

        <div className="min-w-0 flex-1 space-y-2">
          {/* Title */}
          <Skeleton className="h-5 w-[85%] bg-[#303030]" />

          {/* Description */}
          <div className="space-y-1">
            <Skeleton className="h-4 w-full bg-[#303030]" />
          </div>

          {/* Likes and reviews */}
          <div className="flex items-center gap-4 pt-1">
            <Skeleton className="h-4 w-16 bg-[#303030]" />
            <Skeleton className="h-4 w-20 bg-[#303030]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-[#141414] px-4 py-6 text-white sm:px-6">
      <div className="mx-auto max-w-[1800px]">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-20 bg-[#303030]" />
            <Skeleton className="size-4 rounded bg-[#303030]" />
          </div>

          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-40 rounded-lg bg-[#303030] sm:w-56" />
            <Skeleton className="h-8 w-36 rounded-lg bg-[#303030]" />
          </div>
        </header>

        {/* Category filters */}
        <div className="mt-12 overflow-hidden">
          <div className="flex min-w-max gap-4">
            {categories.map((category, index) => (
              <div
                key={category}
                className={`flex p-3 items-center rounded-2xl border-2  ${index === 0 ? "border-blue-500" : "border-[#303030]"}`}
              >
                {index === 0 ? <Skeleton className="h-3 w-6 bg-[#303030]" /> : <Skeleton className={`h-4 bg-[#303030] ${index % 3 === 0 ? "w-24" : index % 2 === 0 ? "w-20" : "w-16"}`} />}
              </div>
            ))}
          </div>
        </div>

        {/* Template grid */}
        <section
          aria-label="Loading templates"
          aria-busy="true"
          className="mt-7 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {Array.from({ length: 12 }).map((_, index) => (
            <TemplateCardSkeleton key={index} />
          ))}
        </section>
      </div>
    </main>
  );
}
