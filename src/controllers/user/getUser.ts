import { Handler } from "express";
import generateError from "../../utils/generateError";
import { userBase } from "../../db";

const getUser: Handler = async (req, res, next) => {
  try {
    const user = await userBase.findOne({ where: { id: req.body.id }});

    delete user.password;

    res.status(200).json(user);
  } catch (e) {
    console.log("Error getUser service");
    next(e);
  }
}

export default getUser;
