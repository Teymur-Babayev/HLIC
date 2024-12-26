import React from 'react';
declare type BrushOverlayProps = {
    width: number;
    height: number;
    style?: React.CSSProperties;
    onClick?: (event: React.PointerEvent<SVGRectElement>) => void;
    onDoubleClick?: (event: React.PointerEvent<SVGRectElement>) => void;
    onPointerDown?: (event: React.PointerEvent<SVGRectElement>) => void;
    onPointerLeave?: (event: React.PointerEvent<SVGRectElement>) => void;
    onPointerMove?: (event: React.PointerEvent<SVGRectElement>) => void;
    onPointerUp?: (event: React.PointerEvent<SVGRectElement>) => void;
};
export default function BrushOverlay(props: BrushOverlayProps): JSX.Element;
export {};
//# sourceMappingURL=BrushOverlay.d.ts.map