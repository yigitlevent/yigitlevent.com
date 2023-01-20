import express from "express";
import session from "express-session";
import cors from "cors";
import Pg from "pg";
import pgsimple from "connect-pg-simple";

import { PORT } from "./constants.js";
import { CorsConfig, PgConfig, SessionConfig } from "./configs.js";
import { UserAuth, UserSignUp, UserSignIn, UserSignOut } from "./routes/user.js";


export const App = express();
export const PgPool = new Pg.Pool(PgConfig);

const SessionStore = new (pgsimple(session))({ pool: PgPool, schemaName: "dbo", tableName: "UserSessions" });

App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(cors(CorsConfig));
App.use(session({ store: SessionStore, ...SessionConfig }));

App.post("/user/auth", UserAuth);
App.post("/user/signup", UserSignUp);
App.post("/user/signin", UserSignIn);
App.post("/user/signout", UserSignOut);

App.listen(PORT, () => console.log(`App started on port ${PORT}`));
