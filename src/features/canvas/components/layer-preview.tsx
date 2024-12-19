"use client";

import { LayerType } from "@/types/canvas";
import { useStorage } from "../../../../liveblocks.config";
import { Ellipse } from "./ellipse";
import { Note } from "./note";
import { Rectangle } from "./rectangle";
import { Text } from "./text";

type Props = {
    id: string;
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
    selectionColor?: string;
};

export const LayerPreview = ({
    id,
    onLayerPointerDown,
    selectionColor,
}: Props) => {
    const layer = useStorage((root) => root.layers.get(id));

    if (!layer) {
        return null;
    }

    switch (layer.type) {
        case LayerType.Text: {
            return (
                <Text
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}
                />
            );
        }
        case LayerType.Note: {
            return (
                <Note
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}
                />
            );
        }
        case LayerType.Ellipse: {
            return (
                <Ellipse
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}
                />
            );
        }
        case LayerType.Rectangle: {
            return (
                <Rectangle
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}
                />
            );
        }
        default: {
            console.warn("Unknown layer type");
            return null;
        }
    }
};
