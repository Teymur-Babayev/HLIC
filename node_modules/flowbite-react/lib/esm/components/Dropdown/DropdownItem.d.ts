import { type ComponentProps, type ElementType, type FC } from 'react';
import type { DeepPartial } from '../../types';
import type { PolymorphicComponentPropWithRef } from '~/src/helpers/generic-as-prop';
export interface FlowbiteDropdownItemTheme {
    container: string;
    base: string;
    icon: string;
}
export type DropdownItemProps<T extends ElementType = 'button'> = PolymorphicComponentPropWithRef<T, {
    href?: string;
    icon?: FC<ComponentProps<'svg'>>;
    onClick?: () => void;
    theme?: DeepPartial<FlowbiteDropdownItemTheme>;
}>;
type DropdownItemComponentType = (<C extends React.ElementType = 'button'>(props: DropdownItemProps<C>) => React.ReactNode | null) & {
    displayName?: string;
};
export declare const DropdownItem: DropdownItemComponentType;
export {};
