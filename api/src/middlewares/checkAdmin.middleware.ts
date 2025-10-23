import { Request, Response, NextFunction } from "express";

import { FindUserBySessionId } from "../services/user.service";


export async function CheckAdmin(request: Request, response: Response, next: NextFunction): Promise<unknown> {
	if (request.sessionID) {
		const user = await FindUserBySessionId(request.sessionID);
		if (user && user.UserAccess.includes("Admin" as UserAccess)) return next();
	}

	return response.sendStatus(401);
}
