import { Router } from 'express';
import getAllBooks from '../controllers/auth/registerUser';

const bookRoutes = Router();

bookRoutes.get('/', getAllBooks);

export default bookRoutes;
