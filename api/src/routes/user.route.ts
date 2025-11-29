import express from "express";

import { UserAuth, UserSignIn, UserSignOut, UserSignUp } from "../controllers/user.controller";
import { CheckAuth } from "../middlewares/checkAuth.middleware";
import { SignInValidators, SignUpValidators } from "../validators/user.validator";
import { Validator } from "../validators/validator";


const Router = express.Router();

Router.post("/auth", CheckAuth, UserAuth);
Router.post("/signup", Validator(SignUpValidators), UserSignUp);
Router.post("/signin", Validator(SignInValidators), UserSignIn);
Router.post("/signout", UserSignOut);

// eslint-disable-next-line import/no-default-export
export default Router;
