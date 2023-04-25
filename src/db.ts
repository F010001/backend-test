import { Sequelize } from 'sequelize';

export const connection = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'root',
  database: 'test',
  logging: false,
});
