import { D3Scale, NumberLike } from '@visx/scale';
export declare type Point = {
    x: number;
    y: number;
};
export declare type Bounds = {
    x0: number;
    x1: number;
    xValues?: unknown[];
    y0: number;
    y1: number;
    yValues?: unknown[];
};
export interface MarginShape {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
}
export interface BrushShape extends BrushStartEnd {
    extent: Bounds;
    bounds: Bounds;
}
export interface BrushStartEnd {
    start: Point;
    end: Point;
}
export interface PartialBrushStartEnd {
    start: Partial<Point>;
    end: Partial<Point>;
}
export declare type ResizeTriggerAreas = 'left' | 'right' | 'top' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
export declare type BrushingType = 'move' | 'select' | ResizeTriggerAreas;
export declare type BrushPageOffset = {
    pageX?: number;
    pageY?: number;
};
declare type BrushScaleOutput = number | NumberLike | undefined;
/** A catch-all type for scales that are compatible with axis */
export declare type Scale<Output extends BrushScaleOutput = BrushScaleOutput> = D3Scale<Output, any, any>;
export {};
//# sourceMappingURL=types.d.ts.map