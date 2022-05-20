import { Handler } from "express";
import generateError from "../../utils/generateError";
import argon2 = require("argon2");
import { signToken } from "../../utils/token";
import { userBase } from "../../db";
import config from "../../config";

const registerUser: Handler = async (req, res, next) => {
  const {
    role,
    firstName,
    lastName,
    email,
    password,
    dob
  } = req.body;

  try {
    const existingUser = await userBase.findOne({ where: { email } });

    if (existingUser) {
      throw generateError("This user already exist", 409);
    }

    const hashedPassword = await argon2.hash(password);

    const newUser = await userBase.save({
      role: role,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      dob: dob,
    });

    const user = { role, firstName, lastName, email, dob };

    const accessToken = await signToken(
      { id: newUser.id},
      config.tokenSecretKey,
      { expiresIn: "1h" }
    );

    res.status(200).json({ user, accessToken });
  } catch (e) {
    console.log("Error  registerUser service");
    next(e);
  }
}

export default registerUser;
