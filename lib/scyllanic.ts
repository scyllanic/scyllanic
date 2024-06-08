import { ScyllanicConnection } from './scyllanic-connection';
import { CassandraClientConfig } from './types';

export class Scyllanic {
  private static _scyllanicConnections: Map<string, ScyllanicConnection> =
    new Map();

  private constructor() {}

  static async connect(
    config: CassandraClientConfig
  ): Promise<ScyllanicConnection> {
    const scyllanicConnection = new ScyllanicConnection(config);
    await scyllanicConnection.connect();

    this._scyllanicConnections.set(scyllanicConnection.id, scyllanicConnection);

    return scyllanicConnection;
  }

  static async disconnect(): Promise<void> {
    for await (const [, connection] of this._scyllanicConnections.entries()) {
      await connection.disconnect();
    }
  }

  static getConnection(id?: string): ScyllanicConnection {
    if (id) {
      const connection = this._scyllanicConnections.get(id);

      if (!connection) {
        throw new Error(`ScyllanicConnection not found with given id: ${id}`);
      }

      return connection;
    } else {
      const allConnections = Array.from(this._scyllanicConnections.values());

      if (!allConnections.length) {
        throw new Error(`ScyllanicConnection not found`);
      }

      return allConnections[0];
    }
  }
}
