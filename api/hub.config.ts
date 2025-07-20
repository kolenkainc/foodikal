import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { defineCollection, defineHub } from 'kolenkainc-honohub';
import * as schema from './src/db/schema';
import * as dotenv from 'dotenv';

dotenv.config();
const neonSql = neon(String(process.env.DATABASE_URL));
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
