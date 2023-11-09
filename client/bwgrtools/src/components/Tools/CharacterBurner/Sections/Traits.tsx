import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";


import { useCharacterBurnerStore } from "../../../../hooks/featureStores/useCharacterBurnerStore";
import { UniqueArrayItem } from "../../../../utils/uniqueArray";
import { GenericGrid } from "../../../Shared/Grids";
import { BlockTraitPopover } from "../../CharacterBurner/BlockText";


function TraitsList({ trait }: { trait: UniqueArrayItem<TraitId, CharacterTrait>; }) {
	const { openTrait } = useCharacterBurnerStore();

	return (
		<Grid item xs={6} sm={3} md={2}>
			<GenericGrid columns={5} center="h" hasBackground={1}>
				<BlockTraitPopover
					trait={[trait.id, trait.name]}
					checkbox={{
						checked: trait.isOpen,
						disabled: trait.type === "Mandatory" || trait.type === "Common",
						onClick: () => openTrait(trait.id)
					}}
				/>
			</GenericGrid>
		</Grid>
	);
}

function CommonTraitsBlock() {
	const { traits } = useCharacterBurnerStore();

	return (
		<Fragment>
			<Grid item xs={6}>
				<Typography variant="h5" sx={{ margin: "12px 0 0 24px" }}>Common</Typography>
			</Grid>

			<Fragment>
				{traits
					.filter(t => t.type === "Common")
					.map((trait, i) => <TraitsList key={i} trait={trait} />)}
			</Fragment>
		</Fragment>
	);
}

function MandatoryTraitsBlock() {
	const { traits } = useCharacterBurnerStore();

	return (
		<Fragment>
			<Grid item xs={6}>
				<Typography variant="h5" sx={{ margin: "12px 0 0 24px" }}>Mandatory</Typography>
			</Grid>

			<Fragment>
				{traits
					.filter(t => t.type === "Mandatory")
					.map((trait, i) => <TraitsList key={i} trait={trait} />)}
			</Fragment>
		</Fragment>
	);
}

function LifepathTraitsBlock() {
	const { traits } = useCharacterBurnerStore();

	return (
		<Fragment>
			<Grid item xs={6}>
				<Typography variant="h5" sx={{ margin: "12px 0 0 24px" }}>Lifepath</Typography>
			</Grid>

			{traits
				.filter(t => t.type === "Lifepath")
				.map((trait, i) => <TraitsList key={i} trait={trait} />)}
		</Fragment>
	);
}

function GeneralTraitsBlock() {
	const { traits } = useCharacterBurnerStore();

	return (
		<Fragment>
			<Grid item xs={6}>
				<Typography variant="h5" sx={{ margin: "12px 0 0 24px" }}>General</Typography>
			</Grid>

			<Fragment>
				{traits
					.filter(t => t.type === "General")
					.map((trait, i) => <TraitsList key={i} trait={trait} />)}
			</Fragment>
		</Fragment>
	);
}

export function Traits(): JSX.Element {
	const { traits, getTraitPools } = useCharacterBurnerStore();
	const traitPools = getTraitPools();

	const text = `Trait Points: ${traitPools.total}, Remaining: ${traitPools.remaining}`;

	return (
		<GenericGrid columns={6} center="v" spacing={[0, 2]}>
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

			{traits.existsAny("type", "General") > 0 ? <GeneralTraitsBlock /> : null}

			{/*<GeneralTraitModal open={open} setOpen={setOpen} />*/}
		</GenericGrid>
	);
}
