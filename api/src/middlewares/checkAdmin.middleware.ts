import { Request, Response, NextFunction } from "express";

import { FindUserBySessionId, MapUserAccess } from "../services/user.service";


export async function CheckAdmin(request: Request, response: Response, next: NextFunction): Promise<unknown> {
	if (request.sessionID) {
		const user = await FindUserBySessionId(request.sessionID);
		if (user && MapUserAccess(user.UserAccessIds).includes("Admin")) return next();
	}

	return response.sendStatus(401);
}
