import { calculateFontSize, cn, colorToCss } from "@/lib/utils";
import { TextLayer } from "@/types/canvas";
import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { useMutation } from "../../../../liveblocks.config";

const font = Kalam({
    subsets: ["latin"],
    weight: ["400"],
});

type Props = {
    id: string;
    layer: TextLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
};

export const Text = ({ id, layer, onPointerDown, selectionColor }: Props) => {
    const { x, y, width, height, fill, value } = layer;

    const updateValue = useMutation(
        ({ storage }, newValue: string) => {
            const liveLayers = storage.get("layers");
            const layer = liveLayers.get(id);

            if (layer) {
                layer.set("value", newValue);
            }
        },
        [id],
    );

    const onChange = (e: ContentEditableEvent) => {
        updateValue(e.target.value);
    };

    return (
        <foreignObject
            x={x}
            y={y}
            width={width}
            height={height}
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{
                outline: selectionColor
                    ? `1px solid ${selectionColor}`
                    : "none",
            }}
        >
            <ContentEditable
                html={value || "Text"}
                onChange={onChange}
                className={cn(
                    "flex size-full items-center justify-center text-center outline-none drop-shadow-md",
                    font.className,
                )}
                style={{
                    color: fill ? colorToCss(fill) : "#000",
                    fontSize: calculateFontSize(width, height),
                }}
            />
        </foreignObject>
    );
};
