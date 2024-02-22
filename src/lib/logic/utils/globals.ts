import { browser } from "$app/environment";

class Storage {
  #store: Map<string, string> = new Map();

  getItem = (key: string) => {
    if (this.#store.has(key)) {
      return this.#store.get(key)!;
    }

    return null;
  };

  setItem = (key: string, value: string) => {
    this.#store.set(key, value);
  };

  removeItem = (key: string) => {
    this.#store.delete(key);
  };

  clear = () => {
    this.#store.clear();
  };
}

export const storage = browser ? globalThis.localStorage : new Storage();

export const session = browser ? globalThis.sessionStorage : new Storage();
