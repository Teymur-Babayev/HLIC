import { TextProps } from '@visx/text/lib/Text';
import { OrientationType } from '../constants/orientation';
import { AxisScaleOutput } from '../types';
export interface TransformArgs {
    labelOffset: number;
    labelProps: Partial<TextProps>;
    orientation: OrientationType;
    range: AxisScaleOutput[];
    tickLabelFontSize: number;
    tickLength: number;
}
export default function getLabelTransform({ labelOffset, labelProps, orientation, range, tickLabelFontSize, tickLength, }: TransformArgs): {
    x: number;
    y: number;
    transform: string | undefined;
};
//# sourceMappingURL=getLabelTransform.d.ts.map