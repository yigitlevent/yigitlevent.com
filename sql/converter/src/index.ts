import fs from "fs";

import { processRulesets } from "./groups/p1_rulesets";
import { processStocks } from "./groups/p2_stocks";
import { processAbilities } from "./groups/p3_abilities";
import { processTraits } from "./groups/p4_traits";
import { processSkills } from "./groups/p5_skills";


// REFERENCE AND DATA
let refs: References = {};
const outputs: string[] = [];

// PROCESS
const process = [
	() => processRulesets(),
	() => processStocks(),
	() => processAbilities(),
	(refs: References) => processTraits(refs),
	(refs: References) => processSkills(refs)
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
fs.writeFileSync(`${outputPath}/data.sql`, outputs.map(v => `${v};`).join("\n\n") + "\n");
