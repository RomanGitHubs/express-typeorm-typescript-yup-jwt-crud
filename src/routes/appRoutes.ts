import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import bookRoutes from './bookRoutes';
import genreRoutes from './genreRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/books', bookRoutes);
router.use('/genres', genreRoutes);

export default router;
