import { Handler, Request } from 'express';
import { userBase } from '../../db';
import * as fs from 'node:fs';
import { v4 as uuidv4 } from 'uuid';
import generateError from '../../utils/generateError';



type ExtendedRequest = Request<unknown, unknown, {
  file?: string;
}>

const uploadPhoto: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    const {
      file,
    } = req.body;

    if (typeof (file) !== 'string') {
      throw generateError('Ti pihaech kakuyto dich', 400);
    }

    console.log('TypeOF >> ', typeof (file));

    const payload = file.split(',')[1];

    const extension = file.split(';')[0].split('/')[1];
    const fileName = uuidv4();

    const fullName = `${fileName}.${extension}`


    await fs.promises.writeFile(`src/public/${fullName}`, payload, 'base64');

    await userBase.update(req.user.id, {
      photo: fullName,
    });
    console.log(fullName);

    const refreshedUser = await userBase.findOne({ where: { id: req.user.id } });
    delete refreshedUser.password;
    delete refreshedUser.createdAt;
    delete refreshedUser.updatedAt;

    console.log(refreshedUser);

    res.status(200).json({ user: refreshedUser });
  } catch (e) {
    if (!e.text) {
      e.text = 'Error  uploadPhoto service';
    }
    next(e);
  }
};

export default uploadPhoto;
