import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";

import { useCharacterBurnerTraitStore } from "../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerTrait";
import { GenericGrid } from "../../../Shared/Grids";
import { BlockTraitPopover } from "../../CharacterBurner/BlockText";
import { UniqueArrayItem } from "@utility/UniqueArray";


function Trait({ trait, remove }: { trait: UniqueArrayItem<BwgrTraitId, BwgrCharacterTrait>; remove?: (traitId: BwgrTraitId) => void; }) {
	const { openTrait } = useCharacterBurnerTraitStore();

	return (
		<Grid item xs={6} sm={3} md={2}>
			<GenericGrid columns={5} center="h" hasBackground={1}>
				<BlockTraitPopover
					trait={[trait.id, trait.name]}
					checkbox={{ checked: trait.isOpen, disabled: trait.type === "Mandatory" || trait.type === "Common", onClick: () => openTrait(trait.id) }}
					deleteCallback={remove ? () => remove(trait.id) : undefined}
				/>
			</GenericGrid>
		</Grid>
	);
}

function CommonTraitsBlock() {
	const { traits } = useCharacterBurnerTraitStore();

	return (
		<Fragment>
			<Grid item xs={6}>
				<Typography variant="h5" sx={{ margin: "12px 0 0 24px" }}>Common</Typography>
			</Grid>

			<Fragment>
				{traits
					.filter(t => t.type === "Common")
					.map((trait, i) => <Trait key={i} trait={trait} />)}
			</Fragment>
		</Fragment>
	);
}

function MandatoryTraitsBlock() {
	const { traits } = useCharacterBurnerTraitStore();

	return (
		<Fragment>
			<Grid item xs={6}>
				<Typography variant="h5" sx={{ margin: "12px 0 0 24px" }}>Mandatory</Typography>
			</Grid>

			<Fragment>
				{traits
					.filter(t => t.type === "Mandatory")
					.map((trait, i) => <Trait key={i} trait={trait} />)}
			</Fragment>
		</Fragment>
	);
}

function LifepathTraitsBlock() {
	const { traits } = useCharacterBurnerTraitStore();

	return (
		<Fragment>
			<Grid item xs={6}>
				<Typography variant="h5" sx={{ margin: "12px 0 0 24px" }}>Lifepath</Typography>
			</Grid>

			{traits
				.filter(t => t.type === "Lifepath")
				.map((trait, i) => <Trait key={i} trait={trait} />)}
		</Fragment>
	);
}

function GeneralTraitsBlock({ openModal }: { openModal: (name: BwgrCharacterBurnerModals) => void; }) {
	const { traits, removeGeneralTrait } = useCharacterBurnerTraitStore();

	return (
		<Fragment>
			<Grid item xs={6}>
				<Typography variant="h5" sx={{ margin: "12px 0 0 24px" }}>General</Typography>
			</Grid>

			<Fragment>
				{traits
					.filter(t => t.type === "General")
					.map((trait, i) => <Trait key={i} trait={trait} remove={removeGeneralTrait} />)}
			</Fragment>

			<Button variant="outlined" style={{ margin: "10px" }} onClick={() => openModal("geTr")}>Add General Trait</Button>
		</Fragment>
	);
}

export function Traits({ openModal }: { openModal: (name: BwgrCharacterBurnerModals) => void; }): JSX.Element {
	const { traits, getTraitPools } = useCharacterBurnerTraitStore();
	const traitPools = getTraitPools();

	const text = `Trait Points: ${traitPools.total}, Remaining: ${traitPools.remaining}`;

	return (
		<GenericGrid columns={6} center="v" spacing={[0, 2]} extraBottomMargin>
			<Grid item xs={6}>
				<Typography variant="h4">Traits</Typography>
			</Grid>

			<Grid item xs={6} sm={5}>
				<Typography>{text}</Typography>
			</Grid>

			{/*<Grid item xs={6} sm={1}>
				<Button variant="outlined" size="small" onClick={() => setOpen(true)} fullWidth>Add General Trait</Button>
			</Grid>*/}

			{traits.existsAny("type", "Common") > 0 ? <CommonTraitsBlock /> : null}
			{traits.existsAny("type", "Mandatory") > 0 ? <MandatoryTraitsBlock /> : null}
			{traits.existsAny("type", "Lifepath") > 0 ? <LifepathTraitsBlock /> : null}
			<GeneralTraitsBlock openModal={openModal} />
		</GenericGrid>
	);
}
