import fs from "fs";

import { processRulesets } from "./groups/g1_rulesets";
import { processStocks } from "./groups/g2_stocks";

// PROCESS OLD DATA
const { data: RulesetData } = processRulesets();
const { references: StockRefs, data: StockData } = processStocks();

// ADD AN ARRAY OF SQL STRINGS
const outputs = [
	...RulesetData,
	...StockData
];

// WRITE DATA INTO A FILE
const outputPath = "../data";
if (fs.existsSync(outputPath)) fs.rmSync(outputPath, { recursive: true });
fs.mkdirSync(outputPath);
fs.writeFileSync(`${outputPath}/data.sql`, outputs.map(v => `${v};`).join("\n\n") + "\n");
