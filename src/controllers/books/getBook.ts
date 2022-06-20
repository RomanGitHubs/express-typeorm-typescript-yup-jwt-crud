import { Handler } from 'express';
import { bookBase } from '../../db';


const getBook: Handler = async (req, res, next) => {
  try {
    const id = req.params
    const books = await bookBase.find();
  
    
    res.status(200).json(books);
  } catch (e) {
    if (!e.text) {
      e.text = 'Error  getBook service';
    }
    next(e);
  }
};

export default getBook;
