import { Router } from 'express';
import getAllBooks from '../controllers/books/getAllBooks';
import uploadBook from '../controllers/books/uploadBooks';
import uploadGenre from '../controllers/genres/uploadGenre';

const bookRoutes = Router();

bookRoutes.get('/', getAllBooks);
bookRoutes.post('/upload', uploadBook);


export default bookRoutes;
