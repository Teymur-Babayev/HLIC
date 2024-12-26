import React from 'react';
import { HandlerArgs as DragArgs } from '@visx/drag/lib/Drag';
import { BaseBrushState as BrushState, UpdateBrush } from './BaseBrush';
import { BrushPageOffset, BrushingType, ResizeTriggerAreas } from './types';
declare type HandleProps = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export declare type BrushHandleProps = {
    stageWidth: number;
    stageHeight: number;
    brush: BrushState;
    updateBrush: (update: UpdateBrush) => void;
    onBrushStart?: (brush: DragArgs) => void;
    onBrushEnd?: (brush: BrushState) => void;
    type: ResizeTriggerAreas;
    handle: HandleProps;
    isControlled?: boolean;
    isDragInProgress?: boolean;
    onBrushHandleChange?: (type?: BrushingType, options?: BrushPageOffset) => void;
    renderBrushHandle?: (props: BrushHandleRenderProps) => React.ReactNode;
};
export declare type BrushHandleRenderProps = HandleProps & {
    /** if brush extent is not active this prop is set to false */
    isBrushActive: boolean;
    className: string;
};
/** BrushHandle's are placed along the bounds of the brush and handle Drag events which update the passed brush. */
export default class BrushHandle extends React.Component<BrushHandleProps> {
    handleDragStart: (drag: DragArgs) => void;
    handleDragMove: (drag: DragArgs) => void;
    handleDragEnd: () => void;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=BrushHandle.d.ts.map