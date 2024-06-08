import { DseClientOptions } from 'cassandra-driver';
import { Client } from 'cassandra-driver';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Constructor<T> = new (...args: any[]) => T;

export type CassandraClient = Client;

export type CassandraClientConfig = DseClientOptions;
