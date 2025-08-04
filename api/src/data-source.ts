import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: 'postgresql://foodikal-user:npg_lHrE0jeDqWy2@ep-cold-sun-a2vn1ryx-pooler.eu-central-1.aws.neon.tech/foodikal-db?sslmode=require&channel_binding=require',
  synchronize: true,
  logging: true,
  ssl: true,
  entities: [
    process.env.NODE_ENV === 'production'
      ? './build/src/entity/*.js'
      : './src/entity/*.ts'
  ],
  migrations: [
    process.env.NODE_ENV === 'production'
      ? './build/src/migrations/*.js'
      : './src/migrations/*.ts'
  ],
  // entities: ['build/src/entity/*.js'],
  // migrations: ['build/src/migration/*.js'],
  // cli: {
  //   migrationsDir: 'migration'
  // },
  subscribers: []
});
