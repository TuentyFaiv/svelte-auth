import type { Readable, Writable } from "svelte/store";

export interface AuthStore {
  token: string | null;
  user: AuthUser | null;
}

export type AuthContext = Readable<AuthContextStore>;

export interface AuthContextStore {
  show: Writable<boolean>;
  isAuth: Writable<boolean>;
  credentials: Writable<AuthStore>;
  pathname: Writable<string>;
  redirect: Writable<string>;
  update: Update;
  pages: Writable<string[]>;
  authenticate(auth: AuthStore): void;
  unauthenticate(): void;
  getstoraged(): Storaged;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
}

export interface Storaged {
  auth: boolean;
  token: string | null;
  user: string | null;
}

export interface Update {
  token(token: string): void;
  user(data: AuthUser | string): void;
}
