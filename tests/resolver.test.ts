import { expect, test, describe } from "bun:test";
import client from "./utils/client";

describe("resolver", () => {
  test("resolve one", async () => {
    const address = await client.resolve("twitter:mikelxc");
    expect(address).toBe("0x83da011b7e98A9744Fdf68e843D0C4bEC24f8700");
  });

  test("resolve many", async () => {
    const addresses = await client.resolve([
      "twitter:mikelxc",
      "github:mikelxc",
    ]);
    expect(addresses).toEqual([
      "0x83da011b7e98A9744Fdf68e843D0C4bEC24f8700",
      "0x4cB02Ce43Cb78EE4dcADFa2C582a5BaDc546f46D",
    ]);
  });
});
