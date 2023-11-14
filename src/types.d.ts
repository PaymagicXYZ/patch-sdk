export type Address = `0x${string}`;
export type HexString = `0x${string}`;

export const supportedChains = [
  "matic",
  "oeth",
  "arb1",
  "linea",
  "base",
  "gno",
  "bnb",
  "maticmum",
] as const;
export type Chain = (typeof supportedChains)[number];

export interface OAuthCredentials {
  clientId: string;
  clientSecret: string;
}

export const socialNetworks = [
  "email",
  "tel",
  "twitter",
  "github",
  "passphrase",
  "discord",
] as const;
export type SocialNetwork = (typeof socialNetworks)[number];
export type UserId = `${SocialNetwork | "test"}:${string}`;

export interface TxData {
  userId: UserId;
  chain: Chain;
  to: Address[];
  value: String[];
  data: HexString[];
  delegatecall: 0 | 1;
  auth: "" | string;
}

export interface SignHashData {
  userId: UserId;
  hash: HexString;
}
export interface SignStringData {
  userId: UserId;
  string: string;
}
export interface SignTypedData {
  userId: UserId;
  typedData: any;
}
export type SignData = SignHashData | SignStringData | SignTypedData;
