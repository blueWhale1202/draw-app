"use client";

import { Layer } from "@/types";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    roomId: string;
    fallback: NonNullable<ReactNode> | null;
};

export const Room = ({ roomId, children, fallback }: Props) => {
    return (
        <RoomProvider
            id={roomId}
            initialPresence={{
                cursor: null,
                selection: [],
                pencilDraft: null,
                penColor: null,
                presence: undefined,
            }}
            initialStorage={{
                layers: new LiveMap<string, LiveObject<Layer>>(),
                layerIds: new LiveList([]),
                records: new LiveMap(),
            }}
        >
            <ClientSideSuspense fallback={fallback}>
                {children}
            </ClientSideSuspense>
        </RoomProvider>
    );
};
