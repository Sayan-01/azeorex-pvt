import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <div className="flex flex-col items-center justify-center p-8 text-center">
          {/* Success Icon */}
          <div className="mb-6 p-3 bg-emerald-100 rounded-full">
            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          </div>

          {/* Success Message */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-3">
              Payment Successful!
            </h1>
            <p className="text-slate-600 leading-relaxed">
              Thank you for your purchase. Your order has been processed successfully
              and you can now start using our services.
            </p>
          </div>

          {/* Action Button */}
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Go to Dashboard
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default page;
