import { IStorage } from "./utils";
export declare class MemoryStore implements IStorage {
    store: Map<string, string>;
    getItem(key: string): string;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
}
export declare class BrowserStorage {
    private static instanceMap;
    storage: IStorage;
    private _storeKey;
    private constructor();
    static getInstance(key: string, storageKey?: "session" | "local" | "memory"): BrowserStorage;
    toJSON(): string;
    resetStore(): Record<string, unknown>;
    getStore(): Record<string, unknown>;
    get<T>(key: string): T;
    set<T>(key: string, value: T): void;
}
