import { Request, Response } from "express";

import { GetMegagameData, GetMegagameEventData, GetMegagameRumorData, SetMegagameData, SetMegagameRumor } from "../services/megagame.service";


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
			type: data.Type as "dune" | "wod",
			timing: {
				start: new Date(data.Start),
				end: new Date(data.End)
			},
			cycle: {
				start: data.CycleStart,
				minutes: data.CycleMinutes
			},
			events: eventData?.map(event => ({
				id: event.Id as unknown as MegagameEventId,
				name: {
					en: event.NameEN,
					tr: event.NameTR
				},
				description: {
					en: event.DescriptionEN,
					tr: event.DescriptionTR
				},
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

export async function GetRumors(request: Request<unknown, unknown, GetMegagameRumorsRequest>, response: Response): Promise<Response<MggmRumorsResponse, Record<string, unknown>>> {
	const { megagameId } = request.body;

	try {
		const rumors = await GetMegagameRumorData(megagameId);

		if (rumors === undefined) {
			response.status(404);
			return response.json({ error: "Rumors not found" });
		}

		const responseData: MggmRumorsResponse = {
			rumors: rumors.map(rumor => ({
				id: rumor.Id,
				text: {
					en: rumor.TextEN,
					tr: rumor.TextTR
				}
			}))
		};

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

export async function SetRumor(request: Request<unknown, unknown, SetMegagameRumorRequest>, response: Response): Promise<Response<void, Record<string, unknown>>> {
	const { megagameId, textEN, textTR } = request.body;

	try {
		await SetMegagameRumor(megagameId, textEN, textTR);

		response.status(200);
		return response;
	}
	catch (e) {
		console.error(e);
		return response.sendStatus(403);
	}
}
