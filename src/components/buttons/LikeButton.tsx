"use client";
import { useCallback, useState } from "react";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { toast } from "sonner";

type Props = {
  temId: string;
  userId: string;
  isLiked: boolean;
  className?: string;
  totalLikes: number;
};

const LikeButton = ({ temId, userId, isLiked, className, totalLikes }: Props) => {
  const [like, setLike] = useState(isLiked);
  const [totalLike, setTotalLike] = useState(totalLikes);

  const likeFeature = useCallback(async () => {
    const newLikeState = !like; // Calculate new state first

    setLike(newLikeState);
    setTotalLike((count) => (newLikeState ? count + 1 : count - 1)); // Adjust totalLikes correctly

    try {
      const res = await fetch(`/api/products/${temId}/likes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ temId, userId, like: newLikeState }), // Send correct toggled value
      });

      if (!res.ok) {
        throw new Error("Failed to update like");
      }
    } catch (error) {
      setLike((prev) => !prev); // Revert like state on error
      setTotalLike((count) => (newLikeState ? count - 1 : count + 1)); // Revert totalLikes correctly
      toast("Login to like this template");
    }
  }, [temId, userId, like]);

  return (
    <div className={`${className} `}>
      <button
        className="flex items-center space-x-2 bg-pink-500/10 rounded-full px-4 py-2"
        onClick={() => likeFeature()}
      >
        {like ? (
          <IoHeartSharp
            className="text-[#EA64D9]"
            size={19}
          />
        ) : (
          <IoHeartOutline
            size={19}
            className="text-pink-500"
          />
        )}
        <span className="text-pink-500">{totalLike}</span>
      </button>
    </div>
  );
};

export default LikeButton;
