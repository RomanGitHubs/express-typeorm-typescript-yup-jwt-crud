import { Handler } from 'express';
import { bookBase } from '../../db';

const getAllBooks: Handler = async (req, res, next) => {
  try {
    const users = await bookBase.find();

    res.status(200).json(users);
  } catch (e) {
    if (!e.text) {
      e.text = 'Error  getAllBooks service';
    }
    next(e);
  }
};

export default getAllBooks;
