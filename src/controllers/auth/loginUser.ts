import { Handler } from "express";
import generateError from "../../utils/generateError";
import argon2 = require("argon2");
import { signToken } from "../../utils/token";
import { userBase } from "../../db";
import config from "../../config";

const loginUser: Handler = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await userBase.findOne({ where: { email } });

    if (!user) {
      throw generateError("User not exist" , 404);
    }

    const isPasswordCorrect = await argon2.verify(user.password, password);

    if (!isPasswordCorrect) {
      throw generateError("Wrong password" , 403);
    }

    delete user.password;

    const accessToken = await signToken(
      { id: user.id },
      config.tokenSecretKey,
      { expiresIn: "1h" }
    )

    res.status(200).json({ user, accessToken });
  } catch (e) {
    console.log("Error  loginUser service");
    next(e);
  }
}

export default loginUser;
