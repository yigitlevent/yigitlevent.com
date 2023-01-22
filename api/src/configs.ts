import { CorsOptions } from "cors";
import { PoolConfig } from "pg";
import { SessionOptions } from "express-session";

import { SECRET } from "./constants.js";



export const CorsConfig: CorsOptions = {
	origin: process.env.API_ENV === "development" ? "*" : ["https://yigitlevent.com", /\.yigitlevent\.com$/],
	methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS", "HEAD"],
	credentials: true
	//allowedHeaders: ["Content-Type", "Authorization"]
};

export const PgConfig: PoolConfig = {
	user: process.env.API_PGUSER,
	password: process.env.API_PGPASSWORD,
	database: process.env.API_PGDATABASE,
	host: process.env.API_PGHOST,
	port: parseInt(process.env.API_PGPORT as string),
	max: 20,
	idleTimeoutMillis: 0,
	connectionTimeoutMillis: 0
};

declare module "express-session" {
	interface SessionData {
		user: User;
	}
}

export const SessionConfig: SessionOptions = {
	secret: SECRET,
	saveUninitialized: false,
	resave: false,
	proxy: process.env.API_ENV === "production",
	//rolling: true,
	cookie: {
		secure: process.env.API_ENV === "production",
		httpOnly: true,
		sameSite: "strict",
		maxAge: 1000 * 60 * 60 * 24
	}
};
