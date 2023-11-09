import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";


import { useCharacterBurnerStoreOld } from "../../../../hooks/oldStores/useCharacterBurnerStoreOld";
import { GenericGrid } from "../../../Shared/Grids";
import { LifepathBox } from "../../LifepathLists/LifepathBox";


type Generic = (open: boolean) => void;

export function LifepathsBlock({ openLpModal, openRlModal, openQuModal, openSlModal, openSuModal, openSsModal }: { openLpModal: Generic; openRlModal: Generic; openQuModal: Generic; openSlModal: Generic; openSuModal: Generic; openSsModal: Generic; }) {
	const { stock, lifepathIds: lifepathPaths, totals, removeLifepath } = useCharacterBurnerStoreOld();

	const isSpecialLifepathsDisabled
		= !lifepathPaths.some(v => SpecialLifepaths.includes(v));

	const isSpecialSkillsDisabled
		= !(totals.skills.generalList.some(v => SpecialSkills.includes(v as SkillPath))
			|| totals.skills.mandatoryList.some(v => SpecialSkills.includes(v as SkillPath))
			|| totals.skills.lifepathList.some(v => SpecialSkills.includes(v as SkillPath)));

	const isStockSpecificDisabled
		= !((stock === "Orc" && lifepathPaths.length < 5)
			|| (stock === "Great Wolf" && lifepathPaths.length > 0));

	return (
		<GenericGrid columns={4} center="v">
			<Grid item xs={4}>
				<Typography variant="h4">Lifepaths</Typography>
			</Grid>
			<Fragment>
				{lifepathPaths.map((lpPath, i) => (
					<Grid key={i} item xs={4}>
						<LifepathBox lifepath={GetLifepathFromPath(lpPath)} />
					</Grid>
				)
				)}
			</Fragment>
			<Grid item xs={4} sm={2} md={1}>
				<Button variant="outlined" size="medium" fullWidth onClick={() => openLpModal(true)}>Add Lifepath</Button>
			</Grid>
			<Grid item xs={4} sm={2} md={1}>
				<Button variant="outlined" size="medium" fullWidth onClick={() => removeLifepath()} disabled={lifepathPaths.length === 0}>Remove Lifepath</Button>
			</Grid>
			<Grid item xs={4} sm={2} md={1}>
				<Button variant="outlined" size="medium" fullWidth onClick={() => openRlModal(true)} disabled={lifepathPaths.length !== 0}>Random Lifepaths</Button>
			</Grid>
			<Grid item xs={4} sm={2} md={1}>
				<Button variant="outlined" size="medium" fullWidth onClick={() => openQuModal(true)} disabled={lifepathPaths.length === 0}>Answer Questions</Button>
			</Grid>
			<Grid item xs={4} sm={2} md={1}>
				<Button variant="outlined" size="medium" fullWidth onClick={() => openSlModal(true)} disabled={isSpecialLifepathsDisabled}>Special Lifepaths</Button>
			</Grid>
			<Grid item xs={4} sm={2} md={1}>
				<Button variant="outlined" size="medium" fullWidth onClick={() => openSuModal(true)} disabled={isSpecialSkillsDisabled}>Special Skills</Button>
			</Grid>
			<Grid item xs={4} sm={2} md={1}>
				<Button variant="outlined" size="medium" fullWidth onClick={() => openSsModal(true)} disabled={isStockSpecificDisabled}>Stock Specific</Button>
			</Grid>
		</GenericGrid>
	);
}
