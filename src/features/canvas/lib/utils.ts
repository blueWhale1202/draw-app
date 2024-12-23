import {
    Camera,
    Color,
    Layer,
    LayerType,
    PathLayer,
    Point,
    Side,
    XYWH,
} from "@/types";

import fontColorContrast from "font-color-contrast";
import { COLORS } from "../constant";

export function connectionIdToColor(connectionId: number): string {
    return COLORS[connectionId % COLORS.length];
}

export function colorToCss(color: Color) {
    return `#${color.r.toString(16).padStart(2, "0")}${color.g
        .toString(16)
        .padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
}

export function pointerEventToCanvasPoint(
    e: React.PointerEvent,
    camera: Camera,
): Point {
    return {
        x: Math.round(e.clientX) - camera.x,
        y: Math.round(e.clientY) - camera.y,
    };
}

export function resizeBounds(bounds: XYWH, corner: Side, point: Point): XYWH {
    const result = {
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height,
    };

    if ((corner & Side.Left) === Side.Left) {
        result.x = Math.min(point.x, bounds.x + bounds.width);
        result.width = Math.abs(bounds.x + bounds.width - point.x);
    }

    if ((corner & Side.Right) === Side.Right) {
        result.x = Math.min(point.x, bounds.x);
        result.width = Math.abs(point.x - bounds.x);
    }

    if ((corner & Side.Top) === Side.Top) {
        result.y = Math.min(point.y, bounds.y + bounds.height);
        result.height = Math.abs(bounds.y + bounds.height - point.y);
    }

    if ((corner & Side.Bottom) === Side.Bottom) {
        result.y = Math.min(point.y, bounds.y);
        result.height = Math.abs(point.y - bounds.y);
    }

    return result;
}

export function findIntersectingLayersWithRectangle(
    layerIds: readonly string[],
    layers: ReadonlyMap<string, Layer>,
    a: Point,
    b: Point,
) {
    const rect = {
        x: Math.min(a.x, b.x),
        y: Math.min(a.y, b.y),
        width: Math.abs(a.x - b.x),
        height: Math.abs(a.y - b.y),
    };

    const ids = [];

    for (const layerId of layerIds) {
        const layer = layers.get(layerId);

        if (!layer) {
            continue;
        }

        const { x, y, width, height } = layer;

        if (
            rect.x + rect.width > x &&
            rect.x < x + width &&
            rect.y + rect.height > y &&
            rect.y < y + height
        ) {
            ids.push(layerId);
        }
    }
    return ids;
}

export function calculateFontSize(width: number, height: number) {
    const maxFontSize = 96;
    const scaleFactor = 0.25;

    const fontSizeBasedOnWidth = width * scaleFactor;
    const fontSizeBasedOnHeight = height * scaleFactor;

    return Math.min(maxFontSize, fontSizeBasedOnWidth, fontSizeBasedOnHeight);
}

export function getContrastingTextColor(color: Color) {
    return fontColorContrast(colorToCss(color));
}

export function penPointsToPathLayer(
    points: number[][],
    color: Color,
): PathLayer {
    if (points.length < 2) {
        throw new Error("Can't transform points with less than 2 points");
    }

    let left = Number.POSITIVE_INFINITY;
    let top = Number.POSITIVE_INFINITY;
    let right = Number.NEGATIVE_INFINITY;
    let bottom = Number.NEGATIVE_INFINITY;

    for (const [x, y] of points) {
        left = Math.min(left, x);
        top = Math.min(top, y);
        right = Math.max(right, x);
        bottom = Math.max(bottom, y);
    }

    return {
        type: LayerType.Path,
        x: left,
        y: top,
        width: right - left,
        height: bottom - top,
        fill: color,
        points: points.map(([x, y, pressure]) => [x - left, y - top, pressure]),
    };
}

export function getSvgPathFromStroke(stroke: number[][]) {
    if (!stroke.length) {
        return "";
    }

    const d = stroke.reduce(
        (acc, [x0, y0], i, arr) => {
            const [x1, y1] = arr[(i + 1) % arr.length];
            acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
            return acc;
        },
        ["M", ...stroke[0], "Q"],
    );

    d.push("Z");

    return d.join(" ");
}
