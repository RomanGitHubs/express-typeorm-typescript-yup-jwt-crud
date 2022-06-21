import { Handler } from 'express';
import { bookBase } from '../../db';
import { genreBase } from '../../db';
import { Between, In } from 'typeorm';
import { number } from 'yup/lib/locale';

const getAllBooks: Handler = async (req, res, next) => {
  try {
    console.log('Query >>> ', req.query);
    const genres = await genreBase.find();
    let splitQueryGenres = genres.map((item => item.id))    
    if (req.query.genre) {
      const genresFilter = `${req.query.genre}`.split(',')
      splitQueryGenres = []
      for (let i = 0; i < genresFilter.length; i++) {
        splitQueryGenres.push(+genresFilter[i])
      }
    }
    console.log('Genres >>> ', splitQueryGenres);

    let minPrice = +req.query.minPrice;
    let maxPrice = +req.query.maxPrice;
    let sort = '' || `${req.query.sort}`;
    let order = '' || req.query.order;

    console.log('Genre  >>> ', splitQueryGenres, 'isArray? -', Array.isArray(splitQueryGenres));
    console.log('minPrice >>> ', typeof(minPrice), minPrice);
    console.log('maxPrice >>> ', typeof(maxPrice), maxPrice);
    console.log('Sort >>> ', typeof(req.query.sort), sort);
    console.log('Order >>> ', typeof(req.query.order), order);


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
        price: Between(+minPrice, +maxPrice),
      },
      order: {
        [sort]: order,
      }
    });
  
    let minPriceBook = 1000;
    let maxPriceBook = 0;
    const booksP = await bookBase.find()

    for ( let i = 0; i < booksP.length; i++ ) {
      let price = booksP[i].price;
      console.log(price);
      
      if (price <= minPriceBook) {
        minPriceBook = +price;
        
      }
      if (price >= maxPriceBook) {
        maxPriceBook = +price;
      }

    }
    console.log(books, minPriceBook, maxPriceBook);
    
    res.status(200).json({books, minPriceBook, maxPriceBook});
  } catch (e) {
    if (!e.text) {
      e.text = 'Error  getAllBooks service';
    }
    next(e);
  }
};

export default getAllBooks;
