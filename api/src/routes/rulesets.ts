import { Request, Response } from "express";

import { GetAbilities, GetDoWActions, GetLifepaths, GetResources, GetRulesets, GetSettings, GetSkills, GetSpellFacets, GetStocks, GetTraits } from "../queries/queries";


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
		const lifepaths = await GetLifepaths();
		const resources = await GetResources();
		const spellFacets = await GetSpellFacets();
		const dowActions = await GetDoWActions();

		const data: RulesetData = { abilities, stocks, settings, skills, traits, lifepaths, resources, spellFacets, dowActions };

		response.status(200);
		return response.json(data);
	}
	catch (e) {
		console.error(e);
		return response.sendStatus(403);
	}
}
