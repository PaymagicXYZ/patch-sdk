# patch-sdk

[Patch Wallet](https://patchwallet.com) SDK for Typescript.

It is the tool for developing with zero-onboarding wallets.

The SDK currently supports the following chains:
- "matic",
- "oeth",
- "arb1",
- "linea",
- "base",
- "gno",
- "bnb",
- "maticmum"

## Getting Started:

Install patch-sdk with your favorite package manager: 

`bun add @patchwallet/patch-sdk`

or 
`npm i @patchwallet/patch-sdk`

`yarn add @patchwallet/patch-sdk`

### After installing the app, you can then import the client and use the SDK by creating a new client with your credentials:

``` javascript
import Client from "@patchwallet/patch-sdk";

const credentials = {
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
};
const client = new Client(credentials);

```

### Supported Methods:

#### Resolve

Takes an user id (or an array) of user ids and returns a wallet address (or an array of addresses) for Twitter users, emails, phone numbers, and other user IDs.

![userID](https://815081574-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FbmEIBx4wSMWwZFUO6eE1%2Fuploads%2FEeNWhGrPGzcLRg77Ca7C%2Fimage.png?alt=media&token=55d1c60a-b1d0-48ec-a730-33e3e0dcdc6c)

``` javascript
const address = await client.resolve("test:elonmusk");
//address '0xB0A2A03c55580EA55D6c9F6db0e79e218F21d179'
```

```javascript
const addresses = await client.resolve([
      "twitter:mikelxc",
      "github:mikelxc",
    ]);
//addresses [ "0x83da011b7e98A9744Fdf68e843D0C4bEC24f8700","0x4cB02Ce43Cb78EE4dcADFa2C582a5BaDc546f46D"]
```

#### Tx

Takes TxData and returns TxHash if the transactions go through.

TxData: 
- userId: same as defined in resolver
- chain: supported chains
- to: array of the addresses to
- value: array of the values to each address
- data: callData for each address
- delegatecall: Optional parameter. Set to 1 for a delegatecall().
- auth: JWT token for user authentication. Blank for an app provider wallet 

e.g. Transfer .01 USDC
``` javascript
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
```
#### Sign
Sign any arbitrary message using an EIP-1271 signature from your Patch wallet. Commonly used to sign into an application, submit a trade, or list an NFT on a marketplace. 

SignData:
- userId: same as above
- hash/string/typedData: the message to sign in the corresponding format

e.g. Sign a hash
```javascript
const signature = await client.sign({
      userId: "test:elonmusk",
      hash: "0xec3608877ecbf8084c29896b7eab2a368b2b3c8d003288584d145613dfa4706c",
    });
// signature
// {
//       hash: "0xec3608877ecbf8084c29896b7eab2a368b2b3c8d003288584d145613dfa4706c",
//       signature:
//         "0xe23e1c9df7a8155381e3d21beebe7c566a6ebbe223bcc3e14c8a6dfbfd0b145463ce3b5d1cdee644a81fd1a3cf0588cb915c418d51f6a649ea9cbc7cb6d4c0ea1b",
//       type: "hash",
//     }
```