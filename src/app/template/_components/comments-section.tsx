"use client";
import { Review } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CommentSuspence from "./comment-suspence";
import { ChevronDown, EllipsisVertical, LoaderIcon, Star } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { deleteReview } from "@/lib/queries";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import DeleteButton from "@/components/buttons/DeleteButton";
import { Loader } from "@/components/global/Loader";
import { Button } from "@/components/ui/button";

interface CommentProps {
  templateId: string;
  userId: string;
}

const CommentSection: React.FC<CommentProps> = ({ templateId, userId }) => {
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<Review[]>([]);
  const [fetching, setFetching] = useState(true); // Loading state for fetching
  const router = useRouter();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/products/${templateId}/reviews`);
        if (!response.ok) throw new Error("Failed to fetch reviews");

        const data: Review[] = await response.json();
        setComments(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setFetching(false);
      }
    };

    if (templateId) {
      fetchComments();
    }
  }, [templateId]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/products/${templateId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: newComment,
          rating,
          templateId,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit review");

      const newReview = await response.json();
      setComments([newReview, ...comments]);
      setNewComment("");
      setRating(5);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto text-gray-300 md:p-6 rounded-lg text-sm">
      <h2 className="text-xl font-semibold mb-6">{comments.length} Comments</h2>

      {/* New comment form */}
      <div className="flex items-start space-x-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold"></div>
        <form
          onSubmit={handleSubmitComment}
          className="flex-1"
        >
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts, kudos or feedback"
            className="w-full px-4 py-2 min-h-20  bg-[#ffffff08] rounded-xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center space-x-2 mt-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex h-9 items-center space-x-3 bg-zinc-800 text-zinc-400 rounded-full px-4 ">
                  <p className="flex item-center gap-2 py-2 border-r border-zinc-600 pr-2">Rating: {rating} 🌟</p>{" "}
                  <ChevronDown
                    size={17}
                    className="!ml-2 !-mr-1"
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#1a1a1a] text-white !w-20 p-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <DropdownMenuItem
                    key={num}
                    onClick={() => setRating(num)}
                    className="cursor-pointer hover:bg-[#2a2a2a] transition"
                  >
                    {num} 🌟
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <button
              type="submit"
              className="px-5 py-2 h-9 bg-blue-600 text-white rounded-full disabled:opacity-80"
              disabled={loading || !(newComment.length > 0)}
            >
              {loading ? (
                <Loader loading={false}>
                  <LoaderIcon size={14} />
                </Loader>
              ) : (
                "Submit"
              )}
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>

      {/* Comment divider */}
      <div className="border-t border-gray-800 my-6 mt-3"></div>

      {/* Comments list */}
      {fetching ? (
        <CommentSuspence />
      ) : (
        <div className="space-y-6">
          {/*  */}
          {comments.length > 0 ? (
            comments.map((comment: any) => (
              <div
                key={comment.id}
                className="space-y-3 relative"
              >
                <div className="flex items-start space-x-4">
                  {/* Avatar Placeholder */}
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-500 flex items-center justify-center text-white font-bold">
                    <Image
                      src={comment.User.avatarUrl || "/user.png"}
                      alt={comment.User.name || "abc"}
                      height={40}
                      width={40}
                      className="rounded-full"
                    />
                  </div>

                  {/* Comment content */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 -mb-0.5">
                      <span className=" text-gray-300">@{comment.User.name || "unknown"}</span>
                      <p className="text-yellow-400">Rating: {comment.rating}🌟</p>
                    </div>
                    <span className="text-gray-500 text-[11px]">{new Date(comment.createdAt).toLocaleDateString()}</span>
                    <p className="mt-1.5 text-gray-300 whitespace-pre-line">{comment.comment}</p>
                  </div>
                </div>
                {comment.User.id === userId ? (
                  <MoreButton
                    reviewId={comment.id}
                    setComments={setComments}
                    setError={setError}
                  />
                ) : (
                  <></>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400">No comments yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentSection;

const MoreButton = ({ reviewId, setComments, setError }: { reviewId: string; setComments: React.Dispatch<React.SetStateAction<Review[]>>; setError: any }) => {
  const router = useRouter();

  const handleDelete = async () => {
    console.log("first");

    try {
      const response = await fetch(`/api/products/${reviewId}/reviews`, {
        method: "DELETE",
      });

      if (!response.ok) return setError("Failed to delete review");

      setComments((prevComments) => prevComments.filter((comment) => comment.id !== reviewId));

      router.refresh(); // Refresh the UI
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <EllipsisVertical
          size={12}
          className="absolute right-0 top-0 cursor-pointer"
        />
      </PopoverTrigger>
      <PopoverContent className="rounded-xl text-xs w-40 bg-transparent text-zinc-400 backdrop-blur flex flex-col gap-3  sm:mr-48 mr-10 cursor-pointer">
        <div>Edit</div>
        <DeleteButton
          onClick={handleDelete}
          title="Delete Your comment"
          description="This action can’t be undone and your comment will be removed from this post permanently."
        >
          <div>Delete</div>
        </DeleteButton>
      </PopoverContent>
    </Popover>
  );
};
