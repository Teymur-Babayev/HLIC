import React from 'react';
import { ResizeObserverPolyfill } from '../types';
export declare type ParentSizeProps = {
    /** Optional `className` to add to the parent `div` wrapper used for size measurement. */
    className?: string;
    /** Child render updates upon resize are delayed until `debounceTime` milliseconds _after_ the last resize event is observed. */
    debounceTime?: number;
    /** Optional flag to toggle leading debounce calls. When set to true this will ensure that the component always renders immediately. (defaults to true) */
    enableDebounceLeadingCall?: boolean;
    /** Optional dimensions provided won't trigger a state change when changed. */
    ignoreDimensions?: keyof ParentSizeState | (keyof ParentSizeState)[];
    /** Optional `style` object to apply to the parent `div` wrapper used for size measurement. */
    parentSizeStyles?: React.CSSProperties;
    /** Optionally inject a ResizeObserver polyfill, else this *must* be globally available. */
    resizeObserverPolyfill?: ResizeObserverPolyfill;
    /** Child render function `({ width, height, top, left, ref, resize }) => ReactNode`. */
    children: (args: {
        ref: HTMLDivElement | null;
        resize: (state: ParentSizeState) => void;
    } & ParentSizeState) => React.ReactNode;
};
declare type ParentSizeState = {
    width: number;
    height: number;
    top: number;
    left: number;
};
export declare type ParentSizeProvidedProps = ParentSizeState;
export default function ParentSize({ className, children, debounceTime, ignoreDimensions, parentSizeStyles, enableDebounceLeadingCall, resizeObserverPolyfill, ...restProps }: ParentSizeProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof ParentSizeProps>): JSX.Element;
export {};
//# sourceMappingURL=ParentSize.d.ts.map