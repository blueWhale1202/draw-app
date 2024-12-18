import { Layer, Point } from "@/types/canvas";
import {
    createClient,
    LiveList,
    LiveMap,
    LiveObject,
} from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
    authEndpoint: "/api/liveblocks-auth",
    throttle: 16,
});

// Presence represents the properties that exist on every user in the Room
// and that will automatically be kept in sync. Accessible through the
// `user.presence` property. Must be JSON-serializable.
type Presence = {
    cursor: Point | null;
    selection: string[];
};

// Optionally, Storage represents the shared document that persists in the
// Room, even after all users leave. Fields under Storage typically are
// LiveList, LiveMap, LiveObject instances, for which updates are
// automatically persisted and synced to all connected clients.
type Storage = {
    layers: LiveMap<string, LiveObject<Layer>>;
    layerIds: LiveList<string>;
};

// Optionally, UserMeta represents static/readonly metadata on each user, as
// provided by your own custom auth back end (if used). Useful for data that
// will not change during a session, like a user's name or avatar.
type UserMeta = {
    id?: string;
    info?: {
        name?: string;
        picture?: string;
    };
};

// Optionally, the type of custom events broadcast and listened to in this
// room. Use a union for multiple events. Must be JSON-serializable.
// type RoomEvent = {};

// Optionally, when using Comments, ThreadMetadata represents metadata on
// each thread. Can only contain booleans, strings, and numbers.
// export type ThreadMetadata = {
//   pinned: boolean;
//   quote: string;
//   time: number;
// };

export const {
    RoomProvider,
    useMyPresence,
    useStorage,
    useSelf,
    useOthers,
    useHistory,
    useCanRedo,
    useCanUndo,
    useOthersConnectionIds,
    useOther,
    useMutation,

    // Other hooks
    // ...
} = createRoomContext<
    Presence,
    Storage,
    UserMeta
    /* UserMeta, RoomEvent, ThreadMetadata */
>(client);
