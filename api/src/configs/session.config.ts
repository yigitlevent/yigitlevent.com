import { SessionOptions } from "express-session";

import { SECRET } from "./constants.config";

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
