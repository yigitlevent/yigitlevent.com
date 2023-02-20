import { Request, Response } from "express";

import { PgPool } from "../index.js";


export async function GetCampaigns(request: Request, response: Response) {
	try {
		const user = request.session.user as User;

		const query =
			`select "Id", "Name", "GamemasterId", "Enabled", "CreatedAt", "UpdatedAt"
			from dbo."Campaigns" 
			where "GamemasterId" = '${user.id}';`;

		const data = await PgPool.query(query);

		response.status(200);
		return response.json({ campaigns: data });
	}
	catch (e) {
		console.error(e);
		return response.sendStatus(403);
	}
}

export async function GetCampaign(request: Request, response: Response) {
	return response.sendStatus(403);
}

export async function CreateCampaign(request: Request, response: Response) {
	return response.sendStatus(403);
}

export async function EditCampaign(request: Request, response: Response) {
	return response.sendStatus(403);
}

export async function DeleteCampaign(request: Request, response: Response) {
	return response.sendStatus(403);
}

export async function CampaignInvite(request: Request, response: Response) {
	return response.sendStatus(403);
}
