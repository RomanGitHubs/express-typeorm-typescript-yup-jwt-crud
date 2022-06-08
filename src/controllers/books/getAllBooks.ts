import { Handler } from 'express';
import generateError from '../../utils/generateError';
import { bookBase } from '../../db';
import { genreBase } from '../../db';

const getAllBooks: Handler = async (req, res, next) => {
  try {
    let books = await bookBase.find();
    console.log(req.query);
    
    // if (req.query) {
    //   const books = await bookBase
    //   .createQueryBuilder("book")
    //   .where("book.id = :id", req.query)
    //   .getOne()
    //   console.log('2',books);
    //   return res.status(200).json(books);
    // }

    
    console.log('1', books.length );

    if (books.length == 0) {
      throw generateError('Empty store', 404);
    }
    console.log('2',books);
    console.log('2',req.query);

    res.status(200).json(books);
  } catch (e) {
    if (!e.text) {
      e.text = 'Error  getAllBooks service';
    }
    next(e);
  }
};

export default getAllBooks;
