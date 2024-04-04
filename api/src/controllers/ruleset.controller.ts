import { Request, Response } from "express";

import { GetAbilities } from "../services/abilities.service";
import { GetDoWActions } from "../services/dowActions.service";
import { GetFightActions } from "../services/fightActions.service";
import { GetLifepaths } from "../services/lifepaths.service";
import { GetPractices } from "../services/practices.service";
import { GetQuestions } from "../services/questions.service";
import { GetRaCActions } from "../services/racActions.service";
import { GetResources } from "../services/resources.service";
import { GetRulesets } from "../services/rulesets.service";
import { GetSettings } from "../services/settings.service";
import { GetSkills } from "../services/skills.service";
import { GetAltSpellFacets } from "../services/spellFacets.alt.service";
import { GetSpellFacets } from "../services/spellFacets.service";
import { GetStocks } from "../services/stocks.service";
import { GetTraits } from "../services/traits.service";
import { Logger } from "../utils/logger";


export async function GetRulesetsData(request: Request<unknown, unknown, BwgrRulesetForms>, response: Response): Promise<Response<BwgrRulesetResponse, Record<string, unknown>>> {
	try {
		const log = new Logger("➞ GetRulesetsData", true);
		const { rulesets } = request.body;

		const abilities = await GetAbilities();
		const stocks = await GetStocks(rulesets);
		const settings = await GetSettings(rulesets);
		const skills = await GetSkills(rulesets);
		const traits = await GetTraits(rulesets);
		const lifepaths = await GetLifepaths(rulesets);
		const resources = await GetResources(rulesets);
		const spellFacets = await GetSpellFacets();
		const spellAltFacets = await GetAltSpellFacets();
		const dowActions = await GetDoWActions();
		const racActions = await GetRaCActions();
		const fightActions = await GetFightActions();
		const practices = await GetPractices();
		const questions = await GetQuestions();

		const responseData: BwgrRulesetResponse = { ruleset: { abilities, stocks, settings, skills, traits, lifepaths, resources, spellFacets, spellAltFacets, dowActions, racActions, fightActions, practices, questions } };
		log.end();

		response.status(200);
		return response.json(responseData);
	}
	catch (e) {
		console.error(e);
		return response.sendStatus(403);
	}
}

export async function GetRulesetsList(request: Request, response: Response): Promise<Response<BwgrRulesetsResponse, Record<string, unknown>>> {
	try {
		const data = await GetRulesets();

		const responseData: BwgrRulesetsResponse = { rulesets: data };

		response.status(200);
		return response.json(responseData);
	}
	catch (e) {
		console.error(e);
		return response.sendStatus(403);
	}
}
