export interface ObjStrCustom<T> {
  [key: string]: T;
}

export interface ObjNumCustom<T> {
  [key: number]: T;
}

export interface ObjStrCommon {
  [key: string]: string | boolean | null | number;
}

export interface ObjNumCommon {
  [key: number]: string | boolean | null | number;
}
