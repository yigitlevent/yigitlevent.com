import { Fragment } from "react";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { UniqueArrayItem } from "../../../../utils/uniqueArray";

import { GenericGrid } from "../../../Shared/Grids";
import { AbilityButton } from "../../../Shared/AbilityButton";
import { BlockSkillPopover } from "../BlockText";
import { useCharacterBurnerStore } from "../../../../hooks/featureStores/useCharacterBurnerStore";


function SkillsList({ skill }: { skill: UniqueArrayItem<SkillId, CharacterSkill>; }) {
	const { getSkill, openSkill, modifySkillExponent } = useCharacterBurnerStore();
	const charSkill = getSkill(skill.id);

	return (
		<Grid item xs={6} sm={3} md={2}>
			<GenericGrid columns={5} center="h" hasBackground={1}>
				<BlockSkillPopover
					skill={[skill.id, skill.name]}
					checkbox={{ checked: skill.isOpen, disabled: skill.isMandatory, onClick: () => openSkill(skill.id) }}
				/>
				<Grid item>
					<AbilityButton name={skill.name} disabled>
						{charSkill.shade}
					</AbilityButton>
					<AbilityButton onClick={() => modifySkillExponent(skill.id)} onContextMenu={() => modifySkillExponent(skill.id, true)} disabled={!skill.isOpen}>
						{charSkill.exponent}
					</AbilityButton>
				</Grid>
			</GenericGrid>
		</Grid>
	);
}

function MandatorySkills() {
	const { skills } = useCharacterBurnerStore();

	return (
		<Fragment>
			<Grid item xs={6}>
				<Typography variant="h5" sx={{ margin: "12px 0 0 24px" }}>Mandatory</Typography>
			</Grid>

			<Fragment>
				{skills
					.filter(s => s.isMandatory && !s.isGeneral)
					// TODO: re-enable .filter(v => !SpecialSkills.includes(v as SkillPath))
					.map((skill, i) => <SkillsList key={i} skill={skill} />)}
			</Fragment>
		</Fragment>
	);
}

function LifepathSkills() {
	const { skills } = useCharacterBurnerStore();

	return (
		<Fragment>
			<Grid item xs={6}>
				<Typography variant="h5" sx={{ margin: "12px 0 0 24px" }}>Lifepath</Typography>
			</Grid>

			<Fragment>
				{skills
					.filter(s => !s.isMandatory && !s.isGeneral)
					// TODO: re-enable .filter(v => !SpecialSkills.includes(v as SkillPath))
					.map((skill, i) => <SkillsList key={i} skill={skill} />)}
			</Fragment>
		</Fragment>
	);
}

function GeneralSkills() {
	const { skills } = useCharacterBurnerStore();

	return (
		<Fragment>
			<Grid item xs={6}>
				<Typography variant="h5" sx={{ margin: "12px 0 0 24px" }}>General</Typography>
			</Grid>

			<Fragment>
				{skills
					.filter(s => s.isGeneral)
					// TODO: re-enable .filter(v => !SpecialSkills.includes(v as SkillPath))
					.map((skill, i) => <SkillsList key={i} skill={skill} />)}
			</Fragment>
		</Fragment>
	);
}

export function Skills() {
	const { skills, getSkillPools } = useCharacterBurnerStore();

	// const [open, setOpen] = useState(false);

	const skillPools = getSkillPools();

	return (
		<GenericGrid columns={6} center="v" spacing={[0, 2]}>
			<Grid item xs={6}>
				<Typography variant="h4">Skills</Typography>
			</Grid>

			<Grid item xs={6} sm={5}>
				<Typography>General Skill Points / Total: {skillPools.general.total}, Remaining: {skillPools.general.remaining}</Typography>
				<Typography>Lifepath Skill Points / Total: {skillPools.lifepath.total}, Remaining: {skillPools.lifepath.remaining}</Typography>
			</Grid>

			{/*<Grid item xs={6} sm={1}>
				<Button variant="outlined" size="small" onClick={() => setOpen(true)} fullWidth>Add General Skill</Button>
			</Grid>*/}

			{skills.existsAny("isMandatory", true) > 0 ? <MandatorySkills /> : null}
			{skills.existsAny("isMandatory", false) > 0 ? <LifepathSkills /> : null}
			{skills.existsAny("isGeneral", true) > 0 ? <GeneralSkills /> : null}

			{/* TODO: <GeneralSkillModal open={open} setOpen={setOpen} />*/}
		</GenericGrid>
	);
}
