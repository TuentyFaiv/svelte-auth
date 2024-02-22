import { getContext, setContext } from "svelte";
import { readable, writable } from "svelte/store";
import { storage } from "../utils/globals.js";

// eslint-disable-next-line import/order
import type { Readable, Writable } from "svelte/store";
import type {
  AuthStore,
  AuthContext,
  AuthUser,
  AuthContextStore,
  Storaged,
  AuthConfig,
} from "../typing/stores.auth.js";

class Auth {
  #show: Writable<boolean> = writable(false);
  #pages: Writable<string[]> = writable([]);
  #pathname: Writable<string> = writable("/");
  #redirect: Writable<string> = writable("/");
  #credentials: Writable<AuthStore> = writable({ token: null, user: null });
  #authorized: Writable<boolean> = writable(false);

  #keys = {
    token: "faivauth_token",
    user: "faivauth_user",
  };

  public context: Readable<AuthContextStore>;
  static instance: Auth | null = null;

  private constructor(config: AuthConfig) {
    const storaged = this.#storaged();

    this.#pages.set(config.pages);
    this.#redirect.set(config.redirect);
    this.#credentials.set({
      token: storaged.token,
      user: storaged.user ? JSON.parse(storaged.user) : null,
    });
    this.#authorized.set(storaged.authorized);

    this.context = readable<AuthContextStore>({
      update: {
        token: this.#updatetoken,
        user: this.#updateuser,
      },
      show: this.#show,
      pages: this.#pages,
      pathname: this.#pathname,
      redirect: this.#redirect,
      credentials: this.#credentials,
      authorized: this.#authorized,
      storaged: this.#storaged,
      authorize: this.#authorize,
      unauthorize: this.#unauthorize,
    });
  }

  static create(config: AuthConfig) {
    if (Auth.instance === null) {
      Auth.instance = new Auth(config);
    }

    return Auth.instance;
  }

  #storaged = (): Storaged => {
    const token = storage.getItem(this.#keys.token);
    const user = storage.getItem(this.#keys.user);
    const authorized = !(user === null && token === null);

    return {
      authorized,
      token,
      user,
    };
  };

  #updatetoken = (token: string) => {
    this.#credentials.update((prev) => {
      storage.setItem(this.#keys.token, token);
      return {
        ...prev,
        token,
      };
    });
  };

  #updateuser = (data: AuthUser) => {
    this.#credentials.update((prev) => {
      const updated: AuthUser = prev.user ? {
        ...prev.user,
        ...data,
      } : data;

      if (updated) storage.setItem(this.#keys.user, JSON.stringify(updated));
      return {
        ...prev,
        user: updated,
      };
    });
  };

  #authorize = (auth: AuthStore) => {
    if (!(auth.token && auth.user)) return;

    storage.setItem(this.#keys.token, auth.token);
    storage.setItem(this.#keys.user, JSON.stringify(auth.user));

    this.#credentials.update((prev) => ({
      ...prev,
      ...auth,
    }));
    this.#authorized.set(true);
  };

  #unauthorize = () => {
    storage.removeItem(this.#keys.token);
    storage.removeItem(this.#keys.user);

    this.#credentials.set({
      token: null,
      user: null,
    });
    this.#authorized.set(false);
  };
}

export function authContext(pages: string[], redirect = "/auth/signin") {
  const faivauth = Auth.create({ pages, redirect });
  setContext<AuthContext>("faivauth", faivauth.context);

  return faivauth.context;
}

export function useAuth() {
  return getContext<AuthContext>("faivauth");
}
