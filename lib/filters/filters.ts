import { FieldFilter } from './field/field.filter';
import { SortFilter } from './sort/sort.filter';
import { WhereFilter } from './where/where.filter';

export type FindFilter<T> = {
  where: WhereFilter<T>;
  fields?: FieldFilter<T>;
  sort?: SortFilter<T>;
};

export type FindByIdFilter<T> = {
  fields: FieldFilter<T>;
};
