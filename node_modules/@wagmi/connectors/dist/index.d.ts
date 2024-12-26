export { C as Connector, a as ConnectorData, b as ConnectorEvents, W as WindowProvider } from './base-24d0a67f.js';
import 'eventemitter3';
import 'viem';
import 'viem/chains';

declare class ChainNotConfiguredForConnectorError extends Error {
    name: string;
    constructor({ chainId, connectorId, }: {
        chainId: number;
        connectorId?: string;
    });
}
declare class ConnectorNotFoundError extends Error {
    name: string;
    message: string;
}

declare function normalizeChainId(chainId: string | number | bigint): number;

export { ChainNotConfiguredForConnectorError, ConnectorNotFoundError, normalizeChainId };
