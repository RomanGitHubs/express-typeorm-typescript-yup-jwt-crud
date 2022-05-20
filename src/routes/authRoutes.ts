import { Router } from "express";
import registerUser from "../controllers/auth/registerUser";
import loginUser from "../controllers/auth/loginUser";
import validate from "../middlewares/validation";
import { loginUserScheme, registerUserSchema } from "../middlewares/validationShapes";

const authRoutes = Router();

authRoutes.post("/register", validate(registerUserSchema), registerUser);
authRoutes.post("/login", validate(loginUserScheme), loginUser);

export default authRoutes;