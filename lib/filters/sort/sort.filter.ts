export enum SortingDirection {
  ASC = 1,
  DESC = -1,
}

export type SortFilter<T> = {
  [K in keyof T]: SortingDirection;
};
