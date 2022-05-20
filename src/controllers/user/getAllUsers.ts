import { Handler } from "express";
import { userBase } from "../../db";
import generateError from "../../utils/generateError";

const getAllUser: Handler = async (req, res, next) => {

  try {
    const query = req.query;
    const byId = req.query.id;
    const byFirstName = req.query.firstName;

    console.log(query);

    if (!query) {
      const users = await userBase.find();
      res.status(200).json(users);
    }

    if (byId || byFirstName) {

      const user = await userBase
        .createQueryBuilder("user")
        .where("user.id = :id OR user.firstName = :firstName", {id: byId, firstName: byFirstName})
        .getOneOrFail();

      delete user.password;

      res.status(200).json(user);
    }

    res.status(200).json(await userBase.find());

  } catch (e) {
    console.log("Error  getAllUser service");
    next(e);
  }
}

export default getAllUser;
