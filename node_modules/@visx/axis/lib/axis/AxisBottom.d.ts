/// <reference types="react" />
import { SharedAxisProps, AxisScale } from '../types';
export declare const bottomTickLabelProps: {
    readonly dy: "0.25em";
    readonly fill: "#222";
    readonly fontFamily: "Arial";
    readonly fontSize: 10;
    readonly textAnchor: "middle";
};
export default function AxisBottom<Scale extends AxisScale>({ axisClassName, labelOffset, tickLength, tickLabelProps, ...restProps }: SharedAxisProps<Scale>): JSX.Element;
//# sourceMappingURL=AxisBottom.d.ts.map