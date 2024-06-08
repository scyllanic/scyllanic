/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import {
  PropertyDefinition,
  PropertySchema,
} from '../interfaces/property.interface';
import { Constructor } from '../types';

const getPropertiesMetadata = <T>(ctor: Constructor<T>): PropertySchema<T> => {
  return Reflect.getMetadata('meta:property', ctor) || {};
};

export const Property = (propertyDefinition?: PropertyDefinition) => {
  return <T extends object>(target: T, memberName: keyof T) => {
    const ctor = target.constructor as Constructor<T>;

    const propDef = setPropertyDefinition(
      memberName as string,
      propertyDefinition
    );

    const metadata = getPropertiesMetadata(ctor);
    metadata[memberName] = propDef;

    Reflect.defineMetadata('meta:property', metadata, ctor);
  };
};

const setPropertyDefinition = (
  memberName: string,
  propertyDefinition?: PropertyDefinition
): Required<PropertyDefinition> => {
  const propDef: Required<PropertyDefinition> = {
    id: propertyDefinition?.id ?? false,
    name: propertyDefinition?.name ?? memberName,
    fieldName: memberName,
    nullable: propertyDefinition?.nullable ?? true,
    required: propertyDefinition?.required ?? true,
    type: propertyDefinition?.type ?? 'any',
    format: propertyDefinition?.format ?? '',
  };

  return propDef;
};
