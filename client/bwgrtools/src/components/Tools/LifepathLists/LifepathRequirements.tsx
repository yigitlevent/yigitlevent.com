import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { GetOrdinalSuffix } from "@utility/GetOrdinalSuffix";
import { Fragment } from "react";


function ResolveRequirementBlockItem(item: BwgrLifepathRequirementItem): string {
	const subject = "forCompanion" in item && item.forCompanion ? "Companion of this character" : "Character";

	if ("isUnique" in item) return "This lifepath cannot be selected twice.";
	else if ("isSettingEntry" in item) return "If character leads into this setting, this lifepath must be chosen as the first one in this setting.";
	else if ("minLpIndex" in item) return `This can be selected as the ${GetOrdinalSuffix(item.minLpIndex)} lifepath or higher.`;
	else if ("maxLpIndex" in item) return `This can be selected as the ${GetOrdinalSuffix(item.maxLpIndex)} lifepath or lower.`;
	else if ("minYears" in item) return `Character must be at least ${item.minYears} years old.`;
	else if ("maxYears" in item) return `Character must be at most ${item.maxYears} years old.`;
	else if ("gender" in item) return `Character must be a ${item.gender.toLowerCase()}.`;
	else if ("oldestBy" in item) return `Character must be oldest in the party by ${item.oldestBy}.`;
	else if ("attribute" in item) {
		if (item.min) return `${subject} must have at least a ${item.min} of ${item.attribute[1]} attribute.`;
		else if (item.max) return `${subject} must have at most a ${item.max} of ${item.attribute[1]} attribute.`;
		else return `${subject} must have ${item.attribute[1]} attribute.`;
	}
	else if ("skill" in item) return `${subject} must have ${item.skill[1]} skill.`;
	else if ("trait" in item) return `${subject} must have ${item.trait[1]} trait.`;
	else if ("lifepath" in item) return `${subject} must have ${item.lifepath[1]} lifepath.`;
	else if ("setting" in item) return `${subject} must have ${item.setting[1]} setting.`;
	else if ("question" in item) return `Answer for ${item.question[1]} must be yes.`;
	else throw new Error(`Unidentified requirement block item: ${item}`);
}

function BlockTitle(logicType: string, fulfillmentAmount: number): string {
	const fa = fulfillmentAmount > 1 ? ` ${fulfillmentAmount} times` : "";

	switch (logicType) {
		case "AND":
			return `All of the following must be true${fa}:`;
		case "OR":
			return `At least one of the following must be true${fa}:`;
		case "NOT":
			return `None of the following must be true${fa}:`;
		default:
			throw new Error(`Unidentified requirement block logic type: ${logicType}`);
	}
}

function ResolveRequirementBlocks(requirementBlocks: BwgrLifepathRequirementBlock[]): JSX.Element {
	const parentLogic = requirementBlocks.every(v => v.mustFulfill) ? "AND" : "OR";

	const hasOneBlock = requirementBlocks.length === 1;

	return (
		<Fragment>
			{!hasOneBlock ? <Box>{BlockTitle(parentLogic, 1)}</Box> : null}

			{requirementBlocks.map((block, i) => (
				<Fragment key={i}>
					<Box sx={{ marginLeft: hasOneBlock ? 0 : 1 }}>{BlockTitle(block.logicType[1], block.fulfillmentAmount)}</Box>

					<Box sx={{ marginLeft: hasOneBlock ? 0 : 1 }}>
						{block.items.map((item, ii) => <Box key={ii} sx={{ marginLeft: 1 }}>{ResolveRequirementBlockItem(item)}</Box>)}
					</Box>
				</Fragment>
			)
			)}
		</Fragment>
	);
}

export function LifepathRequirements({ lifepath }: { lifepath: BwgrLifepath; }): JSX.Element {
	return (
		<Fragment>
			<b>Requirements:</b>

			{lifepath.requirements
				? <Box>
					<Typography variant="body3">{ResolveRequirementBlocks(lifepath.requirements)}</Typography>
				</Box>
				: null}

			{lifepath.requirementsText
				? lifepath.requirementsText.split("<br>").map((text, textIndex) => <Typography key={textIndex} variant="body2">{text}</Typography>)
				: null}
		</Fragment>
	);
}
