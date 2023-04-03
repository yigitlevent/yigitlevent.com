import { Request, Response } from "express";

import { GetAbilities } from "../services/abilities.service";
import { GetDoWActions } from "../services/dowActions.service";
import { GetLifepaths } from "../services/lifepaths.service";
import { GetResources } from "../services/resources.service";
import { GetSettings } from "../services/settings.service";
import { GetSkills } from "../services/skills.service";
import { GetSpellFacets } from "../services/spellFacets.service";
import { GetStocks } from "../services/stocks.service";
import { GetTraits } from "../services/traits.service";
import { GetRulesets } from "../services/rulesets.service";
import { GetRaCActions } from "../services/racActions.service";
import { GetFightActions } from "../services/fightActions.service";


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
		const racActions = await GetRaCActions();
		const fightActions = await GetFightActions();

		const data: RulesetData = { abilities, stocks, settings, skills, traits, lifepaths, resources, spellFacets, dowActions, racActions, fightActions };

		response.status(200);
		return response.json(data);
	}
	catch (e) {
		console.error(e);
		return response.sendStatus(403);
	}
}

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
