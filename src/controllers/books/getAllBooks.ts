import { Handler } from 'express';
import generateError from '../../utils/generateError';
import { bookBase } from '../../db';
import { genreBase } from '../../db';
import { In } from 'typeorm';

const getAllBooks: Handler = async (req, res, next) => {
  try {
    console.log('Query >>> ', req.query);
    const splitQueryGenres = []

    if (req.query.genre) {
      const genresFilter = req.query.genre
      for (let i = 0; i < genresFilter.length; i++, i++) {
        splitQueryGenres.push(genresFilter[i])
      }
    }
    console.log(splitQueryGenres);
    
    const findForQuery = {
      select: {

      },
      relations: {
        genres: true,
      },
      where: {
        genres: {
          id: In(splitQueryGenres),
        }
      }
    };

    const books = await bookBase.find(req.query.genre ? findForQuery : null);
  
    res.status(200).json(books);
  } catch (e) {
    if (!e.text) {
      e.text = 'Error  getAllBooks service';
    }
    next(e);
  }
};

export default getAllBooks;
