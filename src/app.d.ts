declare global {
  namespace App {}

  type Nullable<T extends object> = {
    [k in keyof T]: T[k] | null;
  };

  // https://stackoverflow.com/questions/45372227/how-to-implement-typescript-deep-partial-mapped-type-not-breaking-array-properti/49936686#49936686
  type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[]
      ? DeepPartial<U>[]
      : T[P] extends Readonly<infer U>[]
        ? Readonly<DeepPartial<U>>[]
        : DeepPartial<T[P]>;
  };
}

export {};
