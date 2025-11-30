import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Fragment } from "react";

import { useRulesetStore } from "../../../hooks/apiStores/useRulesetStore";
import { PopoverLink } from "../../Shared/PopoverLink";


export function LifepathSkills({ lifepath }: { lifepath: BwgrLifepath; }): React.JSX.Element {
	const { getSkill } = useRulesetStore();

	const hasGeneralSkill = lifepath.pools.generalSkillPool !== 0;
	const hasLifepathSkill = lifepath.pools.lifepathSkillPool !== 0;

	const generalSkill = getSkill("General");

	const lifepathSkills =
		lifepath.skills ? lifepath.skills.map(skillId => getSkill(skillId)) : undefined;

	return (
		<Fragment>
			<b>Skills: </b>

			{hasGeneralSkill ? (
				<span>
					{lifepath.pools.generalSkillPool}
					{(lifepath.pools.generalSkillPool > 1) ? "pts: " : "pt: "}
				</span>
			) : null}

			{hasGeneralSkill ? (
				<Paper elevation={2} sx={{ cursor: "pointer", padding: "0 4px", margin: "0 0 0 2px", width: "max-content", display: "inline-block" }}>
					<PopoverLink data={generalSkill} />
				</Paper>
			) : null}

			<Box sx={{ display: "inline-block", margin: "0 6px 0 0" }}>
				{(hasGeneralSkill && hasLifepathSkill) ? "; " : null}
			</Box>

			{hasLifepathSkill ? (
				<span>
					{lifepath.pools.lifepathSkillPool}
					{(lifepath.pools.lifepathSkillPool > 1) ? "pts: " : "pt: "}
				</span>
			) : null}

			{hasLifepathSkill && lifepathSkills ? lifepathSkills.map((skill, i) => {
				return (
					<Paper key={i} elevation={2} sx={{ cursor: "pointer", padding: "0 4px", margin: "0 0 0 2px", width: "max-content", display: "inline-block" }}>
						<PopoverLink data={skill} />
					</Paper>
				);
			}) : null}
		</Fragment>
	);
}
