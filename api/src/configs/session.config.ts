import { SessionOptions } from "express-session";

import { IsDev, SECRET } from "./constants.config";


export const SessionConfig: SessionOptions = {
	secret: SECRET,
	saveUninitialized: false,
	resave: false,
	proxy: !IsDev,
	//rolling: true,
	cookie: {
		secure: !IsDev,
		httpOnly: !IsDev,
		sameSite: "strict",
		maxAge: 1000 * 60 * 60 * 24
	}
};
