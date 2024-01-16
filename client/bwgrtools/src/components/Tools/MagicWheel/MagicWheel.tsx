import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { createRef, Fragment, useCallback, useEffect, useState } from "react";

import { BackCanvas } from "./BackCanvas";
import { FrontCanvas } from "./FrontCanvas";
import { MainCanvas } from "./MainCanvas";
import codeFont from "../../../assets/fonts/SourceCodePro-SemiBold.woff";
import { useRulesetStore } from "../../../hooks/apiStores/useRulesetStore";
import { useMagicWheelStore } from "../../../hooks/featureStores/useMagicWheelStore";
import { useFontLoading } from "../../../hooks/useFontLoading";
import { GenericGrid } from "../../Shared/Grids";
import { RandomNumber } from "@utility/RandomNumber";


export function MagicWheel(): JSX.Element {
	const { isFontLoaded } = useFontLoading(codeFont);

	const wrapperRef = createRef<HTMLDivElement>();
	const [size, setSize] = useState("0px");

	useEffect(() => {
		if (wrapperRef && wrapperRef.current) setSize(window.getComputedStyle(wrapperRef.current).width);
	}, [wrapperRef]);

	const { spellFacets } = useRulesetStore();

	const {
		areaOfEffectId, elementId, impetusId, durationId, originId, direction, steps, cover,
		changeAOE, changeElement, changeImpetus, changeDuration, changeOrigin, changeDirection, changeSteps, toggleCover
	} = useMagicWheelStore();

	const [currentOriginAngle, setCurrentOriginAngle] = useState(0);
	const [currentDurationAngle, setCurrentDurationAngle] = useState(0);
	const [currentImpetusAngle, setCurrentImpetusAngle] = useState(0);
	const [currentElementAngle, setCurrentElementAngle] = useState(0);
	const [currentAOEAngle, setCurrentAOEAngle] = useState(0);

	const [isRotating, setIsRotating] = useState(0);
	const [entryAngleSpan, setEntryAngleSpan] = useState<{ [key: string]: number; }>({ origins: 0, elements: 0, impetus: 0, areaOfEffects: 0, durations: 0 });

	const updateFacets = useCallback((amount: number) => {
		for (const key in spellFacets) {
			const facetKey = key as keyof BwgrSpellFacets;

			let currentIndex = -1;

			if (facetKey === "origins") currentIndex = spellFacets[facetKey].findIndex(v => v.id === originId);
			else if (facetKey === "elements") currentIndex = spellFacets[facetKey].findIndex(v => v.id === elementId);
			else if (facetKey === "impetus") currentIndex = spellFacets[facetKey].findIndex(v => v.id === impetusId);
			else if (facetKey === "areaOfEffects") currentIndex = spellFacets[facetKey].findIndex(v => v.id === areaOfEffectId);
			else if (facetKey === "duration") currentIndex = spellFacets[facetKey].findIndex(v => v.id === durationId);

			if (currentIndex > -1) {
				let newIndex = currentIndex + amount;
				if (newIndex > spellFacets[facetKey].length - 1) { newIndex = newIndex % spellFacets[facetKey].length; }
				else if (newIndex < 0) { newIndex = (newIndex % spellFacets[facetKey].length + spellFacets[facetKey].length) % spellFacets[facetKey].length; }

				if (facetKey === "origins") changeOrigin(spellFacets[facetKey][newIndex].id);
				else if (facetKey === "elements") changeElement(spellFacets[facetKey][newIndex].id);
				else if (facetKey === "impetus") changeImpetus(spellFacets[facetKey][newIndex].id);
				else if (facetKey === "areaOfEffects") changeAOE(spellFacets[facetKey][newIndex].id);
				else if (facetKey === "duration") changeDuration(spellFacets[facetKey][newIndex].id);
			}
		}
	}, [originId, durationId, impetusId, elementId, areaOfEffectId, changeOrigin, changeDuration, changeImpetus, changeElement, changeAOE, spellFacets]);

	const getFacetMapping = useCallback((type: keyof BwgrSpellFacets) => {
		switch (type) {
			case "areaOfEffects":
				return { bandIndex: 4, currentAngle: currentAOEAngle, setFunction: setCurrentAOEAngle, setStoreFunction: changeAOE };
			case "elements":
				return { bandIndex: 3, currentAngle: currentElementAngle, setFunction: setCurrentElementAngle, setStoreFunction: changeElement };
			case "impetus":
				return { bandIndex: 2, currentAngle: currentImpetusAngle, setFunction: setCurrentImpetusAngle, setStoreFunction: changeImpetus };
			case "duration":
				return { bandIndex: 1, currentAngle: currentDurationAngle, setFunction: setCurrentDurationAngle, setStoreFunction: changeDuration };
			case "origins":
				return { bandIndex: 0, currentAngle: currentOriginAngle, setFunction: setCurrentOriginAngle, setStoreFunction: changeOrigin };
			default:
				throw "Facet type invalid.";
		}
	}, [currentAOEAngle, currentDurationAngle, currentElementAngle, currentImpetusAngle, currentOriginAngle, changeAOE, changeDuration, changeElement, changeImpetus, changeOrigin]);

	const setFacet = useCallback((type: keyof BwgrSpellFacets, event: SelectChangeEvent<string>) => {
		const value = event.target.value; // id of the specific facet

		const { setFunction, setStoreFunction } = getFacetMapping(type);

		const getStartAngle = () => {
			const selectionIndex = spellFacets[type].findIndex(v => (v.id as unknown as string) === value);
			if (selectionIndex > -1) return (entryAngleSpan[type] / 2) * selectionIndex;
			throw "Facet not found.";
		};

		setFunction(getStartAngle());
		const func = setStoreFunction;
		func(value as never);
	}, [getFacetMapping, spellFacets, entryAngleSpan]);

	const rotateBand = useCallback((amount: number, type: keyof BwgrSpellFacets) => {
		const { currentAngle, setFunction } = getFacetMapping(type);

		const targetRotation = currentAngle + (amount * (entryAngleSpan[type] / 2));
		let intermediateRotation = currentAngle;

		let animationFrame = 0;
		let skip = true;
		let done = false;

		const step = () => {
			skip = !skip;

			const tempVal = (intermediateRotation + (0.05 * amount));
			intermediateRotation = ((amount > 0 && tempVal >= targetRotation) || (amount < 0 && tempVal <= targetRotation))
				? targetRotation
				: tempVal;

			if (!skip) {
				setFunction(intermediateRotation);
				if ((amount > 0 && intermediateRotation >= targetRotation) || (amount < 0 && intermediateRotation <= targetRotation)) done = true;
			}

			if (done) {
				cancelAnimationFrame(animationFrame);
				setIsRotating(v => v - 1);
			}
			else animationFrame = requestAnimationFrame(step);
		};

		animationFrame = requestAnimationFrame(step);
	}, [entryAngleSpan, getFacetMapping]);

	const rotate = useCallback((amount: number) => {
		updateFacets(amount);
		setIsRotating(5);
		const facetTypes = Object.keys(spellFacets) as (keyof BwgrSpellFacets)[];
		facetTypes.forEach(type => rotateBand(amount, type));
	}, [rotateBand, spellFacets, updateFacets]);

	const resetStartingFacets = useCallback((facets: BwgrSpellFacets) => {
		changeAOE(facets.areaOfEffects[0].id);
		changeElement(facets.elements[0].id);
		changeImpetus(facets.impetus[0].id);
		changeDuration(facets.duration[0].id);
		changeOrigin(facets.origins[0].id);
	}, [changeAOE, changeDuration, changeElement, changeImpetus, changeOrigin]);

	const resetCurrentAngles = useCallback(() => {
		setCurrentOriginAngle(0);
		setCurrentDurationAngle(0);
		setCurrentImpetusAngle(0);
		setCurrentElementAngle(0);
		setCurrentAOEAngle(0);
	}, []);

	useEffect(() => {
		resetStartingFacets(spellFacets);
		resetCurrentAngles();
	}, [resetCurrentAngles, resetStartingFacets, spellFacets]);

	useEffect(() => {
		const tempArr: { [key: string]: number; } = { origins: 0, elements: 0, impetus: 0, areaOfEffects: 0, durations: 0 };
		for (const arrayKey in spellFacets) {
			const key = arrayKey as keyof BwgrSpellFacets;
			tempArr[arrayKey] = 4 * Math.PI / spellFacets[key].length;
		}
		setEntryAngleSpan(tempArr);
	}, [areaOfEffectId, elementId, impetusId, durationId, originId, spellFacets]);

	return (
		<Fragment>
			<Typography variant="h3">Magic Wheel</Typography>

			<GenericGrid columns={5} center>
				<Grid item xs={5} sm={2} md={1}>
					<FormControl fullWidth variant="standard">
						<InputLabel>Area of Effect</InputLabel>

						<Select
							label="Area of Effect"
							name="Area of Effect"
							value={isRotating > 0 ? "" : areaOfEffectId as unknown as string}
							onChange={v => setFacet("areaOfEffects", v)}
							disabled={isRotating > 0}
						>
							{Object.values(spellFacets.areaOfEffects).map(v => { return <MenuItem key={v.name} value={v.id as unknown as string}>{v.name}</MenuItem>; })}
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={5} sm={2} md={1}>
					<FormControl fullWidth variant="standard">
						<InputLabel>Element</InputLabel>

						<Select
							label="Element"
							name="Element"
							value={isRotating > 0 ? "" : elementId as unknown as string}
							onChange={v => setFacet("elements", v)}
							disabled={isRotating > 0}
						>
							{Object.values(spellFacets.elements).map(v => { return <MenuItem key={v.name} value={v.id as unknown as string}>{v.name}</MenuItem>; })}
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={5} sm={2} md={1}>
					<FormControl fullWidth variant="standard">
						<InputLabel>Impetus</InputLabel>

						<Select
							label="Impetus"
							name="Impetus"
							value={isRotating > 0 ? "" : impetusId as unknown as string}
							onChange={v => setFacet("impetus", v)}
							disabled={isRotating > 0}
						>
							{Object.values(spellFacets.impetus).map(v => { return <MenuItem key={v.name} value={v.id as unknown as string}>{v.name}</MenuItem>; })}
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={5} sm={2} md={1}>
					<FormControl fullWidth variant="standard">
						<InputLabel>Duration</InputLabel>

						<Select
							label="Duration"
							name="Duration"
							value={isRotating > 0 ? "" : durationId as unknown as string}
							onChange={v => setFacet("duration", v)}
							disabled={isRotating > 0}
						>
							{Object.values(spellFacets.duration).map(v => { return <MenuItem key={v.name} value={v.id as unknown as string}>{v.name}</MenuItem>; })}
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={5} sm={2} md={1}>
					<FormControl fullWidth variant="standard">
						<InputLabel>Origin</InputLabel>

						<Select
							label="Origin"
							name="Origin"
							value={isRotating > 0 ? "" : originId as unknown as string}
							onChange={v => setFacet("origins", v)}
							disabled={isRotating > 0}
						>
							{Object.values(spellFacets.origins).map(v => { return <MenuItem key={v.name} value={v.id as unknown as string}>{v.name}</MenuItem>; })}
						</Select>
					</FormControl>
				</Grid>
			</GenericGrid>

			<Divider sx={{ margin: "10px 0 10px" }} />

			<Button
				variant="outlined"
				disabled={isRotating > 0}
				onClick={() => rotate(((Math.random() > 0.5) ? 1 : -1) * RandomNumber(1, 6))}
				fullWidth
			>
				Pray to the Lady Luck
			</Button>

			<Divider sx={{ margin: "2px 0 -8px" }}>
				<Typography>OR</Typography>
			</Divider>

			<GenericGrid columns={2} center>
				<Grid item xs={2} sm={1}>
					<FormControl fullWidth variant="standard">
						<InputLabel>Direction</InputLabel>

						<Select label="Direction" value={direction} onChange={e => changeDirection(e.target.value)} disabled={isRotating > 0}>
							<MenuItem value={"Clockwise"}>Clockwise</MenuItem>
							<MenuItem value={"Counterclockwise"}>Counterclockwise</MenuItem>
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={2} sm={1}>
					<TextField
						label="Steps"
						inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
						value={steps}
						onChange={(e) => changeSteps(e.target.value)}
						fullWidth
						disabled={isRotating > 0}
						variant="standard"
					/>
				</Grid>

				<Grid item xs={2}>
					<Button
						variant="outlined"
						disabled={isRotating > 0}
						onClick={() => { if (!isRotating) rotate((direction === "Clockwise" ? 1 : 0) * steps); }}
						fullWidth
					>
						Turn the Wheel
					</Button>
				</Grid>
			</GenericGrid>

			<Divider sx={{ margin: "10px 0 8px" }} />

			{isFontLoaded
				? <GenericGrid columns={1} center="c">
					<Grid item xs={1}>
						<div
							ref={wrapperRef}
							style={{
								maxWidth: "100%",
								width: (size === "0px") ? "580px" : size,
								height: (size === "0px") ? "580px" : size,
								position: "relative",
								margin: "0 auto",
								zIndex: 100
							}}
						>
							<BackCanvas />

							<MainCanvas
								currentAngles={[currentOriginAngle, currentDurationAngle, currentImpetusAngle, currentElementAngle, currentAOEAngle]}
								blockAngle={entryAngleSpan}
								spellFacets={spellFacets}
								getFacetMapping={getFacetMapping}
							/>

							<FrontCanvas show={cover} />
						</div>
					</Grid>

					<Grid item>
						<FormControlLabel
							label="Toggle Cover"
							labelPlacement="start"
							control={<Checkbox checked={cover} onChange={toggleCover} />}
						/>
					</Grid>
				</GenericGrid>
				: <CircularProgress />}
		</Fragment>
	);
}
