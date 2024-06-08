import { FindFilter } from '../filters/filters';
import { getModelDefinition, getPropsDefinition } from '../metadata';
import { ScyllanicConnection } from '../scyllanic-connection';
import { CassandraClient, Constructor } from '../types';
import { IOptions } from './repository.interface';
import { PropertyDefinition } from './../interfaces/property.interface';

export class Repository<T> {
  private _cassandraClient: CassandraClient;

  constructor(
    private _ctor: Constructor<T>,
    private _scyllanicConnection: ScyllanicConnection
  ) {
    this._cassandraClient = _scyllanicConnection.cassandraClient;
  }

  async find(filter: FindFilter<T>, options?: IOptions): Promise<Array<T>> {
    const keyspaceName = this._scyllanicConnection.config.keyspace ?? '';
    const modelMeta = getModelDefinition(this._ctor);
    console.log(options);

    let query = `SELECT * FROM ${keyspaceName}.${modelMeta.name}`;
    const params = [];

    if (Object.keys(filter.where).length) {
      query += ' where ';

      for (const key in filter.where) {
        query += `${key} = ?`;
        params.push(filter.where[key]);
      }
    }

    query += ';';

    console.log(query);
    const result = await this._cassandraClient.execute(query, params, {});
    console.log(result.rows);

    const propsMeta = getPropsDefinition(this._ctor);

    return result.rows.map((row) => {
      const object = new this._ctor();

      for (const key in row) {
        console.log('rowkeye: ', key);
        console.log('type: ', typeof row[key]);

        const propDefinitions = Object.values(
          propsMeta
        ) as PropertyDefinition[];

        const foundPropDefinition = propDefinitions.find(
          (propDefinition: PropertyDefinition) => propDefinition.name === key
        );

        if (foundPropDefinition) {
          const field = foundPropDefinition.fieldName as keyof T;

          if (foundPropDefinition.type === 'string') {
            object[field] = row[key].toString();
          } else {
            object[field] = row[key];
          }
        }
      }

      return object;
    });
  }

  // findById(
  //   id: string,
  //   findByIdOptions: FindByIdFilter<T>,
  //   options: IOptions
  // ): T {}
}
