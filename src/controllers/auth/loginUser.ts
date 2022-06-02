import { Handler, Request } from 'express';
import CryptoJS from 'crypto-js';
import generateError from '../../utils/generateError';
import { signToken } from '../../utils/token';
import { userBase } from '../../db';
import config from '../../config';

type ExtendedRequest = Request<unknown, unknown, { email: string; password: string }>

const loginUser: Handler = async (req: ExtendedRequest, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const user = await userBase.findOne({ where: { email } });

    if (!user) {
      throw generateError('User not exist', 404);
    }
    console.log(password);

    console.log(user.password);
    
    const isPasswordCorrect = await CryptoJS.AES
      .decrypt(user.password.toString(), config.tokenSecretKey).toString(CryptoJS.enc.Utf8);
    console.log('asd', isPasswordCorrect);
    

    if (isPasswordCorrect !== password) {
      throw generateError('Wrong password', 403);
    }

    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;

    const accessToken = await signToken({ id: user.id });

    res.status(200).json({ user, accessToken });
  } catch (e) {
    if (!e.text) {
      e.text = 'Error loginUser service';
    }
    next(e);
  }
};

export default loginUser;
