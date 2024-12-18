import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";

export const useRemoveBoard = () => {
    const mutation = useMutation({
        mutationFn: useConvexMutation(api.board.remove),
        onError: (error) => {
            console.log("🚀 ~ useRemoveBoard ~ error:", error);
            toast.error("Failed to remove board");
        },
    });

    return mutation;
};
