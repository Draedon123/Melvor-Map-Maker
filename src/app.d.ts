declare global {
  namespace App {}

  type Nullable<T extends object> = {
    [k in keyof T]: T[k] | null;
  };
}

export {};
