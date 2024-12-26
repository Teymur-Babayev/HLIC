import React from 'react';
import { HandlerArgs as DragArgs } from '@visx/drag/lib/Drag';
import { BaseBrushState as BrushState, UpdateBrush } from './BaseBrush';
import { BrushPageOffset, BrushingType } from './types';
declare type PointerHandler = (event: React.PointerEvent<SVGRectElement>) => void;
export declare type BrushSelectionProps = {
    width: number;
    height: number;
    stageWidth: number;
    stageHeight: number;
    brush: BrushState;
    updateBrush: (update: UpdateBrush) => void;
    onMoveSelectionChange?: (type?: BrushingType, options?: BrushPageOffset) => void;
    onBrushStart?: (brush: DragArgs) => void;
    onBrushEnd?: (brush: BrushState) => void;
    disableDraggingSelection: boolean;
    onMouseLeave: PointerHandler;
    onMouseMove: PointerHandler;
    onMouseUp: PointerHandler;
    onClick: PointerHandler;
    selectedBoxStyle: React.SVGProps<SVGRectElement>;
    isControlled?: boolean;
    isDragInProgress?: boolean;
};
export default class BrushSelection extends React.Component<BrushSelectionProps & Omit<React.SVGProps<SVGRectElement>, keyof BrushSelectionProps>> {
    static defaultProps: {
        onMouseLeave: null;
        onMouseUp: null;
        onMouseMove: null;
        onClick: null;
    };
    selectionDragStart: (drag: DragArgs) => void;
    selectionDragMove: (drag: DragArgs) => void;
    selectionDragEnd: () => void;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=BrushSelection.d.ts.map