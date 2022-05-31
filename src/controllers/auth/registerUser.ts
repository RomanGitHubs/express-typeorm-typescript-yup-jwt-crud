import { Handler, Request } from 'express';
import CryptoJS from 'crypto-js';
import generateError from '../../utils/generateError';
import { signToken } from '../../utils/token';
import { userBase } from '../../db';
import config from '../../config';

type ExtendedRequest = Request<unknown, unknown, {
  email: string;
  password: string;
}>

const registerUser: Handler = async (req: ExtendedRequest, res, next) => {
  console.log(req.body);
  
  const {
    email,
    password,
  } = req.body;

  try {
    const existingUser = await userBase.findOne({ where: { email } });

    if (existingUser) {
      throw generateError('This user already exist', 409);
    }

    const hashedPassword = await CryptoJS.AES.encrypt(password, config.tokenSecretKey).toString();

    const newUser = await userBase.save({

      email,
      password: hashedPassword,

    });

    const user = {email: newUser.email, id: newUser.id };

    const accessToken = await signToken({ id: newUser.id });

    res.status(200).json({ user, accessToken });
  } catch (e) {
    if (!e.text) {
      e.text = 'Error  registerUser service';
    }
    next(e);
  }
};

export default registerUser;
