import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

const page = () => {
  return (
    <div className="min-h-screen bg-editor-bcgc flex items-center justify-center p-4">
      <Card className="w-full rounded-[30px] max-w-md bg-zinc-800/70 backdrop-blur-sm border-0">
        <div className="flex flex-col items-center justify-center p-8 text-center">
          {/* Success Icon */}
          <div className="mb-6 p-3 bg-[#dd222226] hover:bg-[#dd222226]   rounded-full">
            <X className="w-12 h-12 text-[#c90c0c]" />
          </div>

          {/* Success Message */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-red-500 mb-3">Payment Cancelled</h1>
            <p className="text-zinc-300 leading-relaxed">
              Your payment has been cancelled. If this was unintentional, you can try again to complete your purchase.
            </p>
          </div>

          {/* Action Button */}
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-black font-medium rounded-lg hover:opacity-80 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Go to Home Page
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default page;
