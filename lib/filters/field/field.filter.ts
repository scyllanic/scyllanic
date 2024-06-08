type FieldExistence = true | false | 1 | 0;

export type FieldFilter<T> = {
  [K in keyof T]: FieldExistence;
};
