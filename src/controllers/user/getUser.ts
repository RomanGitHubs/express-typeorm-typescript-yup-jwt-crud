import { Handler, Request } from 'express';
import { userBase } from '../../db';

type ExtendedRequest = Request<unknown, unknown, {id: number}>

const getUser: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    const user = await userBase.findOne({ where: { id: req.user.id } });

    delete user.password;

    res.status(200).json(user);
  } catch (e) {
    if (!e.text) {
      e.text = 'Error  getUser service';
    }
    next(e);
  }
};

export default getUser;
