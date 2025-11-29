import { CorsOptions } from "cors";

import { IsDev } from "./constants.config";


export const CorsConfig: CorsOptions = {
	origin: IsDev ? "*" : ["https://yigitlevent.com", /\.yigitlevent\.com$/],
	methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS", "HEAD"],
	credentials: true
	// allowedHeaders: ["Content-Type", "Authorization"]
};
