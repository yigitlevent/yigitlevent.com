import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { GroupBy } from "@utility/GroupBy";
import { createRef, Fragment, useEffect, useState } from "react";

import { BackCanvas } from "./BackCanvas";
import { FacetControls } from "./FacetControls";
import { FrontCanvas } from "./FrontCanvas";
import codeFont from "../../../assets/fonts/SourceCodePro-SemiBold.woff";
import { useRulesetStore } from "../../../hooks/apiStores/useRulesetStore";
import { useFontLoading } from "../../../hooks/useFontLoading";
import { BandBlock, useMagicWheel } from "../../../hooks/useMagicWheel";
import { GenericGrid } from "../../Shared/Grids";


export function MagicWheelAlt(): JSX.Element {
	const { isFontLoaded } = useFontLoading(codeFont);

	const wrapperRef = createRef<HTMLDivElement>();
	const canvasRef = createRef<HTMLCanvasElement>();
	const [size, setSize] = useState("0px");
	const [context, setContext] = useState<CanvasRenderingContext2D>();

	const [selectedElementCategory, setSelectedElementCategory] = useState<ElementCategories>("primeElements");

	const { spellAltFacets } = useRulesetStore();

	const altDurationFacets = GroupBy(spellAltFacets.duration, v => v.name);
	const altAreaOfEffectFacets = GroupBy(spellAltFacets.areaOfEffects, v => v.name);
	const [spellFacets] = useState<BwgrAltSpellFacets>({
		lowerElements: spellAltFacets.lowerElements,
		primeElements: spellAltFacets.primeElements,
		higherElements: spellAltFacets.higherElements,
		areaOfEffects:
			Object.keys(altAreaOfEffectFacets)
				.map(key => {
					return {
						...altAreaOfEffectFacets[key][0]
					};
				}),
		origins: spellAltFacets.origins,
		impetus: spellAltFacets.impetus,
		duration:
			Object.keys(altDurationFacets)
				.map(key => {
					return {
						...altDurationFacets[key][0]
					};
				})
	});

	const [bands, setBands]
		= useState<Record<keyof BwgrAltSpellFacets, BandBlock>>({
			origins: { index: 0, angle: 2 * Math.PI / spellFacets.origins.length, currentAmount: 0, targetAmount: 0, items: spellFacets.origins.map(v => v.name) },
			duration: { index: 1, angle: 2 * Math.PI / spellFacets.duration.length, currentAmount: 0, targetAmount: 0, items: spellFacets.duration.map(v => v.name) },
			impetus: { index: 2, angle: 2 * Math.PI / spellFacets.impetus.length, currentAmount: 0, targetAmount: 0, items: spellFacets.impetus.map(v => v.name) },
			primeElements: { index: 3, angle: 2 * Math.PI / spellFacets.primeElements.length, currentAmount: 0, targetAmount: 0, items: spellFacets.primeElements.map(v => v.name) },
			lowerElements: { index: 3, angle: 2 * Math.PI / spellFacets.lowerElements.length, currentAmount: 0, targetAmount: 0, items: spellFacets.lowerElements.map(v => v.name) },
			higherElements: { index: 3, angle: 2 * Math.PI / spellFacets.higherElements.length, currentAmount: 0, targetAmount: 0, items: spellFacets.higherElements.map(v => v.name) },
			areaOfEffects: { index: 4, angle: 2 * Math.PI / spellFacets.areaOfEffects.length, currentAmount: 0, targetAmount: 0, items: spellFacets.areaOfEffects.map(v => v.name) }
		});

	const magicWheel = useMagicWheel<BwgrAltSpellFacets, keyof BwgrAltSpellFacets>({ spellFacets, bands, context, selectedElementCategory, setBands, isAvailable: key => !key.toLowerCase().includes("element") || selectedElementCategory === key });

	useEffect(() => {
		if (wrapperRef && wrapperRef.current) setSize(window.getComputedStyle(wrapperRef.current).width);
	}, [wrapperRef]);

	useEffect(() => {
		setContext(canvasRef.current?.getContext("2d") as CanvasRenderingContext2D);
	}, [canvasRef]);

	return (
		<Fragment>
			<Typography variant="h3">Magic Wheel</Typography>

			{!magicWheel.facetsSet
				? <FacetControls
					magicWheel={magicWheel}
					spellFacets={spellFacets}
					setFacetsSet={magicWheel.setFacetsSet}
					selectedElementCategory={selectedElementCategory}
					setSelectedElementCategory={setSelectedElementCategory}
				/>
				: isFontLoaded
					? <GenericGrid columns={1} center="c">
						{magicWheel.prayed
							? <Button
								variant="outlined"
								disabled={magicWheel.isRotating}
								onClick={() => magicWheel.reset()}
								fullWidth
							>
								Try again
							</Button>
							: <Button
								variant="outlined"
								disabled={magicWheel.isRotating}
								onClick={() => magicWheel.setTargetAmounts()}
								fullWidth
							>
								Pray to the Lady Luck
							</Button>}

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
								<BackCanvas constants={magicWheel.constants} />

								<canvas ref={canvasRef} height={magicWheel.constants.canvasSize} width={magicWheel.constants.canvasSize} style={{ position: "absolute", left: 0, top: 0, zIndex: 102, width: "100%" }}>
									Your browser does not support canvas.
								</canvas>

								<FrontCanvas constants={magicWheel.constants} />
							</div>
						</Grid>
					</GenericGrid>
					: <CircularProgress />}
		</Fragment>
	);
}
