import { expect, test, describe } from "bun:test";
import client from "./utils/client";

describe("Signing", () => {
  test("Sign hash", async () => {
    const signature = await client.sign({
      userId: "test:elonmusk",
      hash: "0xec3608877ecbf8084c29896b7eab2a368b2b3c8d003288584d145613dfa4706c",
    });
    expect(signature).toEqual({
      hash: "0xec3608877ecbf8084c29896b7eab2a368b2b3c8d003288584d145613dfa4706c",
      signature:
        "0xe23e1c9df7a8155381e3d21beebe7c566a6ebbe223bcc3e14c8a6dfbfd0b145463ce3b5d1cdee644a81fd1a3cf0588cb915c418d51f6a649ea9cbc7cb6d4c0ea1b",
      type: "hash",
    });
  });
  test("Sign string", async () => {
    const signature = await client.sign({
      userId: "test:elonmusk",
      string: "Hello World!",
    });
    expect(signature).toEqual({
      hash: "0xec3608877ecbf8084c29896b7eab2a368b2b3c8d003288584d145613dfa4706c",
      signature:
        "0xe23e1c9df7a8155381e3d21beebe7c566a6ebbe223bcc3e14c8a6dfbfd0b145463ce3b5d1cdee644a81fd1a3cf0588cb915c418d51f6a649ea9cbc7cb6d4c0ea1b",
      type: "string",
    });
  });
  test("Sign typed data", async () => {
    const signature = await client.sign({
      userId: "test:elonmusk",
      typedData: {
        domain: {
          name: "Ether Mail",
          version: "1",
          chainId: 137,
          verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
        },
        types: {
          Person: [
            { name: "name", type: "string" },
            { name: "wallet", type: "address" },
          ],
          Mail: [
            { name: "from", type: "Person" },
            { name: "to", type: "Person" },
            { name: "contents", type: "string" },
          ],
        },
        value: {
          from: {
            name: "Cow",
            wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
          },
          to: {
            name: "Bob",
            wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
          },
          contents: "Hello, Bob!",
        },
      },
    });
    expect(signature).toEqual({
      hash: "0x53e341aefc7641107dbb3d5af2a67709d7132f5cc532d728b2b610bf1e4ba72e",
      signature:
        "0x48732939ebce07dab77c5ef1b611bc261cd4486e894c5543648d1867a01eebaf50ddadfc3a3011a66b496ab2ed90619eca79fb3a84ffa136d016ddf3763e4f601b",
      type: "typedData",
    });
  });
});
