import { Handler, Request } from 'express';
import { userBase } from '../../db';
import * as fs from 'node:fs';
import { v4 as uuidv4 } from 'uuid';



type ExtendedRequest = Request<unknown, unknown, {
  file?: string;
}>

const uploadPhoto: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    const {
      file,
    } = req.body;

    console.log(file);
    console.log(typeof(file));

    const extention = file.split('+')[0].split('/')[1];

    const cut = file.split(',')[1];

    fs.writeFile(`tresh.${extention}`, cut, 'base64', (e)=>{console.log(e)});

    // })
    // const decoded = atob.
    // console.log(1);
    // readableStream.pipe(writeableStream);

    // console.log(writeableStream);
    
    // console.log(2);

    // writeableStream.on("finish", () => {
    //   writeableStream.close();
    //   console.log("Download Completed");
    // });

    // console.log(22);

    // await userBase.update(req.user.id, {
    //   photo: path,
    // });
    // console.log(3);

    // const getRefreshedUser = await userBase.findOne({ where: { id: req.user.id } });
    // console.log(4);

    // delete getRefreshedUser.password;
    // console.log(5);

    // res.status(200).json(getRefreshedUser.photo);
  } catch (e) {
    if (!e.text) {
      e.text = 'Error  uploadPhoto service';
    }
    next(e);
  }
};

export default uploadPhoto;
