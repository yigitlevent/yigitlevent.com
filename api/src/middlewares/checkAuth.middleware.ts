import { Request, Response, NextFunction } from "express";

import { FindUserBySessionId } from "../services/user.service";


export async function CheckAuth(request: Request, response: Response, next: NextFunction): Promise<unknown> {
	if (request.sessionID) {
		const user = await FindUserBySessionId(request.sessionID);
		if (user) { next(); return; }
	}

	return response.sendStatus(401);
}

