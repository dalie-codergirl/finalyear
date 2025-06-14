import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

type Environment = 'development' | 'test' | 'production';

type DbConfig = {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: string;
  logging: any;
  pool?: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
};

dotenv.config();

const {
  DB_HOST = 'localhost',
  DB_PORT = '5432',
  DB_NAME = 'sprodeta',
  DB_USER = 'postgres',
  DB_PASSWORD = 'root',
  NODE_ENV = 'development',
} = process.env;

const config: Record<Environment, DbConfig> = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: parseInt(DB_PORT, 10),
    dialect: 'postgres',
    logging: console.log,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}_test`,
    host: DB_HOST,
    port: parseInt(DB_PORT, 10),
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: parseInt(DB_PORT, 10),
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};

export default config[NODE_ENV as Environment] || config.development;

// Create Sequelize instance
export const sequelize = new Sequelize(
  config[NODE_ENV as Environment]?.database || config.development.database,
  config[NODE_ENV as Environment]?.username || config.development.username,
  config[NODE_ENV as Environment]?.password || config.development.password,
  {
    host: config[NODE_ENV as Environment]?.host || config.development.host,
    port: config[NODE_ENV as Environment]?.port || config.development.port,
    dialect: 'postgres',
    logging: config[NODE_ENV as Environment]?.logging || config.development.logging,
    pool: config[NODE_ENV as Environment]?.pool || config.development.pool,
  }
); 