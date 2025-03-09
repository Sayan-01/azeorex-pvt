'use client'
import React, { useState } from "react";

interface User {
  id: string;
  username: string;
  avatar: string;
}

interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: string;
  replies?: Comment[];
}

// Demo data
const demoComments: Comment[] = [
  {
    id: "1",
    user: {
      id: "u1",
      username: "uxruchit95",
      avatar: "u",
    },
    text: "hello! great work, can you guide by step to how embedded custom url in this spline elements like you have done on get in touch, please",
    timestamp: "16 days ago",
  },
  {
    id: "2",
    user: {
      id: "u2",
      username: "olezhameow",
      avatar: "o",
    },
    text: "Hi! Nice artwork!\nI want to use it in educational project with some modifications like a textures or lightnings, can i?",
    timestamp: "21 days ago",
  },
  {
    id: "3",
    user: {
      id: "u3",
      username: "anshrajore1266",
      avatar: "a",
    },
    text: "how can I use this 3d element in my website?",
    timestamp: "2 months ago",
    replies: [
      {
        id: "3-1",
        user: {
          id: "u7",
          username: "developer",
          avatar: "d",
        },
        text: "You can import the 3D element as a component using Three.js or react-three-fiber.",
        timestamp: "1 month ago",
      },
    ],
  },
  {
    id: "4",
    user: {
      id: "u4",
      username: "lejtdan",
      avatar: "d",
    },
    text: "I'd like to use your BUTTON element to remove the linkedin page and place my own is it possible?",
    timestamp: "4 months ago",
  },
];

const CommentSection: React.FC = () => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>(demoComments);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      user: {
        id: "current-user",
        username: "you",
        avatar: "",
      },
      text: newComment,
      timestamp: "Just now",
    };

    setComments([comment, ...comments]);
    setNewComment("");
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
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts, kudos or feedback"
            className="w-full px-4 py-6 bg-[#ffffff08] rounded-xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>
      </div>

      {/* Comment divider */}
      <div className="border-t border-gray-700 my-6"></div>

      {/* Comments list */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="space-y-3"
          >
            <div className="flex items-start space-x-3">
              {/* Avatar */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                  comment.user.avatar === "u"
                    ? "bg-purple-500"
                    : comment.user.avatar === "o"
                      ? "bg-yellow-500"
                      : comment.user.avatar === "a"
                        ? "bg-pink-500"
                        : comment.user.avatar === "d"
                          ? "bg-orange-500"
                          : "bg-blue-500"
                }`}
              >
                {comment.user.avatar.toUpperCase()}
              </div>

              {/* Comment content */}
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-300">@{comment.user.username}</span>
                  <span className="text-sm text-gray-500">{comment.timestamp}</span>
                </div>
                <p className="mt-1 text-gray-300 whitespace-pre-line">{comment.text}</p>

                {/* Reply button */}
                <div className="mt-2">
                  <button className="text-gray-500 text-sm hover:text-gray-300">Reply</button>
                </div>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 ml-4 space-y-4">
                    <div className="flex items-center space-x-2 text-sm text-blue-400">
                      <span>{comment.replies.length} Replies</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>

                    {comment.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="flex items-start space-x-3 pt-2"
                      >
                        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold">{reply.user.avatar.toUpperCase()}</div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-300">@{reply.user.username}</span>
                            <span className="text-sm text-gray-500">{reply.timestamp}</span>
                          </div>
                          <p className="mt-1 text-gray-300">{reply.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
