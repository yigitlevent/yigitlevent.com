import Typography from "@mui/material/Typography";
import { Fragment, useState } from "react";


import { LifepathModal } from "./Modals/LifepathModal";


export function CharacterBurner(): JSX.Element {
	//const { totals } = useCharacterBurnerStore();

	const [openLp, openLpModal] = useState(false);

	return (
		<Fragment>
			<Typography variant="h3">Character Burner</Typography>
			<LifepathModal openLp={openLp} openLpModal={openLpModal} />
			{/*
			<RandomLifepathsModal openRl={openRl} openRlModal={openRlModal} />
			<QuestionModal openQu={openQu} openQuModal={openQuModal} />
			<SpecialLifepathsModal openSl={openSl} openSlModal={openSlModal} />
			<SpecialSkillsModal openSu={openSu} openSuModal={openSuModal} />
			<ResourceModal openRe={openRe} openReModal={openReModal} />
			<StockSpecificModal openSs={openSs} openSsModal={openSsModal} />

			<BasicsBlock />
			<BlockDivider />
			<BeliefsBlock />
			<BlockDivider />
			<InstinctsBlock />
			<BlockDivider />
			<LifepathsBlock openLpModal={openLpModal} openRlModal={openRlModal} openQuModal={openQuModal} openSlModal={openSlModal} openSuModal={openSuModal} openSsModal={openSsModal} />
			*/}

			{/*totals.years.points > 0
				? <Fragment>
					<BlockDivider />
					<StatsBlock />
					<BlockDivider />
					<AttributesBlock />
					<BlockDivider />
					<TolerancesBlock />
					<BlockDivider />
					<SkillsBlock />
					<BlockDivider />
					<TraitsBlock />
					<BlockDivider />
					<ResourcesBlock openReModal={openReModal} />
				</Fragment>
				: null
			*/}
		</Fragment>
	);
}
