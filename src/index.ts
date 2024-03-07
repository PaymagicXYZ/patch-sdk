import type { UserId, Address, TxData, SignData, HexString } from "./types";
export type * from "./types";
import AuthenticatedClient from "./authenticatedClient";

export default class Client extends AuthenticatedClient {
  async tx(data: TxData): Promise<{ error: string } | { txHash: HexString }> {
    const response = await this.fetch("/kernel/tx", "POST", data);

    if (!!response.txHash) {
      return { txHash: response.txHash };
    } else {
      const txStatus = await this.txStatus(response.userOpHash);
      if ("error" in txStatus) {
        return txStatus;
      }
      return { txHash: txStatus.txHash };
    }
  }

  async txStatus(
    userOpHash: HexString,
    retryCount: number = 0
  ): Promise<{ txHash: HexString } | { error: string }> {
    if (retryCount > 3) {
      return {
        error: "Transaction stuck in pending state for too long, it may fail",
      };
    }

    const response = await this.fetch("/kernel/txStatus", "POST", {
      userOpHash,
    });

    if (!!response.txHash) {
      return { txHash: response.txHash };
    } else {
      return await this.txStatus(response.userOpHash, retryCount + 1);
    }
  }

  async sign(data: SignData): Promise<
    | {
        hash: HexString;
        signature: HexString;
        type: "hash" | "string" | "typedData";
      }
    | { error: string }
  > {
    const response = await this.fetch("/kernel/sign", "POST", data);
    return response;
  }

  async resolve(userIds: UserId): Promise<Address>;
  async resolve(userIds: UserId[]): Promise<Address[]>;

  async resolve(userIds: UserId | UserId[]): Promise<Address | Address[]> {
    const resolvedUser = await this.fetch(
      "/resolver",
      "POST",
      { userIds: [userIds].toString() },
      undefined,
      false
    )
      .then((data) => data.users)
      .catch((err) => {
        console.error(err);
        return [];
      });
    const addresses = resolvedUser.map(
      (u: { accountAddress: Address }) => u.accountAddress
    );
    return addresses.length === 1 ? addresses[0] : addresses;
  }
}
