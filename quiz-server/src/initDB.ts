import { Sequelize } from 'sequelize-typescript';
import { models } from './models';
import dotenv from 'dotenv';

dotenv.config();

export const initDB = (): Sequelize => {
  const DB_PASSWORD = process.env.DB_PASSWORD ?? '';
  const DB_USERNAME = process.env.DB_USERNAME ?? '';
  const DB_NAME = process.env.DB_NAME ?? '';
  const DB_HOST = process.env.DB_HOST ?? '';

  const DB_URI: string = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

  return new Sequelize(DB_URI, {
    models,
    logging: false,
    dialectOptions: {
      ssl: true,
    },
  });
};
