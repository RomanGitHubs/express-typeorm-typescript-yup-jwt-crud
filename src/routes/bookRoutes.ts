import { Router } from 'express';
import getAllBooks from '../controllers/books/getAllBooks';
import uploadBook from '../controllers/books/uploadBooks';
import getBook from '../controllers/books/getBook';

const bookRoutes = Router();

bookRoutes.get('/', getAllBooks);
bookRoutes.get('/:id', getBook);
bookRoutes.post('/upload', uploadBook);


export default bookRoutes;
