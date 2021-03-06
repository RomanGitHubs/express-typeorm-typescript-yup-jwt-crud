import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Book } from './entities/Book';
import config from '../config';
import Genre from './entities/Genre';

export const AppDataSource = new DataSource({
  type: config.db.type,
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: false,
  logging: false,
  entities: [User, Book, Genre],
  migrations: [],
  subscribers: [],
});

export const connect = () => {
  const connection = AppDataSource.initialize();
  console.error('Data Source has been initialized!');

  return connection;
};
