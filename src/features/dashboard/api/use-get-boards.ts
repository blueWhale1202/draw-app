import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../convex/_generated/api";

export const useGetBoards = (orgId: string) => {
    const query = useQuery({
        ...convexQuery(api.board.get, { orgId }),
    });
    return query;
};
