import type { Readable, Writable } from "svelte/store";

export interface AuthStore {
  token: string | null;
  user: AuthUser | null;
}

export type AuthContext = Readable<AuthContextStore>;

export interface AuthConfig {
  pages: string[];
  redirect: string;
}

export interface AuthContextStore {
  update: Update;
  show: Writable<boolean>;
  pages: Writable<string[]>;
  pathname: Writable<string>;
  redirect: Writable<string>;
  credentials: Writable<AuthStore>;
  authorized: Writable<boolean>;
  authorize(data: AuthStore): void;
  unauthorize(): void;
  storaged(): Storaged;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
}

export interface Storaged {
  authorized: boolean;
  token: string | null;
  user: string | null;
}

export interface Update {
  token(value: string): void;
  user(data: AuthUser): void;
}
