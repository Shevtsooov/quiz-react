// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

dotenv.config();

const DB_PASSWORD = process.env.DB_PASSWORD ?? '';
const DB_USERNAME = process.env.DB_USERNAME ?? '';
const DB_NAME = process.env.DB_NAME ?? '';
const DB_HOST = process.env.DB_HOST ?? '';
const DB_PORT = process.env.DB_PORT ?? '';

const dbCredentials = {
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  port: DB_PORT,
};

const dialectConfig = {
  seederStorage: 'sequelize',
  dialect: 'postgres',
  dialectOptions: {
    ssl: true,
  },
};
module.exports = {
  development: {
    ...dbCredentials,
    ...dialectConfig,
  },
  test: {
    ...dbCredentials,
    ...dialectConfig,
  },
  production: {
    ...dbCredentials,
    ...dialectConfig,
  },
};
