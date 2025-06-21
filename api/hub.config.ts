// import { neon } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-http';
// import { defineCollection, defineHub } from 'honohub';
// import * as schema from './src/db/schema';

// export const getHub = (connectionString: string) =>
//   defineHub({
//     db: drizzle(neon(connectionString), { schema }),
//     collections: [
//       defineCollection({
//         slug: 'todos',
//         schema: schema.todos
//       })
//     ]
//   });
