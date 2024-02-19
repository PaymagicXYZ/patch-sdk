import { SocialNetwork, UserId, socialNetworks } from "../types";

export function isUserId(value: any): value is UserId {
  const parts = String(value).split(":");
  const [prefix, ...rest] = parts;
  const validPrefixes = socialNetworks;
  return (
    validPrefixes.includes(prefix as SocialNetwork) &&
    typeof rest.join(":") === "string" &&
    rest.join(":").length > 0
  );
}
