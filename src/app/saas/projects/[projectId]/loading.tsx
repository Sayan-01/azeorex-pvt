import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-full min-h-[60vh] flex flex-col items-center justify-center gap-3 text-zinc-400">
      <Loader2 className="w-7 h-7 animate-spin text-zinc-500" />
      <span className="text-sm">Loading project...</span>
    </div>
  );
}
