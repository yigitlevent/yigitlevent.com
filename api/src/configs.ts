import { CorsOptions } from "cors";
import { PoolConfig } from "pg";
import { SessionOptions } from "express-session";

import { SECRET } from "./constants.js";


export const CorsConfig: CorsOptions = {
	origin: "*",//"http://yigitlevent.com",
	methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS", "HEAD"],
	credentials: true
	//allowedHeaders: ["Content-Type", "Authorization"]
};

export const PgConfig: PoolConfig = {
	user: process.env.APIPGUSER,
	password: process.env.APIPGPASSWORD,
	database: process.env.APIPGDATABASE,
	host: process.env.APIPGHOST,
	port: parseInt(process.env.APIPGPORT as string),
	max: 20,
	idleTimeoutMillis: 0,
	connectionTimeoutMillis: 0
};

export const SessionConfig: SessionOptions = {
	secret: SECRET,
	saveUninitialized: false,
	resave: false,
	cookie: {
		secure: false,
		httpOnly: true,
		sameSite: false,
		maxAge: 1000 * 60 * 60 * 24
	}
};
