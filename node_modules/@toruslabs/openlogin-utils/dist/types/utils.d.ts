export declare const base64url: import("base64url").Base64Url;
export declare function safebtoa(str: string): string;
export declare function safeatob(str: string): string;
export declare function base64toJSON<T = Record<string, unknown>>(b64str: string): T;
export declare function jsonToBase64<T = Record<string, unknown>>(json: T): string;
export interface IStorage {
    getItem(key: string): string;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
}
export declare function storageAvailable(type: string): boolean;
