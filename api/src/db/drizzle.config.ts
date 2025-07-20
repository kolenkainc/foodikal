// drizzle.config.ts
import { defineConfig } from 'drizzle-kit';
import { DATABASE_URL } from '.';
export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  dbCredentials: {
    url: DATABASE_URL
  }
});
