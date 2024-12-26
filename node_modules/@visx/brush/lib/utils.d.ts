import { MouseTouchOrPointerEvent } from '@visx/drag/lib/useDrag';
import { Scale } from './types';
export declare function scaleInvert(scale: Scale, value: number): number;
export declare function getDomainFromExtent(scale: Scale, start: number, end: number, tolerentDelta: number): {
    start: number;
    end: number;
    values?: undefined;
} | {
    values: any[];
    start?: undefined;
    end?: undefined;
};
export declare function getPageCoordinates(event: MouseTouchOrPointerEvent): {
    pageX: number;
    pageY: number;
};
//# sourceMappingURL=utils.d.ts.map