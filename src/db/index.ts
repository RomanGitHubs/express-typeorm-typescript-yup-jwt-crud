import User from "./entity/User";
import { AppDataSource } from "./data-source";

export const userBase = AppDataSource.getRepository(User);
