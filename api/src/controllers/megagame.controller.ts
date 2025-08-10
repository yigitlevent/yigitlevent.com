import { Request, Response } from "express";

import { GetMegagameData, GetMegagameEventData, SetMegagameData } from "../services/megagame.service";


export async function GetMegagame(request: Request, response: Response): Promise<Response<MggmMegagameResponse, Record<string, unknown>>> {
	try {
		const data = await GetMegagameData();

		if (data === undefined) {
			response.status(404);
			return response.json({ error: "Megagame data not found" });
		}

		const eventData = await GetMegagameEventData(data.Id);

		const megagame: Megagame = {
			id: data.Id as unknown as MegagameId,
			name: data.Name,
			timing: {
				start: new Date(data.Start),
				end: new Date(data.End)
			},
			cycle: {
				minutes: data.CycleMinutes,
				name: data.CycleName,
				namePlural: data.CycleNamePlural
			},
			events: eventData?.map(event => ({
				id: event.Id as unknown as MegagameEventId,
				name: event.Name,
				description: event.Description,
				cycleInterval: event.CycleInterval
			})) || []
		};

		const responseData: MggmMegagameResponse = { megagame };

		response.status(200);
		return response.json(responseData);
	}
	catch (e) {
		console.error(e);
		return response.sendStatus(403);
	}
}

export async function SetMegagame(request: Request<unknown, unknown, SetMegagameRequest>, response: Response): Promise<Response<BwgrRulesetResponse, Record<string, unknown>>> {
	const setMegagameRequest = request.body;

	try {
		await SetMegagameData(setMegagameRequest);

		response.status(200);
		return response;
	}
	catch (e) {
		console.error(e);
		return response.sendStatus(403);
	}
}
