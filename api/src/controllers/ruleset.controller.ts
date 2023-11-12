import { Request, Response } from "express";

import { GetAbilities } from "../services/abilities.service";
import { GetDoWActions } from "../services/dowActions.service";
import { GetFightActions } from "../services/fightActions.service";
import { GetLifepaths } from "../services/lifepaths.service";
import { GetPractices } from "../services/practices.service";
import { GetRaCActions } from "../services/racActions.service";
import { GetResources } from "../services/resources.service";
import { GetRulesets } from "../services/rulesets.service";
import { GetSettings } from "../services/settings.service";
import { GetSkills } from "../services/skills.service";
import { GetSpellFacets } from "../services/spellFacets.service";
import { GetStocks } from "../services/stocks.service";
import { GetTraits } from "../services/traits.service";


export async function GetRulesetsData(request: Request<unknown, unknown, RulesetForms>, response: Response): Promise<Response<RulesetResponse, Record<string, unknown>>> {
	try {
		const { rulesets } = request.body;

		const abilities = await GetAbilities();
		const stocks = await GetStocks(rulesets);
		const settings = await GetSettings(rulesets);
		const skills = await GetSkills(rulesets);
		const traits = await GetTraits();
		const lifepaths = await GetLifepaths();
		const resources = await GetResources();
		const spellFacets = await GetSpellFacets();
		const dowActions = await GetDoWActions();
		const racActions = await GetRaCActions();
		const fightActions = await GetFightActions();
		const practices = await GetPractices();

		const responseData: RulesetResponse = { ruleset: { abilities, stocks, settings, skills, traits, lifepaths, resources, spellFacets, dowActions, racActions, fightActions, practices } };

		response.status(200);
		return response.json(responseData);
	}
	catch (e) {
		console.error(e);
		return response.sendStatus(403);
	}
}

export async function GetRulesetsList(request: Request, response: Response): Promise<Response<RulesetsResponse, Record<string, unknown>>> {
	try {
		const data = await GetRulesets();

		const responseData: RulesetsResponse = { rulesets: data };

		response.status(200);
		return response.json(responseData);
	}
	catch (e) {
		console.error(e);
		return response.sendStatus(403);
	}
}
