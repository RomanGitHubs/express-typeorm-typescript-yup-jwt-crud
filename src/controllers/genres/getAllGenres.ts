import { Handler } from 'express';
import generateError from '../../utils/generateError';
import { genreBase } from '../../db';

const getAllGenres: Handler = async (req, res, next) => {
  try {
    const genres = await genreBase.find();

    console.log('1', genres.length );

    if (genres.length == 0) {
      throw generateError('Empty genres', 404);
    }
    console.log('2',genres);


    res.status(200).json(genres);
  } catch (e) {
    if (!e.text) {
      e.text = 'Error  getAllGenres service';
    }
    next(e);
  }
};

export default getAllGenres;
