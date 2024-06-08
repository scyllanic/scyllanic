/* eslint-disable @typescript-eslint/no-explicit-any */
import { CassandraClientConfig, Constructor } from './types';
import { Repository } from './repository/repository';
import { Client as CassandraClient } from 'cassandra-driver';
import logger from './logger';

import { v4 } from 'uuid';

export class ScyllanicConnection {
  private _id: string;

  private _cassandraClient: CassandraClient;
  private _models: Record<string, Constructor<any>> = {};
  private _repositories: Record<string, Repository<any>> = {};

  constructor(private readonly _config: CassandraClientConfig) {
    this._id = v4();
    this._cassandraClient = new CassandraClient(_config);
  }

  public get config(): CassandraClientConfig {
    return this._config;
  }

  public get id(): string {
    return this._id;
  }

  public get cassandraClient(): CassandraClient {
    return this._cassandraClient;
  }

  getRepository<T>(ctor: Constructor<T>): Repository<T> {
    const modelName = ctor.name;

    if (!this._models[modelName]) {
      this._models[modelName] = ctor;

      const repository = new Repository<T>(ctor, this);
      this._repositories[modelName] = repository;
    }

    return this._repositories[modelName];
  }

  async connect(): Promise<void> {
    await this._cassandraClient.connect();
    logger.debug('cassandraClient connected..');
  }

  async disconnect(): Promise<void> {
    await this._cassandraClient.shutdown();
    logger.debug('cassandraClient disconnected..');
  }
}
