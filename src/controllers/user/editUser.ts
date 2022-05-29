import { Handler, Request } from 'express';
import CryptoJS from 'crypto-js';
import { userBase } from '../../db';
import config from '../../config';

type ExtendedRequest = Request<unknown, unknown, {
  role: string;
  firstName: string;
  lastName:string;
  email: string;
  password: string;
  dob:string;
}>

const editUser: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    const {
      role,
      firstName,
      lastName,
      email,
      password,
      dob,
    } = req.body;

    const hashedPassword = await CryptoJS.AES.encrypt(password, config.tokenSecretKey).toString();

    await userBase.update(req.user.id, {
      role,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dob,
    });

    const getRefreshedUser = await userBase.findOne({ where: { id: req.user.id } });

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
