"use client";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { emailsend } from "../../../server/contact";
import { Input } from "../ui/input";
import { saveGlobalReview } from "../../../server/global-review";
import { IoAttach } from "react-icons/io5";
import { Import, Paperclip } from "lucide-react";

const GlobalReviewForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [responseMessage, setResponseMessage] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setResponseMessage("");
    setLoading(true);

    const formData = new FormData(e.target);
    const globalReview = formData.get("globalReview");
    
    const result = await saveGlobalReview(globalReview, session?.user?.id || "");

    if (result?.error) {
      setResponseMessage(result.error);
      setLoading(false);
      toast({
        variant: "destructive",
        title: result.error,
        description: "Try to filled all of filds",
      });
    } else if (result?.message) {
      setResponseMessage(result.error);
      toast({
        title: "Uh oh! Review Created",
        description: "Thanks for choosing us to enhance your dream",
      });
      router.push("/");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="globalReview"
        className="bg-transparent border-0 text-white text-lg placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Ask Lovable to create a portfolio website for my..."
      />
      <div className="flex justify-between items-center mt-4 border-t border-gray-700 pt-3">
        <div className="flex space-x-4 text-gray-400">
          <button className="flex items-center hover:text-gray-200">
            <Paperclip size={20} />
            <span className="ml-2">Attach</span>
          </button>
          <button className="flex items-center hover:text-gray-200">
            <Import size={20} />
            <span className="ml-2">Import</span>
          </button>
        </div>
        <div className="flex items-center">
          <span className="text-gray-400 mr-1">Public</span>
          <button
            disabled={session?.user == undefined || loading === true ? true : false}
            type="submit"
            className="rounded-full w-6 h-6 bg-gray-600 flex items-center justify-center"
          >
            <span className="text-white">+</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default GlobalReviewForm;
