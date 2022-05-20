import { Handler } from "express";
import argon2 = require("argon2");
import { userBase } from "../../db";

const editUser: Handler = async (req, res, next) => {
  try {
    const {
      role,
      firstName,
      lastName,
      email,
      password,
      dob
    } = req.body;

    const hashedPassword = await argon2.hash(password);

    await userBase.update(req.user.id, {
      role,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dob
    });

    const getRefreshedUser = await userBase.findOne({ where: { id: req.user.id }});

    delete getRefreshedUser.password;

    res.status(200).json(getRefreshedUser);

  } catch (e) {
    console.log("Error editUser service");
    next(e);
  }
}

export default editUser;
