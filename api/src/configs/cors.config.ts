import { CorsOptions } from "cors";

export const CorsConfig: CorsOptions = {
	origin: process.env.API_ENV === "development" ? "*" : ["https://yigitlevent.com", /\.yigitlevent\.com$/],
	methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS", "HEAD"],
	credentials: true
	//allowedHeaders: ["Content-Type", "Authorization"]
};
