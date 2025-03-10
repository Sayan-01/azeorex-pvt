'use client'
import { Review } from "@prisma/client";
import Image from "next/image";
import React, { useState } from "react";
import { v4 } from "uuid";

interface CommentProps {
  reviews: any;
  templateId: string;
}

const CommentSection: React.FC<CommentProps> = ({ reviews, templateId }) => {
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<Review[]>(reviews);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/reviews", {
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

      const newReview: Review = await response.json();
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
    <div className="w-full max-w-4xl mx-auto text-gray-300 p-6 rounded-lg text-sm">
      <h2 className="text-xl font-semibold mb-6">{comments.length} Comments</h2>

      {/* New comment form */}
      <div className="flex items-start space-x-4 mb-8">
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
          <div className="flex items-center space-x-2 mt-2">
            <label className="text-gray-400 text-sm font-medium">Rating:</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="bg-[#ffffff08]  text-gray-200 rounded-lg px-2 outline-none border-none py-2.5 text-sm 
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
      <div className="border-t border-gray-700 my-6"></div>

      {/* Comments list */}
      <div className="space-y-6">
        {comments.map((comment: any) => (
          <div
            key={comment.id}
            className="space-y-3"
          >
            <div className="flex items-start space-x-4">
              {/* Avatar Placeholder */}
              <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-500 flex items-center justify-center text-white font-bold">
                <Image
                  src={comment?.User?.avatarUrl}
                  alt={comment?.User?.name}
                  height={200}
                  width={200}
                />
              </div>

              {/* Comment content */}
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-300">{comment.User.name}</span>
                  <p className="text-yellow-400">Rating: {comment.rating}⭐</p>
                </div>
                <span className="text-gray-500 text-xs">{new Date(comment.createdAt).toLocaleDateString()}</span>
                <p className="mt-1 text-gray-300 whitespace-pre-line">{comment.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
