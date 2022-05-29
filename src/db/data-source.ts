import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/User';
import config from '../config';

export const AppDataSource = new DataSource({
  type: config.db.type,
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: false,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});

export const connect = () => {
  const connection = AppDataSource.initialize();
  console.error('Data Source has been initialized!');

  return connection;
};
