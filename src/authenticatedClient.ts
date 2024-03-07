import type { OAuthCredentials } from "./types";

interface ExtendedRequestInit extends RequestInit {
  cache?: "no-store" | "force-cache";
}

export default class AuthenticatedClient {
  protected baseUrl = "https://paymagicapi.com/v1";
  private credentials: OAuthCredentials;
  private token?: string;
  private tokenExpiry?: Date;

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
    } as ExtendedRequestInit)
      .then((res) => res.json() as Promise<{ access_token: string }>)
      .then((data) => data.access_token);
    this.token = response;
    this.tokenExpiry = new Date(new Date().getTime() + 30000);
  }

  private async refreshTokenIfNeeded(): Promise<void> {
    if (!this.token || !this.tokenExpiry || new Date() >= this.tokenExpiry) {
      await this.authenticate();
    }
  }

  protected async fetch(
    path: string,
    method: string,
    body?: any,
    headers?: Record<string, string>,
    authenticated = true
  ): Promise<any> {
    if (authenticated) {
      await this.refreshTokenIfNeeded();
    }
    const response = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: {
        ...(headers || {}),
        ...(authenticated && this.token
          ? { Authorization: `Bearer ${this.token}` }
          : {}),
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (authenticated && response.status === 403) {
      await this.authenticate();
      return await this.fetch(path, method, body, headers, true);
    }

    if (response.ok) {
      return await response.json();
    }

    throw new Error(
      `Request failed: ${response.status} ${
        response.statusText
      }, ${await response.text()}`
    );
  }
}
