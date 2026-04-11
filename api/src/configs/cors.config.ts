import { IsDev } from "./constants.config";

import type { CorsOptions } from "cors";


const AllowedOrigins = [
	"https://yigitlevent.com",
	"https://bwgrtools.yigitlevent.com",
	"https://megagame.yigitlevent.com",
	...(IsDev ? ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"] : [])
];

export const CorsConfig: CorsOptions = {
	origin: (origin, callback) => {
		if (!origin || AllowedOrigins.includes(origin)) callback(null, true);
		else callback(new Error("Not allowed by CORS"));
	},
	methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS", "HEAD"],
	credentials: true,
	allowedHeaders: ["Content-Type", "Authorization"]
};
