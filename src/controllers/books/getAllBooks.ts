import { Handler } from 'express';
import generateError from '../../utils/generateError';
import { bookBase } from '../../db';

const getAllBooks: Handler = async (req, res, next) => {
  try {
    const books = await bookBase.find();

    console.log('1', books.length );

    if (books.length == 0) {
      throw generateError('Empty store', 404);
    }
    console.log('2',books);


    res.status(200).json(books);
  } catch (e) {
    if (!e.text) {
      e.text = 'Error  getAllBooks service';
    }
    next(e);
  }
};

export default getAllBooks;
