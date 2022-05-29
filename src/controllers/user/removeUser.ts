import { Handler, Request } from 'express';
import generateError from '../../utils/generateError';
import { userBase } from '../../db';

type ExtendedRequest = Request<unknown, unknown, {
  email: string;
}>

const removeUser: Handler = async (req: ExtendedRequest, res, next) => {
  const { email } = req.body;

  try {
    const user = await userBase.delete({ email });

    if (!user.affected) {
      throw generateError('User not found', 404);
    }

    res.status(200).json({ message: `User: ${email} has been removed` });
  } catch (e) {
    if (!e.text) {
      e.text = 'Error  removeUser service';
    }
    next(e);
  }
};

export default removeUser;
