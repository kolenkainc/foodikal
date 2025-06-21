import { drizzle } from 'drizzle-orm/postgres-js';

export class ApplicationStorage {
  private db;

  constructor(connectionString: string) {
    // You can specify any property from the postgres-js connection options
    this.db = drizzle({
      connection: {
        url: connectionString,
        ssl: true
      }
    });
  }
}
