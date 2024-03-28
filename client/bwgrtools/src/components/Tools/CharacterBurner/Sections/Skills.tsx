import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { UniqueArrayItem } from "@utility/UniqueArray";
import { Fragment } from "react";

import { useCharacterBurnerSkillStore } from "../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerSkill";
import { AbilityButton } from "../../../Shared/AbilityButton";
import { GenericGrid } from "../../../Shared/Grids";
import { BlockSkillPopover } from "../BlockText";


function Skill({ skill, remove }: { skill: UniqueArrayItem<BwgrSkillId, BwgrCharacterSkill>; remove?: (skillId: BwgrSkillId) => void; }): JSX.Element {
	const { getSkill, openSkill, modifySkillExponent } = useCharacterBurnerSkillStore();
	const skillPoints = getSkill(skill.id);

	return (
		<Grid item xs={6} sm={3} md={2}>
			<GenericGrid columns={5} center="h" hasBackground={1}>
				<BlockSkillPopover
					skill={[skill.id, skill.name]}
					checkbox={{ checked: skill.isOpen !== "no", disabled: skill.type === "Mandatory", onClick: () => openSkill(skill.id) }}
					deleteCallback={remove ? () => remove(skill.id) : undefined}
				/>

				<Grid item>
					<AbilityButton name={skill.name} disabled>
						{skillPoints.shade}
					</AbilityButton>

					<AbilityButton onClick={() => modifySkillExponent(skill.id)} onContextMenu={() => modifySkillExponent(skill.id, true)} disabled={!skill.isOpen}>
						{skillPoints.exponent}
					</AbilityButton>
				</Grid>
			</GenericGrid>
		</Grid>
	);
}

function MandatorySkills() {
	const { skills } = useCharacterBurnerSkillStore();

	return (
		<Fragment>
			<Grid item xs={6}>
				<Typography variant="h5" sx={{ margin: "12px 0 0 24px" }}>Mandatory</Typography>
			</Grid>

			<Fragment>
				{skills
					.filter(s => s.type === "Mandatory")
					// TODO: re-enable .filter(v => !SpecialSkills.includes(v as SkillPath))
					.map((skill, i) => <Skill key={i} skill={skill} />)}
			</Fragment>
		</Fragment>
	);
}

function LifepathSkills() {
	const { skills } = useCharacterBurnerSkillStore();

	return (
		<Fragment>
			<Grid item xs={6}>
				<Typography variant="h5" sx={{ margin: "12px 0 0 24px" }}>Lifepath</Typography>
			</Grid>

			<Fragment>
				{skills
					.filter(s => s.type === "Lifepath")
					// TODO: re-enable .filter(v => !SpecialSkills.includes(v as SkillPath))
					.map((skill, i) => <Skill key={i} skill={skill} />)}
			</Fragment>
		</Fragment>
	);
}

function GeneralSkills({ openModal }: { openModal: (name: BwgrCharacterBurnerModals) => void; }) {
	const { skills, removeGeneralSkill } = useCharacterBurnerSkillStore();

	return (
		<Fragment>
			<Grid item xs={6}>
				<Typography variant="h5" sx={{ margin: "12px 0 0 24px" }}>General</Typography>
			</Grid>

			<Fragment>
				{skills
					.filter(s => s.type === "General")
					// TODO: re-enable .filter(v => !SpecialSkills.includes(v as SkillPath))
					.map((skill, i) => <Skill key={i} skill={skill} remove={removeGeneralSkill} />)}
			</Fragment>

			<Button variant="outlined" style={{ margin: "10px" }} onClick={() => openModal("geSk")}>Add General Skill</Button>
		</Fragment>
	);
}

export function Skills({ openModal }: { openModal: (name: BwgrCharacterBurnerModals) => void; }): JSX.Element {
	const { skills, getSkillPools } = useCharacterBurnerSkillStore();

	// const [open, setOpen] = useState(false);

	const skillPools = getSkillPools();

	const generalText = `General Skill Points / Total: ${skillPools.general.total}, Remaining: ${skillPools.general.remaining}`;
	const lifepathText = `Lifepath Skill Points / Total: ${skillPools.lifepath.total}, Remaining: ${skillPools.lifepath.remaining}`;

	return (
		<GenericGrid columns={6} center="v" spacing={[0, 2]} extraBottomMargin>
			<Grid item xs={6}>
				<Typography variant="h4">Skills</Typography>
			</Grid>

			<Grid item xs={6} sm={5}>
				<Typography>{generalText}</Typography>
				<Typography>{lifepathText}</Typography>
			</Grid>

			{/*<Grid item xs={6} sm={1}>
				<Button variant="outlined" size="small" onClick={() => setOpen(true)} fullWidth>Add General Skill</Button>
			</Grid>*/}

			{skills.existsAny("type", "Mandatory") > 0 ? <MandatorySkills /> : null}
			{skills.existsAny("type", "Lifepath") > 0 ? <LifepathSkills /> : null}
			<GeneralSkills openModal={openModal} />
		</GenericGrid>
	);
}
