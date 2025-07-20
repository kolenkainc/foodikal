import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { defineCollection, defineHub } from 'kolenkainc-honohub';
import * as schema from './src/db/schema';
import { DATABASE_URL } from './src/db';

const neonSql = neon(DATABASE_URL);
const db = drizzle(neonSql, { schema });

export default defineHub({
  db,
  collections: [
    defineCollection({
      slug: 'todos',
      schema: schema.todos
    })
  ]
});
