"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveGlobalReview } from "../../../server/global-review";
import { Input } from "../ui/input";
import { toast } from "sonner";

const GlobalReviewForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [responseMessage, setResponseMessage] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setResponseMessage("");
    setLoading(true);

    const formData = new FormData(e.target);
    const globalReview = formData.get("globalReview");

    if (!globalReview || globalReview.toString().trim() === "") {
      setLoading(false);
      toast.error("Please enter a review first");
      return;
    }

    const result = await saveGlobalReview(globalReview, session?.user?.id || "");

    if (result?.error) {
      setResponseMessage(result.error);
      setLoading(false);
      toast.error(result.error, {
        description: "Please fill in all fields",
      });
    } else if (result?.message) {
      setResponseMessage("");
      setLoading(false);
      toast("Yoo ho! Review Created", {
        description: "Thanks for choosing us to enhance your dream",
      });
      e.target.reset();
      router.refresh();
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col"
    >
      <Input
        name="globalReview"
        autoComplete="off"
        className="bg-transparent border-0 text-white placeholder:text-zinc-500 focus-visible:ring-0 focus-visible:ring-offset-0 p-3 py-0 min-h-[40px] md:min-h-[60px] mb-2"
        placeholder="What's on your mind? Share your Azeorex experience..."
      />
      <div className="flex justify-between items-center mt-2 border-t border-white/5 pt-3 ">
        <div className="flex space-x-4 text-zinc-500 text-sm">
          <div className="flex items-center gap-1.5 opacity-70">
            <span>🤝</span>
            <span>We value your voice</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {session?.user ? <span className="text-zinc-400 text-xs hidden sm:inline">Post globally</span> : <span className="text-red-400/80 text-xs">Login to post review</span>}
          <button
            disabled={!session?.user || loading}
            type="submit"
            className="group flex items-center justify-center h-10 w-10 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-600 transition-all duration-200 shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)]"
          >
            {loading ? (
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <span className="text-white text-xl group-hover:scale-110 transition-transform">+</span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default GlobalReviewForm;
