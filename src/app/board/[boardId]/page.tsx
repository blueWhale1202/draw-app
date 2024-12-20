"use client";

import { Room } from "@/components/room";
import { LiveblocksProvider } from "@liveblocks/react";

import { Canvas } from "@/features/canvas/components/canvas";
import { RoomLoading } from "@/features/canvas/components/room-loading";

type Props = {
    params: {
        boardId: string;
    };
};

const BoardPage = ({ params }: Props) => {
    const { boardId } = params;

    return (
        <LiveblocksProvider throttle={16} authEndpoint="/api/liveblocks-auth">
            <Room roomId={boardId} fallback={<RoomLoading />}>
                <Canvas boardId={boardId} />
            </Room>
        </LiveblocksProvider>
    );
};

export default BoardPage;
