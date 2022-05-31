import { Handler, Request } from 'express';
import { userBase } from '../../db';

type ExtendedRequest = Request<unknown, unknown, {
  photo?: string;
}>

const uploadPhoto: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    const {
      photo,
    } = req.body;

    await userBase.update(req.user.id, {
      photo: photo,
    });

    const getRefreshedUser = await userBase.findOne({ where: { id: req.user.id } });

    delete getRefreshedUser.password;

    res.status(200).json(getRefreshedUser.photo);
  } catch (e) {
    if (!e.text) {
      e.text = 'Error  uploadPhoto service';
    }
    next(e);
  }
};

export default uploadPhoto;
