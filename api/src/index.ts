import express from "express";
import session from "express-session";
import cors from "cors";
import Pg from "pg";
import pgsimple from "connect-pg-simple";

import { PORT } from "./constants.js";
import { CorsConfig, PgConfig, SessionConfig } from "./configs.js";
import { UserFetch, UserSignUp, UserSignIn, UserSignOut, UserFetchAll } from "./routes/user.js";

export const App = express();

const Printthings = (aa: any) => {
	console.log("and the winner is");
	console.log(aa);
};

Printthings(PgConfig);

export const PgPool = new Pg.Pool(PgConfig);

const Aa = await PgPool.query(
	`select * 
	from dbo."Users"`
);
Printthings(Aa.rows);

const SessionStore = new (pgsimple(session))({ pool: PgPool, schemaName: "dbo", tableName: "UserSessions" });

App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(cors(CorsConfig));
App.use(session({ store: SessionStore, ...SessionConfig }));

App.post("/api/users", UserFetchAll);
App.post("/api/user", UserFetch);
App.post("/api/user/signup", UserSignUp);
App.post("/api/user/signin", UserSignIn);
App.post("/api/user/signout", UserSignOut);

App.listen(PORT, () => console.log(`App started on port ${PORT}`));
