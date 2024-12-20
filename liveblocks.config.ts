import { Color, Layer, Point } from "@/types/canvas";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";

declare global {
    interface Liveblocks {
        Presence: {
            cursor: Point | null;
            selection: string[];
            pencilDraft: [x: number, y: number, pressure: number][] | null;
            penColor: Color | null;
        };

        Storage: {
            layers: LiveMap<string, LiveObject<Layer>>;
            layerIds: LiveList<string>;
        };

        UserMeta: {
            id?: string;
            info?: {
                name?: string;
                picture?: string;
            };
        };

        RoomEvent: {};

        ThreadMetadata: {};

        RoomInfo: {};
    }
}

export {};
