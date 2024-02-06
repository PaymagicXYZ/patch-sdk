import { SocialNetwork, UserId, socialNetworks } from "../types";

export function isUserId(value: any): value is UserId {
  const parts = String(value).split(":");
  const [prefix, ...rest] = parts;
  const validPrefixes = socialNetworks;
  return (
    validPrefixes.includes(prefix as SocialNetwork) &&
    rest.join(":").length == 1
  );
}
