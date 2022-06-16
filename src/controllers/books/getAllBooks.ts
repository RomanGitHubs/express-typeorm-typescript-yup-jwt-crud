import { Handler } from 'express';
import generateError from '../../utils/generateError';
import { bookBase } from '../../db';
import { genreBase } from '../../db';
import { Between, In } from 'typeorm';

const getAllBooks: Handler = async (req, res, next) => {
  try {
    console.log('Query >>> ', req.query);
    const genres = await genreBase.find();
    console.log( genres);

    let splitQueryGenres = genres.map((item => item.id))
    console.log(splitQueryGenres);
    
    let minPrice = 0;
    let maxPrice = 10000;
    let sort = '';
    let queryForFind = {};

    console.log('Genre  >>> ', typeof(req.query.genre));
    console.log('Price >>> ', typeof(req.query.price));
    console.log('Sort >>> ', typeof(req.query.sort));
    

    if (req.query.genre) {
      const genresFilter = `${req.query.genre}`.split(',')
      splitQueryGenres = []
      for (let i = 0; i < genresFilter.length; i++) {
        splitQueryGenres.push(+genresFilter[i])
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
   
    if (req.query.sort) {
      sort = `${req.query.sort}`;
    }
    console.log(sort);
    

    const books = await bookBase.find({
      select: {
      },
      relations: {
        genres: true,
      },
      where: {
        genres: {
          id: In(splitQueryGenres),
        },
        price: Between(+minPrice.toFixed(2), +maxPrice.toFixed(2)),
      },
      order: {
        [sort]: "ASC",
      }
    });
  
    
    res.status(200).json(books);
  } catch (e) {
    if (!e.text) {
      e.text = 'Error  getAllBooks service';
    }
    next(e);
  }
};

export default getAllBooks;
