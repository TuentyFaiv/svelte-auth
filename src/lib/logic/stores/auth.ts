import { setContext } from "svelte";
import { readable, writable, get } from "svelte/store";
import { storage } from "../utils/globals";

// eslint-disable-next-line import/order
import type { Readable, Writable } from "svelte/store";
import type {
  AuthStore,
  AuthContext,
  AuthUser,
  AuthContextStore
} from "$lib/logic/typing/stores.auth";

import { goto } from "$app/navigation";

class Auth {
  #credentials: Writable<AuthStore>;
  #show: Writable<boolean>;
  #pathname: Writable<string>;
  #isAuth: Writable<boolean>;
  #redirect: Writable<string>;
  #pages: Writable<string[]>;
  #avatar: string | null;

  public context: Readable<AuthContextStore>;
  static instance: Auth | null = null;

  private constructor() {
    const storaged = this.#getstoraged();

    this.#pages = writable<string[]>([]);
    this.#avatar = null;
    this.#redirect = writable("/");
    this.#credentials = writable<AuthStore>({
      token: storaged.token,
      user: storaged.user ? JSON.parse(storaged.user) : null
    });
    this.#show = writable(false);
    this.#isAuth = writable(storaged.auth);
    this.#pathname = writable("/");

    this.context = readable<AuthContextStore>({
      pages: this.#pages,
      show: this.#show,
      isAuth: this.#isAuth,
      credentials: this.#credentials,
      pathname: this.#pathname,
      redirect: this.#redirect,
      update: {
        token: this.#updatetoken,
        user: this.#updateuser
      },
      getstoraged: this.#getstoraged,
      authenticate: this.#authenticate,
      unauthenticate: this.#unauthenticate
    });
  }

  static create() {
    if (Auth.instance === null) {
      Auth.instance = new Auth();
    }

    return Auth.instance;
  }

  public setPages(pages: string[]) {
    this.#pages.set(pages);
  }

  public setRedirect(redirect: string) {
    this.#redirect.set(redirect);
  }

  public setAvatar(avatar: string | null) {
    this.#avatar = avatar;
  }

  // eslint-disable-next-line class-methods-use-this
  #getstoraged = () => {
    const token = storage.getItem("token");
    const user = storage.getItem("user");
    const auth = !(user === null && token === null);

    return {
      auth,
      token,
      user
    };
  };

  // eslint-disable-next-line class-methods-use-this
  #updatetoken = (token: string) => {
    storage.setItem("token", token);
  };

  #updateuser = (data: AuthUser | string) => {
    this.#credentials.update((prev) => {
      const user: AuthUser | null = prev.user ? {
        ...prev.user,
        ...(typeof data === "string" ? { avatar: data } : {
          ...data
        })
      } : null;

      if (user) storage.setItem("user", JSON.stringify(user));
      return {
        ...prev,
        user
      };
    });
  };

  #authenticate = (auth: AuthStore) => {
    if (!(auth.token && auth.user)) return;

    const user: AuthUser = {
      ...auth.user,
      avatar: auth.user.avatar ?? this.#avatar
    };

    storage.setItem("token", auth.token);
    storage.setItem("user", JSON.stringify(user));

    this.#credentials.update((prev) => ({
      ...prev,
      token: auth.token,
      user
    }));
    this.#isAuth.set(true);
  };

  #unauthenticate = () => {
    storage.removeItem("token");
    storage.removeItem("user");

    this.#credentials.set({
      token: null,
      user: null
    });
    this.#isAuth.set(false);

    goto(get(this.#pathname), { replaceState: true });
  };
}

const instance = Auth.create();

export const auth = instance.context;

export function authContext(pages: string[], redirect = "/auth/signin", avatar: string | null = null) {
  instance.setPages(pages);
  instance.setAvatar(avatar);
  instance.setRedirect(redirect);
  setContext<AuthContext>("auth", instance.context);
}
