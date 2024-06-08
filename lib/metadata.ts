import { ModelDefinition } from './interfaces/model.interface';
import { PropertySchema } from './interfaces/property.interface';
import { Constructor } from './types';

export const getModelDefinition = <T>(
  ctor: Constructor<T>
): ModelDefinition => {
  return Reflect.getMetadata('meta:model', ctor);
};

export const getPropsDefinition = <T>(
  ctor: Constructor<T>
): PropertySchema<T> => {
  return Reflect.getMetadata('meta:property', ctor);
};
