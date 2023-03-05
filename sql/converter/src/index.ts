import fs from "fs";

import { processRulesets } from "./groups/q1_rulesets";
import { processStocks } from "./groups/q2_stocks";
import { processAbilities } from "./groups/q3_abilities";
import { processTraits } from "./groups/q4_traits";


// REFERENCE AND DATA
let refs: References = {};
const outputs: string[] = [];

// PROCESS
const process = [
	() => processRulesets(),
	() => processStocks(),
	() => processAbilities(),
	(refs: References) => processTraits(refs)
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
