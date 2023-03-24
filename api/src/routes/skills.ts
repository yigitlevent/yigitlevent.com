import { Request, Response } from "express";

import { PgPool } from "../index";


export async function GetSkillsList(request: Request, response: Response) {
	try {
		const query = 'select * from dat."SkillsList";';
		const data = await PgPool.query<SkillsDBO[]>(query);

		response.status(200);
		return response.json({ skills: data });
	}
	catch (e) {
		console.error(e);
		return response.sendStatus(403);
	}
}
