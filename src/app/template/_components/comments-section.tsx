"use client";
import { Review } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CommentSuspence from "./comment-suspence";
import { EllipsisVertical } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteReview } from "@/lib/queries";

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
      setComments([...comments, newReview]);
      setNewComment("");
      setRating(5);
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
            <label className="text-gray-400 text-sm font-medium">Rating:</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="bg-[#ffffff08]  text-gray-200 rounded-lg px-2 outline-none border-none h-9 text-sm 
             transition duration-200 hover:bg-[#2a2a2a]"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option
                  key={num}
                  value={num}
                  className="bg-[#1a1a1a] text-white border-none"
                >
                  {num} ⭐
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
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
                      src={comment.User.avatarUrl}
                      alt={comment.User.name}
                      height={40}
                      width={40}
                      className="rounded-full"
                    />
                  </div>

                  {/* Comment content */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 -mb-0.5">
                      <span className=" text-gray-300">@{comment.User.name}</span>
                      <p className="text-yellow-400">Rating: {comment.rating}⭐</p>
                    </div>
                    <span className="text-gray-500 text-[11px]">{new Date(comment.createdAt).toLocaleDateString()}</span>
                    <p className="mt-1.5 text-gray-300 whitespace-pre-line">{comment.comment}</p>
                  </div>
                </div>
                {comment.User.id === userId ? <MoreButton reviewId={comment.id} /> : <></>}
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

const MoreButton = ({ reviewId }: { reviewId: string }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <EllipsisVertical
          size={12}
          className="absolute right-0 top-0"
        />
      </PopoverTrigger>
      <PopoverContent className=" rounded-xl text-xs w-40 bg-transparent text-zinc-400 backdrop-blur flex flex-col gap-3  mr-48">
        <div>Edit</div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div>Delete</div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteReview(reviewId)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </PopoverContent>
    </Popover>
  );
};
