"use client";

import { RenameModal } from "@/features/boards/components/rename-modal";
import { useIsClient } from "usehooks-ts";

export const Modals = () => {
    const client = useIsClient();

    if (!client) {
        return null;
    }

    return (
        <>
            <RenameModal />
        </>
    );
};
