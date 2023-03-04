import fs from "fs";

import { processRulesets } from "./groups/g1_rulesets.js";


const rulesets = processRulesets();

const outputs = [
	...rulesets
];

fs.rmSync("./output", { recursive: true });
fs.mkdirSync("./output");
fs.writeFileSync("./output/data.sql", outputs.map(v => `${v};`).join("\n\n"));
