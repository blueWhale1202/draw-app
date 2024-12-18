"use client";

import { pointerEventToCanvasPoint } from "@/lib/utils";
import {
    Camera,
    CanvasMode,
    CanvasState,
    Color,
    LayerType,
    Point,
} from "@/types/canvas";
import { LiveObject } from "@liveblocks/client";
import { nanoid } from "nanoid";
import { useCallback, useState } from "react";
import {
    useCanRedo,
    useCanUndo,
    useHistory,
    useMutation,
    useStorage,
} from "../../../../liveblocks.config";
import { CursorsPresence } from "./cursors-presence";
import { Info } from "./info";
import { LayerPreview } from "./layer-preview";
import { Participant } from "./participant";
import { Toolbar } from "./toolbar";

const MAX_LAYERS = 100;

type Props = {
    boardId: string;
};

export const Canvas = ({ boardId }: Props) => {
    const layerIds = useStorage((root) => root.layerIds);

    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None,
    });
    const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
    const [lastUsedColor, setLastUsedColor] = useState<Color>({
        r: 0,
        g: 0,
        b: 0,
    });

    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();

    const insertLayer = useMutation(
        (
            { storage, setMyPresence },
            layerType:
                | LayerType.Ellipse
                | LayerType.Rectangle
                | LayerType.Text
                | LayerType.Note,
            position: Point,
        ) => {
            const liveLayers = storage.get("layers");
            const liveLayerIds = storage.get("layerIds");

            if (liveLayers.size >= MAX_LAYERS) {
                return;
            }

            const layerId = nanoid();
            const layer = new LiveObject({
                type: layerType,
                x: position.x,
                y: position.y,
                height: 100,
                width: 100,
                fill: lastUsedColor,
            });

            liveLayerIds.push(layerId);
            liveLayers.set(layerId, layer);

            setMyPresence({ selection: [layerId] }, { addToHistory: true });
            setCanvasState({ mode: CanvasMode.None });
        },
        [lastUsedColor],
    );

    const onWheel = useCallback((e: React.WheelEvent) => {
        setCamera((camera) => ({
            x: camera.x - e.deltaX,
            y: camera.y - e.deltaY,
        }));
    }, []);

    const onPointerMove = useMutation(
        ({ setMyPresence }, e: React.PointerEvent) => {
            e.preventDefault();

            const current = pointerEventToCanvasPoint(e, camera);

            setMyPresence({ cursor: current });
        },
        [camera],
    );

    const onPointerUp = useMutation(
        ({}, e) => {
            const point = pointerEventToCanvasPoint(e, camera);

            if (canvasState.mode === CanvasMode.Inserting) {
                insertLayer(canvasState.layerType, point);
            } else {
                setCanvasState({ mode: CanvasMode.None });
            }

            history.resume();
        },
        [camera, canvasState, insertLayer, history],
    );

    const onPointerLeave = useMutation(
        ({ setMyPresence }) => setMyPresence({ cursor: null }),
        [],
    );

    return (
        <main className="relative size-full touch-none bg-neutral-100">
            <Info boardId={boardId} />
            <Participant />
            <Toolbar
                canvasState={canvasState}
                setCanvasState={setCanvasState}
                canUndo={canUndo}
                canRedo={canRedo}
                undo={history.undo}
                redo={history.redo}
            />
            <svg
                className="h-screen w-screen"
                onWheel={onWheel}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerLeave={onPointerLeave}
            >
                <g
                    style={{
                        transform: `translate(${camera.x}px, ${camera.y}px)`,
                    }}
                >
                    {layerIds?.map((layerId) => (
                        <LayerPreview
                            key={layerId}
                            id={layerId}
                            onLayerPointerDown={() => {}}
                            selectionColor="#000"
                        />
                    ))}
                    <CursorsPresence />
                </g>
            </svg>
        </main>
    );
};
