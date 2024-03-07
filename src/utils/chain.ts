import { Chain } from "../types";

export interface ChainDetail {
  [chainId: number]: {
    AlchemyChainNetwork: string;
    CovalentChainName: string;
    shortName: Chain;
    explorer: string;
    defaultMoonPayCurrency?: string;
  };
}

export const ChainIdForChainName: ChainDetail = {
  1: {
    AlchemyChainNetwork: "eth-mainnet",
    CovalentChainName: "eth-mainnet",
    shortName: "eth",
    explorer: "https://etherscan.io/",
    defaultMoonPayCurrency: "ETH",
  },
  137: {
    AlchemyChainNetwork: "polygon-mainnet",
    CovalentChainName: "matic-mainnet",
    shortName: "matic",
    explorer: "https://polygonscan.com/",
    defaultMoonPayCurrency: "USDC_POLYGON",
  },
  10: {
    AlchemyChainNetwork: "opt-mainnet",
    CovalentChainName: "optimism-mainnet",
    shortName: "oeth",
    explorer: "https://optimistic.etherscan.io/",
    defaultMoonPayCurrency: "USDC_OPTIMISM",
  },
  42161: {
    AlchemyChainNetwork: "arb-mainnet",
    CovalentChainName: "arbitrum-mainnet",
    shortName: "arb1",
    explorer: "https://explorer.offchainlabs.com/",
    defaultMoonPayCurrency: "USDC_ARBITRUM",
  },
  59144: {
    AlchemyChainNetwork: "",
    CovalentChainName: "linea-mainnet",
    shortName: "linea",
    explorer: "https://lineascan.build",
  },
  8453: {
    AlchemyChainNetwork: "base-mainnet",
    CovalentChainName: "base-mainnet",
    shortName: "base",
    explorer: "https://basescan.org",
    defaultMoonPayCurrency: "USDC_BASE",
  },
  100: {
    AlchemyChainNetwork: "",
    CovalentChainName: "gnosis-mainnet",
    shortName: "gno",
    explorer: "https://gnosisscan.io",
  },
  56: {
    AlchemyChainNetwork: "",
    CovalentChainName: "bsc-mainnet",
    shortName: "bnb",
    explorer: "https://bscscan.com",
  },
  80001: {
    AlchemyChainNetwork: "polygon-mumbai",
    CovalentChainName: "matic-mumbai",
    shortName: "maticmum",
    explorer: "https://mumbai.polygonscan.com",
  },
};
export const supportedNetworks = Object.values(ChainIdForChainName).map(
  (chain) => chain.AlchemyChainNetwork
);
export const supportedChainNames = Object.values(ChainIdForChainName).map(
  (chain) => chain.CovalentChainName
);
export const supportedChainIds = Object.keys(ChainIdForChainName).map(
  (chainIdStr) => Number(chainIdStr)
);
export const supportedShortNames = Object.values(ChainIdForChainName).map(
  (chain) => chain.shortName
);
export type Networks = (typeof supportedNetworks)[number];
export type ChainName = (typeof supportedChainNames)[number];
export type ChainId = (typeof supportedChainIds)[number];
export type ShortName = (typeof supportedShortNames)[number];
export const getNetworkFromChainId = (chainId: ChainId): Networks =>
  ChainIdForChainName[chainId].AlchemyChainNetwork;

export const getChainNameFromChainId = (chainId: ChainId): ChainName =>
  ChainIdForChainName[chainId].CovalentChainName;

export const getChainIdFromNetwork = (network: Networks): ChainId => {
  const chainId = Object.keys(ChainIdForChainName).find(
    (key) => ChainIdForChainName[Number(key)].AlchemyChainNetwork === network
  );
  return Number(chainId);
};

export const getChainNameFromShortName = (shortName: ShortName): ChainName => {
  const chainName = Object.keys(ChainIdForChainName).find(
    (key) => ChainIdForChainName[Number(key)].shortName === shortName
  );
  return ChainIdForChainName[Number(chainName)].CovalentChainName;
};

export const getNetworkfromShortName = (shortName: ShortName): Networks => {
  const network = Object.keys(ChainIdForChainName).find(
    (key) => ChainIdForChainName[Number(key)].shortName === shortName
  );
  return ChainIdForChainName[Number(network)].AlchemyChainNetwork;
};

export const isSupportedChain = (chain: ShortName): boolean =>
  supportedShortNames.includes(chain);

export const getExplorerFromShortName = (shortName: ShortName): string => {
  const explorer = Object.keys(ChainIdForChainName).find(
    (key) => ChainIdForChainName[Number(key)].shortName === shortName
  );
  return ChainIdForChainName[Number(explorer)].explorer;
};

export const getDefaultMoonPayCurrency = (shortName: ShortName): string => {
  const currency = Object.keys(ChainIdForChainName).find(
    (key) => ChainIdForChainName[Number(key)].shortName === shortName
  );
  return ChainIdForChainName[Number(currency)].defaultMoonPayCurrency || "ETH";
};
