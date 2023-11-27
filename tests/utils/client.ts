import Client from "../../src";
import { OAuthCredentials } from "../../src/types";

const credentials: OAuthCredentials = {
  clientId: Bun.env.CLIENT_ID,
  clientSecret: Bun.env.CLIENT_SECRET,
};

const client = new Client(credentials);

export default client;
