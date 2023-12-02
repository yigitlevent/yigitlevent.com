import fs from "fs";

import { processGeneric } from "./processes_bwgr/p0_generic";
import { processRulesets } from "./processes_bwgr/p1_rulesets";
import { processStocks } from "./processes_bwgr/p2_stocks";
import { processTraits } from "./processes_bwgr/p3_traits";
import { processAbilities } from "./processes_bwgr/p4_abilities";
import { processSkills } from "./processes_bwgr/p5_skills";
import { processLifepaths } from "./processes_bwgr/p6_lifepaths";
import { processDuelOfWits } from "./processes_bwgr/p7_duelofwits";
import { processRangeAndCover } from "./processes_bwgr/p8_rangeandcover";
import { processFight } from "./processes_bwgr/p9_fight";
import { processMagic } from "./processes_bwgr/p10_magic";
import { processResources } from "./processes_bwgr/p11_resources";
import { processQuestions } from "./processes_bwgr/p12_questions";

function processor(process: ((refs: References) => Processed)[], queryOutputPath: string) {
	let refs: References = {};
	const outputs: { name: string; data: string[]; }[] = [];

	process.forEach(func => {
		const { name, references, data } = func(refs);
		refs = { ...refs, ...references };
		outputs.push({ name, data });
	});

	const outputPath = `./queries/${queryOutputPath}`;

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
}


function processBWGR() {
	const process = [
		() => processGeneric(),
		() => processRulesets(),
		() => processStocks(),
		(refs: References) => processTraits(refs),
		(refs: References) => processAbilities(refs),
		(refs: References) => processSkills(refs),
		(refs: References) => processLifepaths(refs),
		(refs: References) => processDuelOfWits(refs),
		(refs: References) => processRangeAndCover(refs),
		(refs: References) => processFight(refs),
		() => processMagic(),
		(refs: References) => processResources(refs),
		() => processQuestions()
	];

	processor(process, "data_bwgr");
}

function processHeart() {
	const process = [
		() => processGeneric()
	];

	processor(process, "data_heart");
}

processBWGR();
//processHeart();
