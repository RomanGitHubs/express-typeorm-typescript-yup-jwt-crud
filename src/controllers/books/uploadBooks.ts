import { Handler, Request } from 'express';
import CryptoJS from 'crypto-js';
import generateError from '../../utils/generateError';
import { signToken } from '../../utils/token';
import { bookBase } from '../../db';
import { genreBase } from '../../db';
import config from '../../config';

type ExtendedRequest = Request<unknown, unknown, {
  photo?: string;
  author?: string;
  title?: string;
  description?: string;
  cover?: boolean;
  rating?: number;
  price?: number;
  available?: boolean;
  isFavorite?: boolean;
  news?: boolean;
  bestsaller?: boolean;
  date?: Date;
  // genres?: number[];
}>

const uploadBook: Handler = async (req: ExtendedRequest, res, next) => {
  console.log(req.body);
  
  const {
    photo,
    author,
    title,
    description,
    cover,
    rating,
    price,
    available,
    isFavorite,
    news,
    bestsaller,
    date
    // genres,
  } = req.body;

  try {
    const existingBook = await bookBase.findOne({ where: { title } });
    
    if (existingBook) {
      throw generateError('This book already exist', 409);
    }
    // for (let i = 0; i < genres.length; i++) {

    // }
    // const existingGenre = await genreBase.findOne({ where: { id: genres } });

    const newBook = await bookBase.save({
      photo,
      author,
      title,
      description,
      cover,
      rating,
      price: price / 100,
      available,
      isFavorite,
      news,
      bestsaller,
      date
      // genres: genres
    });

    res.status(200).json({ newBook });
  } catch (e) {
    if (!e.text) {
      e.text = 'Error  uploadBook service';
    }
    next(e);
  }
};

export default uploadBook;
