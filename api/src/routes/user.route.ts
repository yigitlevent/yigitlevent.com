import express from "express";

import { UserAuth, UserSignIn, UserSignOut, UserSignUp } from "../controllers/user.controller";
import { CheckAuth } from "../middlewares/checkAuth.middleware";


const Router = express.Router();

Router.post("/auth", CheckAuth, UserAuth);
Router.post("/signup", UserSignUp);
Router.post("/signin", UserSignIn);
Router.post("/signout", UserSignOut);

export default Router;
