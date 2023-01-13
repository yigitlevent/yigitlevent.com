import express from "express";
import session from "express-session";
import dotenv from "dotenv";

import { PgClient } from "./connections/postgres";
import { UserAuth, UserSignup, UserSignin, UserSignout, UserEnable, UserDisable, UserDelete } from "./routes/user";


dotenv.config();
const SECRET = process.env.SECRET as string;
const PORT = process.env.PORT as string;

const App = express();
App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(session({ secret: SECRET, resave: true, saveUninitialized: true }));

PgClient.connect();

// POST
// GET 
// DELETE 
// PUT 

App.get("/user", UserAuth);
App.post("/user/auth", UserAuth);
App.post("/user/signup", UserSignup);
App.post("/user/signin", UserSignin);
App.post("/user/signout", UserSignout);
App.post("/user/enable", UserEnable);
App.post("/user/disable", UserDisable);
App.delete("/user/delete", UserDelete);

App.listen(PORT, () => console.log(`API listening on port ${PORT}`));
