import type {
  OAuthCredentials,
  UserId,
  Address,
  TxData,
  SignData,
  HexString,
} from "./types";
export type * from "./types";
export default class Client {
  private baseUrl = "https://paymagicapi.com/v1";
  private credentials: OAuthCredentials;
  private token?: string;
  private tokenExpiry?: Date;
  private appProvider?: string;

  constructor(credentials: OAuthCredentials) {
    this.credentials = credentials;
  }

  async authenticate(): Promise<void> {
    const response = await fetch(`${this.baseUrl}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: this.credentials.clientId,
        client_secret: this.credentials.clientSecret,
      }),
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => data.access_token);
    this.token = response;
    this.tokenExpiry = new Date(new Date().getTime() + 30000);
  }

  private async refreshTokenIfNeeded(): Promise<void> {
    if (!this.token || !this.tokenExpiry || new Date() >= this.tokenExpiry) {
      await this.authenticate();
    }
  }

  async tx(data: TxData): Promise<{ error: string } | { txHash: HexString }> {
    await this.refreshTokenIfNeeded();
    const response = await fetch(`${this.baseUrl}/kernel/tx`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 403) {
      await this.authenticate();
      return this.tx(data);
    }
    if (response.status === 200) {
      const resData = await response.json();
      return { txHash: resData.txHash };
    }
    return {
      error:
        "Transaction failed:" +
        String(response.status) +
        String(response.statusText),
    };
  }

  async sign(data: SignData): Promise<
    | {
        hash: HexString;
        signature: HexString;
        type: "hash" | "string" | "typedData";
      }
    | { error: string }
  > {
    await this.refreshTokenIfNeeded();
    const response = await fetch(`${this.baseUrl}/kernel/sign`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 403) {
      await this.authenticate();
      return this.sign(data);
    }
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
    return {
      error:
        "Transaction failed:" +
        String(response.status) +
        String(response.statusText),
    };
  }

  async resolve(userIds: UserId | UserId[]): Promise<Address | Address[]> {
    const resolvedUser = await fetch(`${this.baseUrl}/resolver`, {
      method: "POST",
      body: JSON.stringify({ userIds: [userIds].toString() }),
    })
      .then((res) => res.json())
      .then((data) => data.users)
      .catch((err) => {
        console.error(err);
        return "";
      });
    const addresses = resolvedUser.map(
      (u: { accountAddress: Address }) => u.accountAddress
    );
    return addresses.length === 1 ? addresses[0] : addresses;
  }
}
