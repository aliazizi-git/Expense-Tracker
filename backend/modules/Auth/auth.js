import { Router } from "express";
import { login, register } from "./authCn.js";
import { loginValidator, registerValidator } from "./authValidator.js";

const authRouter = Router();
authRouter.route("/login").post(loginValidator, login);
authRouter.route("/register").post(registerValidator, register);

export default authRouter