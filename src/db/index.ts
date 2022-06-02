import User from './entities/User';
import Book from './entities/Book';
import { AppDataSource } from './data-source';

export const userBase = AppDataSource.getRepository(User);
export const bookBase = AppDataSource.getRepository(Book);
