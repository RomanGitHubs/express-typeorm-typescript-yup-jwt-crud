import { Handler, Request } from 'express';
import CryptoJS from 'crypto-js';
import { userBase } from '../../db';
import config from '../../config';
import generateError from '../../utils/generateError';

type ExtendedRequest = Request<unknown, unknown, {
  role?: string;
  name?: string;
  email?: string;
  password?: string;
  newPassword?: string;
}>

const editUser: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    const {
      role,
      name,
      email,
      password,
      newPassword
    } = req.body;

    const getRefreshedUser = await userBase.findOne({ where: { id: req.user.id } });
    let hashedPassword = getRefreshedUser.password

    if (password){
      const isPasswordCorrect = await CryptoJS.AES.decrypt(getRefreshedUser.password
        .toString(), config.tokenSecretKey).toString(CryptoJS.enc.Utf8);
      console.log('asd', isPasswordCorrect);
    
    if (isPasswordCorrect !== password) {
      throw generateError('Wrong password', 403);
    }

      hashedPassword = await CryptoJS.AES.encrypt(newPassword, config.tokenSecretKey).toString();
    
    }
    await userBase.update(req.user.id, {
      role,
      name,
      email,
      password: hashedPassword,
    });


    delete getRefreshedUser.password;

    res.status(200).json(getRefreshedUser);
  } catch (e) {
    if (!e.text) {
      e.text = 'Error  editUser service';
    }
    next(e);
  }
};

export default editUser;
