import GlobalReviewForm from "@/components/forms/global-review-form";
import { Card } from "@/components/ui/card";
import { Poppins } from "next/font/google";
import Link from "next/link";
import React from "react";
import Header from "../(landing)/_components/home/Header";
import { getGlobalReviews } from "../../../server/global-review";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Star, Quote } from "lucide-react";
import Footer from "../(landing)/_components/home/Footer";

const popp = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

const LovableLandingPage = async () => {
  const reviews = await getGlobalReviews();

  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col relative selection:bg-blue-500/30">

      {/* Navigation */}
      <div className="w-full border-b border-white/5 backdrop-blur-md sticky top-0 z-50">
        <Header />
      </div>

      {/* Hero Section */}
      <main className="flex flex-col items-center px-4 py-20 text-center relative z-10 max-w-7xl mx-auto w-full">
        <h1 className={`text-4xl md:text-6xl font-bold mb-4 mt-10 md:mt-20 ${popp.className}`}>Give review to improve our app</h1>
        <p className="text-sm md:text-base mb-8 text-gray-300 flex items-center gap-2">Azeorex is full stack no-code saas solution. Start creating today.</p>

        {/* Input Section */}
        <div className="w-full max-w-3xl mb-24 group">
          <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-blue-500/20 via-zinc-800 to-purple-500/20 group-hover:from-blue-500/40 group-hover:to-purple-500/40 transition-all duration-500">
            <Card className="bg-zinc-900/90 border-0 backdrop-blur-xl  p-2">
              <div className="md:px-4 px-2 py-2">
                <GlobalReviewForm />
              </div>
            </Card>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-12">
            <div className="text-left">
              <h2 className={`text-3xl md:font-bold ${popp.className}`}>Global Community Reviews</h2>
              <p className="text-zinc-500 mt-1">What creators are saying about Azeorex</p>
            </div>
            <div className="hidden md:flex gap-2">
              <div className="h-2 w-12 rounded-full bg-blue-500/20 border border-blue-500/30" />
              <div className="h-2 w-2 rounded-full bg-zinc-800" />
              <div className="h-2 w-2 rounded-full bg-zinc-800" />
            </div>
          </div>

          {reviews && reviews.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {reviews.map((review: any) => (
                <div
                  key={review.id}
                  className="break-inside-avoid relative group"
                >
                  <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-sm p-6 hover:bg-zinc-800/50 transition-all duration-300 hover:border-white/10">
                    <div className="flex flex-col gap-4">
                      <Quote
                        className="text-blue-500/20 absolute top-4 right-4"
                        size={40}
                      />

                      <p className="text-left text-zinc-300 leading-relaxed relative z-10 italic">"{review.globalReview}"</p>

                      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
                        <Avatar className="h-10 w-10 border border-white/10">
                          <AvatarImage
                            src={review.user?.avatarUrl}
                            alt={review.user?.name}
                          />
                          <AvatarFallback className="bg-blue-500/10 text-blue-400">{review.user?.name?.[0]?.toUpperCase() || "U"}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start">
                          <span className="text-sm font-semibold text-white">{review.user?.name || "Anonymous User"}</span>
                          <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
              <p className="text-zinc-500 italic">No reviews yet. Be the first to share your experience!</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer Space */}
      <Footer />
    </div>
  );
};

export default LovableLandingPage;
