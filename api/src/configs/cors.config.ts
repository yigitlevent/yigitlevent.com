import { IsDev } from "./constants.config";

import type { CorsOptions } from "cors";


export const CorsConfig: CorsOptions = {
	origin: IsDev ? "*" : ["https://yigitlevent.com", "https://api.yigitlevent.com", "https://bwgrtools.yigitlevent.com", "https://megagame.yigitlevent.com"],
	methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS", "HEAD"],
	credentials: true,
	allowedHeaders: "*"
};
