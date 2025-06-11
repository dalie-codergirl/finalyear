import { Dialect } from 'sequelize';

export const databaseConfig = {
  development: {
    username: 'postgres',
    password: 'dali1605',
    database: 'sprodeta',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres' as Dialect,
    logging: false,
  },
  test: {
    username: 'postgres',
    password: 'dali1605',
    database: 'sprodeta_test',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres' as Dialect,
    logging: false,
  },
  production: {
    username: 'postgres',
    password: 'dali1605',
    database: 'sprodeta',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres' as Dialect,
    logging: false,
  },
}; 