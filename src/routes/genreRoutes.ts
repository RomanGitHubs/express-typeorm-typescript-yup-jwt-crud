import { Router } from 'express';

import uploadGenre from '../controllers/genres/uploadGenre';
import getAllGenres from '../controllers/genres/getAllGenres';

const genreRoutes = Router();

genreRoutes.get('/', getAllGenres);
genreRoutes.post('/', uploadGenre);

export default genreRoutes;
