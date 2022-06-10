import { Handler } from 'express';
import generateError from '../../utils/generateError';
import { bookBase } from '../../db';
import { genreBase } from '../../db';
import { Between, In, LessThan, MoreThan } from 'typeorm';

const getAllBooks: Handler = async (req, res, next) => {
  try {
    console.log('Query >>> ', req.query);
    const splitQueryGenres = []
    let minPrice = 0;
    let maxPrice = 10000;
    let queryForFind = {};

    console.log('Genre  >>> ', typeof(req.query.genre));
    console.log('Price >>> ', typeof(req.query.price));
    

    if (req.query.genre) {
      const genresFilter = `${req.query.genre}`.split(',')
      for (let i = 0; i < genresFilter.length; i++) {
        splitQueryGenres.push(genresFilter[i])
      }
    }
    console.log('Genres >>> ', splitQueryGenres);

    if (req.query.price) {
      const prices = `${req.query.price}`.split(',')
      minPrice = +prices[0] / 100;
      maxPrice = +prices[1] / 100;
    }
   console.log('Min >>> ', minPrice);
   console.log('Max >>> ', maxPrice);
   


    if (req.query.genre) {
      queryForFind = {
        select: {
        },
        relations: {
          genres: true,
        },
        where: {
          genres: {
            id: In(splitQueryGenres),
          },
        }
      };
    }
   
    if (req.query.price) {
      queryForFind = {
        select: {
        },
        relations: {
        },
        where: {
          price: Between(minPrice, maxPrice),
        }
      };
    }

    if (req.query.genre && req.query.price) {
      queryForFind = {
        select: {
        },
        relations: {
          genres: true,
        },
        where: {
          genres: {
            id: In(splitQueryGenres),
          },
          price: Between(minPrice, maxPrice),
        }
      };
    }
    const books = await bookBase.find(req.query !== {} ? queryForFind : null);
  
    res.status(200).json(books);
  } catch (e) {
    if (!e.text) {
      e.text = 'Error  getAllBooks service';
    }
    next(e);
  }
};

export default getAllBooks;
