import fs from "fs";

import { processRulesets } from "./groups/g1_rulesets.js";

// PROCESS OLD DATA
const rulesets = processRulesets();

// ADD AN ARRAY OF SQL STRINGS
const outputs = [
	...rulesets
];

// WRITE DATA INTO A FILE
const outputPath = "../data";
if (fs.existsSync(outputPath)) fs.rmSync(outputPath, { recursive: true });
fs.mkdirSync(outputPath);
fs.writeFileSync(`${outputPath}/data.sql`, outputs.map(v => `${v};`).join("\n\n") + "\n");
