import * as Ably from 'ably';
import { Types } from 'ably';
import React from 'react';
interface AblyProviderProps {
    children?: React.ReactNode | React.ReactNode[] | null;
    client?: Ably.Types.RealtimePromise;
    id?: string;
}
declare type AblyContextType = React.Context<Types.RealtimePromise>;
export declare const contextKey: string | symbol;
export declare function getContext(ctxId?: string): AblyContextType;
export declare const AblyProvider: ({ client, children, id }: AblyProviderProps) => import("react/jsx-runtime").JSX.Element;
export {};
