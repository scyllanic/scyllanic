interface BaseWhereFilter<T> {
  in?: T[];
  nin?: T[];
  eq?: T;
  neq?: T;
}

type Where<T> = {
  [K in keyof T]: T[K] | BaseWhereFilter<T[K]>;
};

export type WhereFilter<T> = Partial<Where<T>>;
