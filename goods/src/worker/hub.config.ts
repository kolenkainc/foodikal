import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { defineCollection, defineHub } from "kolenkainc-honohub";
import * as schema from "./db/schema";

const neonSql = neon(
  "postgresql://neondb_owner:npg_nJt1yxWFuBa2@ep-lucky-cloud-a2tzbej5-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
);
const db = drizzle(neonSql, { schema });

export default defineHub({
  db,
  collections: [
    defineCollection({
      slug: "todos",
      schema: schema.todos,
    }),
  ],
});
