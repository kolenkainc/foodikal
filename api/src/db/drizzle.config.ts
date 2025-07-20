import { DATABASE_URL } from '.';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: 'src/db/schema.ts',
  dbCredentials: {
    url: DATABASE_URL
  },
  migrations: {
    schema: 'public' // used in PostgreSQL only, `drizzle` by default
  }
});
