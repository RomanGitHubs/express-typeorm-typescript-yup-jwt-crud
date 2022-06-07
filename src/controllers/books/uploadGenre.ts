import { Handler, Request } from 'express';
import CryptoJS from 'crypto-js';
import generateError from '../../utils/generateError';
import { signToken } from '../../utils/token';
import { genreBase } from '../../db';
import config from '../../config';

type ExtendedRequest = Request<unknown, unknown, {
  genre?: string;
}>

const uploadGenre: Handler = async (req: ExtendedRequest, res, next) => {
  console.log(req.body);
  
  const {
    genre
  } = req.body;

  try {
    const existingGenre = await genreBase.findOne({ where: { genre } });

    if (existingGenre) {
      throw generateError('This genre already exist', 409);
    }

    const newGenre = await genreBase.save({
      genre
    });

    res.status(200).json({ newGenre });
  } catch (e) {
    if (!e.text) {
      e.text = 'Error  uploadGenre service';
    }
    next(e);
  }
};

export default uploadGenre;
