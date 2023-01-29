import { browser } from "$app/environment";
import type { ObjStrCustom } from "../typing/globals.types";

const store: ObjStrCustom<string> = {};

export const storage = browser ? globalThis.localStorage : {
  getItem(key: string) {
    if (store[key]) {
      return store[key];
    }
    return null;
  },
  setItem(key: string, value: unknown) {
    store[key] = `${value}`;
  },
  removeItem(key: string) {
    delete store[key];
  }
};

export const session = globalThis.sessionStorage;

export const { performance } = globalThis;

export const { log, warn, error: danger, info } = globalThis.console;
