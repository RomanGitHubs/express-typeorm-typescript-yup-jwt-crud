import { Router } from 'express';
import getAllBooks from '../controllers/books/getAllBooks';
import uploadBook from '../controllers/books/uploadBooks';
import uploadGenre from '../controllers/books/uploadGenre';

const bookRoutes = Router();

bookRoutes.get('/', getAllBooks);
bookRoutes.post('/upload', uploadBook);
bookRoutes.post('/genre', uploadGenre);

export default bookRoutes;
