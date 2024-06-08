/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import { ModelDefinition } from '../interfaces/model.interface';

export const Model = (modelDefinition?: ModelDefinition) => {
  return (target: any) => {
    const modelDef: Required<ModelDefinition> = {
      name: modelDefinition?.name ?? target.name.toLowerCase(),
    };

    Reflect.defineMetadata('meta:model', modelDef, target);

    return target;
  };
};
