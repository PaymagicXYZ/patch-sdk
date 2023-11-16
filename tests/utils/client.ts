import Client from "../../src";
import { OAuthCredentials } from "../../src/types";

const credentials: OAuthCredentials = {
  clientId: "demo-user-external",
  clientSecret: "k^yf57yg27MKo2SnuzwX",
};
const client = new Client(credentials);

export default client;
