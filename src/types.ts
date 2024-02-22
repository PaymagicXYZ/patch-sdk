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
  "farcaster",
] as const;
export type SocialNetwork = (typeof socialNetworks)[number];
export type UserId = `${SocialNetwork | "test"}:${string}`;

interface UserIdData {
  userId: UserId;
  auth: "" | string;
}

export type TxData = UserIdData & {
  chain: Chain;
  to: Address[];
  value: String[];
  data: HexString[];
  delegatecall: 0 | 1;
};

export type SignHashData = UserIdData & {
  hash: HexString;
};

export type SignStringData = UserIdData & {
  string: string;
};

export type SignTypedData = UserIdData & {
  typedData: any;
};

export type SignData = SignHashData | SignStringData | SignTypedData;
