// need delete



import { Handler } from 'express';
import { userBase } from '../../db';

const getAllUser: Handler = async (req, res, next) => {
  try {
    const query = req.query;
    const { id, firstName } = req.query;

    if (!query) {
      const users = await userBase.find();
      res.status(200).json(users);
    }

    if (id || firstName) {
      const user = await userBase
        .createQueryBuilder('user')
        .where('user.id = :id OR user.firstName = :firstName', { id, firstName })
        .getOneOrFail();

      delete user.password;

      res.status(200).json(user);
    }

    res.status(200).json(await userBase.find());
  } catch (e) {
    if (!e.text) {
      e.text = 'Error  getAllUser service';
    }
    next(e);
  }
};

export default getAllUser;
