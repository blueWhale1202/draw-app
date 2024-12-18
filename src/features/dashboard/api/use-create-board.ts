import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";

export const useCreateBoard = () => {
    const mutation = useMutation({
        mutationFn: useConvexMutation(api.board.create),
        onSuccess: () => {
            toast.success("Board created");
        },
        onError: (error) => {
            console.log("🚀 ~ useCreateBoard ~ error:", error);
            toast.error("Failed to create board");
        },
    });

    return mutation;
};
