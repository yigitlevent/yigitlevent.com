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
import { processMagic } from "./groups/p10_magic";
import { processResources } from "./groups/p11_resources";


// REFERENCE AND DATA
let refs: References = {};
const outputs: { name: string; data: string[]; }[] = [];

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
	() => processMagic(),
	(refs: References) => processResources(refs)
];

process.forEach(func => {
	const { name, references, data } = func(refs);
	refs = { ...refs, ...references };
	outputs.push({ name, data });
});

// OUTPUT
const outputPath = "./queries/data_dat";

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

outputs.map(v => {
	fs.writeFileSync(
		`${outputPath}/data_${v.name}.sql`,
		v.data.map(s => `${s};`).join("\n\n") + "\n"
	);
});

