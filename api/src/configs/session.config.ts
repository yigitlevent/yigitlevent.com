import { SessionOptions } from "express-session";

import { IsDev } from "./constants.config";


export const SessionConfig: SessionOptions = {
	secret: process.env.API_SECRET as unknown as string,
	saveUninitialized: false,
	resave: false,
	proxy: !IsDev,
	// rolling: true,
	cookie: {
		secure: !IsDev,
		httpOnly: !IsDev,
		sameSite: "strict",
		maxAge: 1000 * 60 * 60 * 24
	}
};
