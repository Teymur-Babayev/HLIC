import { TransactionOrVersionedTransaction } from "./interfaces";
export declare const handleEvent: (handle: EventTarget, eventName: string, handler: (...args: unknown[]) => void, ...handlerArgs: unknown[]) => void;
export declare const htmlToElement: <T extends Element>(html: string) => T;
export declare function isLegacyTransactionInstance(transaction: TransactionOrVersionedTransaction): boolean;
