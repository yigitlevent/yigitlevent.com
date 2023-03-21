import fs from "fs";

import { processGeneric } from "./groups/p0_generic";
import { processRulesets } from "./groups/p1_rulesets";
import { processStocks } from "./groups/p2_stocks";
import { processAbilities } from "./groups/p3_abilities";
import { processTraits } from "./groups/p4_traits";
import { processSkills } from "./groups/p5_skills";
import { processLifepaths } from "./groups/p6_lifepaths";
import { processDuelOfWits } from "./groups/p7_duelofwits";
import { processRangeAndCover } from "./groups/p8_rangeandcover";
import { processFight } from "./groups/p9_fight";
import { processMagicalFacets } from "./groups/p10_magicalfacets";


// REFERENCE AND DATA
let refs: References = {};
const outputs: string[] = [];

// PROCESS
const process = [
	() => processGeneric(),
	() => processRulesets(),
	() => processStocks(),
	(refs: References) => processAbilities(refs),
	(refs: References) => processTraits(refs),
	(refs: References) => processSkills(refs),
	(refs: References) => processLifepaths(refs),
	(refs: References) => processDuelOfWits(refs),
	(refs: References) => processRangeAndCover(refs),
	(refs: References) => processFight(refs),
	() => processMagicalFacets(),
];

process.forEach(func => {
	const { references, data } = func(refs);
	refs = { ...refs, ...references };
	outputs.push(...data);
});

// OUTPUT
const outputPath = "../data_dat";
if (fs.existsSync(outputPath)) fs.rmSync(outputPath, { recursive: true });
fs.mkdirSync(outputPath);

fs.writeFileSync(
	`${outputPath}/ref.json`,
	JSON.stringify(refs)
		.replaceAll("]}", "\n\t]\n}")
		.replaceAll("]],", "]\n\t],\n")
		.replaceAll("[[", "[\n\t\t[")
		.replaceAll("{", "{\n\t")
);

fs.writeFileSync(
	`${outputPath}/data.sql`,
	outputs.map(v => `${v};`)
		.join("\n\n")
	+ "\n"
);
