import { Router } from "express";
import editUser from "../controllers/user/editUser";
import getAllUser from "../controllers/user/getAllUsers";
import getUser from "../controllers/user/getUser";
import removeUser from "../controllers/user/removeUser";
import validate from "../middlewares/validation";
import { editUserSchema, getAllUsers } from "../middlewares/validationShapes";
import verifyAccess from "../middlewares/verifyAccess";
import verifyPermission from "../middlewares/verifyPermission";

const userRoutes = Router();

userRoutes.get("/", verifyAccess, getUser);
userRoutes.get("/all", validate(getAllUsers), getAllUser);
userRoutes.put("/edit",validate(editUserSchema) ,verifyAccess, editUser);
userRoutes.delete("/remove",verifyAccess, verifyPermission, removeUser);

export default userRoutes;