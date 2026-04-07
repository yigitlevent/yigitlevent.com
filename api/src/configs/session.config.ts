import { IsDev } from "./constants.config";

import type { SessionOptions } from "express-session";


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
