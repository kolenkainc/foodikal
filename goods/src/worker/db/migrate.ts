import * as dotenv from 'dotenv';
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";

dotenv.config();
console.log(`process.env.DATABASE_URL: ${process.env.DATABASE_URL}`);
const sql = neon(process.env.DATABASE_URL ?? "");

const db = drizzle(sql);

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: "src/worker/db/migrations",
    });

    console.log("Migration successful");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
