import { QueryClient, useMutation } from "@tanstack/react-query";
import { likeFeature } from "../../server/likeFeature";

export const useSubmitPostMutation = () => {
  const likeMutaion = useMutation({
    mutationFn: likeFeature,
    onSuccess: () => {
      console.log("Success");
      QueryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.log("Error");
    },
  });

  return likeMutaion
}