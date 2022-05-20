import { Handler } from "express";
import { verifyToken } from "../utils/token";
import generateError from "../utils/generateError";
import { userBase } from "../db";
import config from "../config";

const verifyAccess: Handler = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw generateError("Need access token", 403);
    }

    const accessToken = (req.headers.authorization as string).split(' ')[1];
    const decoded = verifyToken(accessToken, config.tokenSecretKey);

    if (!decoded) return res.status(401).json({ message: "User not found" });

    req.user = await userBase.findOne({ where: { id: decoded.id }});

    next();
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Bad access token" });
    }
    console.log("Error verifyAccess middleware");
    next(e);
  }
}

export default verifyAccess;