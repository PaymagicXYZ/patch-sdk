import { expect, test, describe } from "bun:test";
import client from "./utils/client";

describe("Transactions", () => {
  test("Transfer .01 USDC", async () => {
    const tx = await client.tx({
      userId: "test:elonmusk",
      chain: "matic",
      to: ["0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"],
      value: ["0"],
      data: [
        "0xa9059cbb000000000000000000000000a969E3D8b4A376a59B15C70f29Deb08fbFab07810000000000000000000000000000000000000000000000000000000000002710",
      ],
      delegatecall: 0,
      auth: "",
    });
    console.log(tx);
    expect(tx).toHaveProperty("txHash");
  }, 30000);

  test("Transfer .00001 MATIC", async () => {
    const tx = await client.tx({
      userId: "test:elonmusk",
      chain: "matic",
      to: ["0x74427681c620DE258Aa53a382d6a4C865738A06C"],
      value: ["10000000000000"],
      data: ["0x"],
      delegatecall: 0,
      auth: "",
    });
    console.log(tx);
    expect(tx).toHaveProperty("txHash");
  }, 30000);
});
