import { Request, Response } from "express";

import { GetAbilities, GetRulesets, GetSettings, GetSkills, GetStocks, GetTraits } from "../queries/queries";


export async function GetRulesetsList(request: Request, response: Response) {
	try {
		const data = await GetRulesets();

		response.status(200);
		return response.json({ rulesets: data });
	}
	catch (e) {
		console.error(e);
		return response.sendStatus(403);
	}
}

export async function GetRulesetsData(request: Request, response: Response) {
	try {
		const abilities = await GetAbilities();
		const stocks = await GetStocks();
		const settings = await GetSettings();
		const skills = await GetSkills();
		const traits = await GetTraits();

		response.status(200);
		return response.json({ abilities, stocks, settings, skills, traits });
	}
	catch (e) {
		console.error(e);
		return response.sendStatus(403);
	}
}
