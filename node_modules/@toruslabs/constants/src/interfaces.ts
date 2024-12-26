import { TORUS_LEGACY_NETWORK, TORUS_SAPPHIRE_NETWORK } from "./constants";

export interface JRPCResponse<T> {
  id: number;
  jsonrpc: "2.0";
  result?: T;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
}

export interface INodePub {
  X: string;
  Y: string;
}

export interface INodeDetails {
  currentEpoch: string;
  torusNodeEndpoints: string[];
  torusNodePub: INodePub[];
  torusIndexes: number[];
  updated?: boolean;
  torusNodeSSSEndpoints?: string[];
  torusNodeRSSEndpoints?: string[];
  torusNodeTSSEndpoints?: string[];
}

export type TORUS_LEGACY_NETWORK_TYPE = (typeof TORUS_LEGACY_NETWORK)[keyof typeof TORUS_LEGACY_NETWORK];

export type TORUS_SAPPHIRE_NETWORK_TYPE = (typeof TORUS_SAPPHIRE_NETWORK)[keyof typeof TORUS_SAPPHIRE_NETWORK];

export type TORUS_NETWORK_TYPE = TORUS_LEGACY_NETWORK_TYPE | TORUS_SAPPHIRE_NETWORK_TYPE;

export type NODE = {
  address: string;
  node_index: string;
  epoch: string;
  public_key: {
    X: string;
    Y: string;
  };
};

export interface NodeLookupResponse {
  nodes: NODE[];
}

export interface ILegacyNetworkMigrationInfo {
  migrationCompleted: boolean;
  networkIdentifier: string;
  networkMigratedTo: TORUS_SAPPHIRE_NETWORK_TYPE;
}

export const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_verifier",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "hashedVerifierId",
        type: "bytes32",
      },
    ],
    name: "getNodeSet",
    outputs: [
      {
        internalType: "uint256",
        name: "currentEpoch",
        type: "uint256",
      },
      {
        internalType: "string[]",
        name: "torusNodeEndpoints",
        type: "string[]",
      },
      {
        internalType: "uint256[]",
        name: "torusNodePubX",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "torusNodePubY",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "torusIndexes",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
