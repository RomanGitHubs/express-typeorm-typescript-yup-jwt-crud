import User from './entities/User';
import { AppDataSource } from './data-source';

export const userBase = AppDataSource.getRepository(User);
