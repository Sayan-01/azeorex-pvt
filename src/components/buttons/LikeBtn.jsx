"use client";
import { useState } from "react";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQueryKey } from "@/context/QueryKeyContext";

const LikeBtn = ({ temId, userId, isLiked, className }) => {
  const [like, setLike] = useState(isLiked);
  const queryClient = useQueryClient();
  const queryKey = useQueryKey(); // Get queryKey from context

  const like_feature = async ({ temId, userId, like }) => {
    return await fetch("/api/like-update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ temId, userId, like }),
    });
  };

  const likeMutaion = useMutation({
    mutationFn: like_feature,
    onMutate: async ({ temId, userId, like }) => {
      setLike(!like);

      await queryClient.cancelQueries({ queryKey: ["products"] });

      // Update data for the dynamic queryKey if you use it
      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData) return;
        return {
          ...oldData,
          data: oldData.data.map((product) => {
            if (product._id === temId) {
              return {
                ...product,
                likes: like ? product.likes.filter((id) => id !== userId) : [...product.likes, userId],
              };
            }
            return product;
          }),
        };
      });
      // Update all queries with the prefix ["products"]
      queryClient
        .getQueryCache()
        .findAll({ queryKey: ["products"] })
        .forEach((query) => {
          const key = query.queryKey;
          if (key[0] === "products") {
            queryClient.setQueryData(key, (oldData) => {
              if (!oldData) return;
              return {
                ...oldData,
                data: oldData.data.map((product) => {
                  if (product._id === temId) {
                    return {
                      ...product,
                      likes: like ? product.likes.filter((id) => id !== userId) : [...product.likes, userId],
                    };
                  }
                  return product;
                }),
              };
            });
          }
        });
    },
    onError: () => {},
    onSettled: () => {},
  });

  return (
    <div className={`${className} `}>
      <button
        className="p-2 flex items-center justify-center bg-[#FCECFA] rounded-full"
        onClick={() => likeMutaion.mutate({ temId, userId, like })}
      >
        {like ? <IoHeartSharp className="text-[#EA64D9]" /> : <IoHeartOutline className="text-zinc-800" />}
      </button>
    </div>
  );
};

export default LikeBtn;
