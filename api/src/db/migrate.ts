import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';
import { DATABASE_URL } from '.';

const sql = neon(DATABASE_URL);

const db = drizzle(sql);

const mainAsync = async () => {
  try {
    await migrate(db, {
      migrationsFolder: 'src/db/migrations'
    });

    console.log('Migration successful');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

mainAsync();
