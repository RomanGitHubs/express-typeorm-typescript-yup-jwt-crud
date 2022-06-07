import User from './entities/User';
import Book from './entities/Book';
import Genre from './entities/Genre';
import { AppDataSource } from './data-source';

export const userBase = AppDataSource.getRepository(User);
export const bookBase = AppDataSource.getRepository(Book);
export const genreBase = AppDataSource.getRepository(Genre);
