export type ColumnTypes =
  | 'number'
  | 'string'
  | 'boolean'
  | 'array'
  | 'object'
  | 'date'
  | 'any';

export interface PropertyDefinition {
  id?: boolean;
  name?: string;
  fieldName?: string;
  type?: ColumnTypes;
  required?: boolean;
  nullable?: boolean;
  format?: string;
}

export type PropertySchema<T> = {
  [K in keyof T]: PropertyDefinition;
};
