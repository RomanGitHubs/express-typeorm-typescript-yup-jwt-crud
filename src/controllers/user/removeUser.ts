import { Handler } from "express";
import generateError from "../../utils/generateError";
import { userBase } from "../../db";

const removeUser: Handler = async (req, res, next) => {
  const { email } = req.body;

  try {
    let user = await userBase.delete({ email });

    if (!user.affected) {
      throw generateError("User not found" , 404)
    };

    res.status(200).json({ message: `User: ${email} has been removed` });
  } catch (e) {
    console.log("Error removeUser service");
    next(e);
  }
}

export default removeUser;
