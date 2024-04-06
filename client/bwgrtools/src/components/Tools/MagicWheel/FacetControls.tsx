import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Fragment } from "react";

import { OneOfWheelObjects, OneOfWheelObjectKeys, UseMagicWheelReturn } from "../../../hooks/useMagicWheel";
import { GenericGrid } from "../../Shared/Grids";


interface MagicWheelAltFacetControlsProps<T extends OneOfWheelObjects, P extends OneOfWheelObjectKeys> {
	magicWheel: UseMagicWheelReturn<T, P>;
	spellFacets: T;
	selectedElementCategory?: ElementCategories;
	setSelectedElementCategory?: React.Dispatch<React.SetStateAction<ElementCategories>>;
}

export function FacetControls<T extends OneOfWheelObjects, P extends OneOfWheelObjectKeys>({ magicWheel, spellFacets, selectedElementCategory, setSelectedElementCategory }: MagicWheelAltFacetControlsProps<T, P>): JSX.Element {
	const columnCount = selectedElementCategory ? 6 : 5;

	return (
		<GenericGrid columns={columnCount} center>
			<Grid item xs={columnCount} sm={2} md={1}>
				<FormControl fullWidth variant="standard">
					<InputLabel>Area of Effect</InputLabel>

					<Select
						value={magicWheel.areaOfEffectId}
						onChange={v => magicWheel.setFacet("areaOfEffects" as P, v.target.value as number)}
						disabled={magicWheel.isRotating}
					>
						{Object.values(spellFacets.areaOfEffects).map(v => { return <MenuItem key={v.name} value={v.id as unknown as string}>{v.name}</MenuItem>; })}
					</Select>
				</FormControl>
			</Grid>

			{selectedElementCategory && setSelectedElementCategory && selectedElementCategory in spellFacets
				? <Fragment>
					<Grid item xs={columnCount} sm={2} md={1}>
						<FormControl fullWidth variant="standard">
							<InputLabel>Element Category</InputLabel>

							<Select
								value={selectedElementCategory}
								onChange={v => setSelectedElementCategory(v.target.value as ElementCategories)}
								disabled={magicWheel.isRotating}
							>
								<MenuItem value="primeElements">Prime Elements</MenuItem>
								<MenuItem value="lowerElements">Lower Elements</MenuItem>
								<MenuItem value="higherElements">Higher Elements</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid item xs={columnCount} sm={2} md={1}>
						<FormControl fullWidth variant="standard">
							<InputLabel>{selectedElementCategory === "higherElements" ? "Higher Element" : selectedElementCategory === "lowerElements" ? "Lower Element" : "Prime Element"}</InputLabel>

							<Select
								value={magicWheel.elementId}
								onChange={v => magicWheel.setFacet(selectedElementCategory as P, v.target.value as BwgrElementFacetId)}
								disabled={magicWheel.isRotating}
							>
								{Object.values(spellFacets[selectedElementCategory as keyof OneOfWheelObjects]).map(v => { return <MenuItem key={v.name} value={v.id as unknown as string}>{v.name}</MenuItem>; })}
							</Select>
						</FormControl>
					</Grid>
				</Fragment>
				: <Grid item xs={columnCount} sm={2} md={1}>
					<FormControl fullWidth variant="standard">
						<InputLabel>Element</InputLabel>

						<Select
							value={magicWheel.elementId}
							onChange={v => magicWheel.setFacet("elements" as P, v.target.value as number)}
							disabled={magicWheel.isRotating}
						>
							{Object.values(spellFacets["elements" as keyof OneOfWheelObjects]).map(v => { return <MenuItem key={v.name} value={v.id as unknown as string}>{v.name}</MenuItem>; })}
						</Select>
					</FormControl>
				</Grid>}


			<Grid item xs={columnCount} sm={2} md={1}>
				<FormControl fullWidth variant="standard">
					<InputLabel>Law</InputLabel>

					<Select
						value={magicWheel.impetusId}
						onChange={v => magicWheel.setFacet("impetus" as P, v.target.value as BwgrImpetusFacetId)}
						disabled={magicWheel.isRotating}
					>
						{Object.values(spellFacets.impetus).map(v => { return <MenuItem key={v.name} value={v.id as unknown as string}>{v.name}</MenuItem>; })}
					</Select>
				</FormControl>
			</Grid>

			<Grid item xs={columnCount} sm={2} md={1}>
				<FormControl fullWidth variant="standard">
					<InputLabel>Duration</InputLabel>

					<Select
						value={magicWheel.durationId}
						onChange={v => magicWheel.setFacet("duration" as P, v.target.value as BwgrDurationFacetId)}
						disabled={magicWheel.isRotating}
					>
						{Object.values(spellFacets.duration).map(v => { return <MenuItem key={v.name} value={v.id as unknown as string}>{v.name}</MenuItem>; })}
					</Select>
				</FormControl>
			</Grid>

			<Grid item xs={columnCount} sm={2} md={1}>
				<FormControl fullWidth variant="standard">
					<InputLabel>Origin</InputLabel>

					<Select
						value={magicWheel.originId}
						onChange={v => magicWheel.setFacet("origins" as P, v.target.value as BwgrOriginFacetId)}
						disabled={magicWheel.isRotating}
					>
						{Object.values(spellFacets.origins).map(v => { return <MenuItem key={v.name} value={v.id as unknown as string}>{v.name}</MenuItem>; })}
					</Select>
				</FormControl>
			</Grid>
		</GenericGrid>
	);
}
