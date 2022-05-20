import { Handler } from "express";
import generateError from "../utils/generateError";

const verifyPermission: Handler = async (req, res, next) => {
  const user = req.user;

  try {

    if (user === null) {
      throw generateError("User has been deleted" , 403);
    }

    if (user.role !== "Admin") {
      throw generateError("Only Admin can remove users" , 403);
    }

    next()
  } catch (e) {
    console.log("Error verifyPermission middleware");
    next(e);
  }
}

export default verifyPermission;
