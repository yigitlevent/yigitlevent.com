import { RandomNumber } from "@utility/RandomNumber";
import { useCallback, useEffect, useState } from "react";

import { THEME } from "../theme/theme";
import { GetWrapAroundIndex } from "../utils/GetWrapAroundIndex";


export interface BandBlock {
	index: number;
	angle: number;
	currentAmount: number;
	targetAmount: number;
	items: string[];
}

export interface MagicWheelConstants {
	canvasSize: number;
	circleRadius: number;
	circleOffset: number;
	textOffset: number;
	rotationSpeed: number;
}

export type OneOfWheelObjects = BwgrSpellFacets | BwgrAltSpellFacets;
export type OneOfWheelObjectKeys = keyof BwgrSpellFacets | keyof BwgrAltSpellFacets;

interface UseMagicWheelProps<T extends OneOfWheelObjects, P extends OneOfWheelObjectKeys> {
	spellFacets: T;
	bands: Record<P, BandBlock>;
	context: CanvasRenderingContext2D | undefined;
	selectedElementCategory?: ElementCategories;
	isAvailable: (key: string) => boolean;
	setBands: React.Dispatch<React.SetStateAction<Record<P, BandBlock>>>;
}

export interface UseMagicWheelReturn<T extends OneOfWheelObjects, P extends OneOfWheelObjectKeys> {
	constants: MagicWheelConstants;
	isRotating: boolean;
	cover: boolean;
	elementId: BwgrElementFacetId;
	impetusId: BwgrImpetusFacetId;
	durationId: BwgrDurationFacetId;
	originId: BwgrOriginFacetId;
	areaOfEffectId: BwgrAreaOfEffectFacetId;
	setTargetAmounts: (steps?: number, direction?: number) => void;
	setIsRotating: (rotating: boolean, resetAll: boolean, bands?: Record<P, BandBlock>, facets?: T) => void;
	setCover: React.Dispatch<React.SetStateAction<boolean>>;
	setFacet: (facet: P, value: number) => void;
	setForceRedraw: React.Dispatch<React.SetStateAction<ElementCategories | undefined>>;
}

export function useMagicWheel<T extends OneOfWheelObjects, P extends OneOfWheelObjectKeys>({ spellFacets, bands, context, selectedElementCategory, isAvailable, setBands }: UseMagicWheelProps<T, P>): UseMagicWheelReturn<T, P> {
	const [constants] = useState<MagicWheelConstants>({ canvasSize: 580, circleRadius: 32, circleOffset: 90, textOffset: 100, rotationSpeed: 0.04 });
	const [isRotating, updateIsRotating] = useState(false);
	const [forceRedraw, setForceRedraw] = useState<ElementCategories>();
	const [cover, setCover] = useState(false);

	const [elementId, setElementId] = useState(0 as BwgrElementFacetId);
	const [impetusId, setImpetusId] = useState(0 as BwgrImpetusFacetId);
	const [durationId, setDurationId] = useState(0 as BwgrDurationFacetId);
	const [originId, setOriginId] = useState(0 as BwgrOriginFacetId);
	const [areaOfEffectId, setAreaOfEffectId] = useState(0 as BwgrAreaOfEffectFacetId);

	const getNewId = (currentAmount: number, itemCount: number) => GetWrapAroundIndex(currentAmount, itemCount);

	const setFacet = useCallback((facet: P, value?: number) => {
		const horrible = spellFacets[facet as keyof T] as (unknown & { id: P; })[];
		const facetIndex = horrible.findIndex(v => (v.id as unknown as number) === value);
		const hasValue = value !== undefined;

		if (facetIndex > -1) {
			setBands((prevBands) => ({ ...prevBands, [facet]: { ...prevBands[facet], targetAmount: -facetIndex } }));

			switch (facet) {
				case "areaOfEffects":
					setAreaOfEffectId((hasValue ? value : 0) as BwgrAreaOfEffectFacetId);
					break;
				case "duration":
					setDurationId((hasValue ? value : 0) as BwgrDurationFacetId);
					break;
				case "impetus":
					setImpetusId((hasValue ? value : 0) as BwgrImpetusFacetId);
					break;
				case "origins":
					setOriginId((hasValue ? value : 0) as BwgrOriginFacetId);
					break;
				case "elements":
				case "primeElements":
				case "lowerElements":
				case "higherElements":
					if (facet === selectedElementCategory) setElementId((hasValue ? value : 0) as BwgrElementFacetId);
					break;
			}
		}
	}, [selectedElementCategory, setBands, spellFacets]);

	const setFacetsAfterRotation = useCallback((facets: T, resetAll: boolean) => {
		(Object.keys(bands) as P[]).forEach(key => {
			const band = bands[key];
			setFacet(key, !resetAll ? getNewId(band.currentAmount, facets[key as keyof OneOfWheelObjects].length) : undefined);
		});
	}, [bands, setFacet]);

	const setIsRotating = useCallback((rotating: boolean, resetAll: boolean, bands?: Record<P, BandBlock>, facets?: T) => {
		updateIsRotating(rotating);
		if (bands && facets && !rotating) setFacetsAfterRotation(facets, resetAll);
	}, [setFacetsAfterRotation]);

	const rotateBand = useCallback((context: CanvasRenderingContext2D, bands: Record<P, BandBlock>): void => {
		for (const key in bands) {
			const band = bands[key as P];

			if (isAvailable(key)) {
				const bandIndex = band.index;

				const distancePerCharacter = constants.circleRadius * (bandIndex + 1) + constants.textOffset;
				const anglePerCharacter = 8 * (1 / distancePerCharacter);

				const textStartAngles = band.items.map<[string, number]>((name, itemIndex) => {
					const initialStart = band.currentAmount * band.angle;
					const itemMargin = itemIndex * band.angle;
					const halfBack = anglePerCharacter + ((anglePerCharacter * name.length) / 2);
					return [name, (initialStart + itemMargin - halfBack)];
				});

				textStartAngles.forEach(([name, startAngle]) => {
					context.save();
					context.translate(constants.canvasSize / 2, constants.canvasSize / 2);
					context.rotate(startAngle);

					for (let i = 0; i < name.length; i++) {
						context.rotate(anglePerCharacter);
						context.save();
						context.translate(0, -1 * distancePerCharacter);
						context.font = "14px 'Code'";
						context.fillStyle = THEME.palette.primary.light;
						context.fillText(name[i].toLowerCase(), 0, 0);
						context.restore();
					}

					context.restore();
				});

				if (band.currentAmount.toFixed(1) === band.targetAmount.toFixed(1)) setBands((prevBands) => ({ ...prevBands, [key]: { ...band, currentAmount: band.targetAmount } }));
				else if (band.currentAmount < band.targetAmount) setBands((prevBands) => ({ ...prevBands, [key]: { ...band, currentAmount: band.currentAmount + constants.rotationSpeed } }));
				else if (band.currentAmount > band.targetAmount) setBands((prevBands) => ({ ...prevBands, [key]: { ...band, currentAmount: band.currentAmount - constants.rotationSpeed } }));
				else setBands((prevBands) => ({ ...prevBands, [key]: { ...band, currentAmount: band.targetAmount } }));
			}
		}

		if (isRotating && Object.values<BandBlock>(bands).every((band) => band.currentAmount === band.targetAmount)) setIsRotating(false, false, bands, spellFacets);
	}, [isRotating, setIsRotating, spellFacets, isAvailable, constants.circleRadius, constants.textOffset, constants.canvasSize, constants.rotationSpeed, setBands]);

	const setTargetAmounts = useCallback((steps?: number, direction?: number) => {
		setIsRotating(true, false);

		const getRandomRotation = () =>
			steps && direction
				? steps * direction
				: ((Math.random() > 0.5) ? 1 : -1) * RandomNumber(1, 6);

		const getTarget = (band: BandBlock) => {
			const rand = getRandomRotation();
			return band.targetAmount + rand;
		};

		const revisedBands
			= Object.entries<BandBlock>(bands).reduce<Record<P, BandBlock>>((acc, [key, band]) => {
				if (!isAvailable(key)) acc[key as P] = { ...band, targetAmount: band.currentAmount };
				else acc[key as P] = { ...band, targetAmount: getTarget(band) };
				return acc;
			}, {} as Record<P, BandBlock>);

		setBands(revisedBands);
	}, [bands, isAvailable, setBands, setIsRotating]);

	const resetStartingFacets = useCallback((facets: BwgrSpellFacets | BwgrAltSpellFacets) => {
		setAreaOfEffectId(facets.areaOfEffects[0].id);
		if ("elements" in facets) setElementId(facets.elements[0].id);
		else if (selectedElementCategory) setElementId(facets[selectedElementCategory][0].id);
		setImpetusId(facets.impetus[0].id);
		setDurationId(facets.duration[0].id);
		setOriginId(facets.origins[0].id);
	}, [selectedElementCategory]);

	useEffect(() => {
		resetStartingFacets(spellFacets);
	}, [resetStartingFacets, spellFacets]);

	useEffect(() => {
		if (context && isRotating) {
			context.clearRect(0, 0, constants.canvasSize, constants.canvasSize);
			rotateBand(context, bands);
		}
	}, [bands, constants.canvasSize, context, forceRedraw, isRotating, rotateBand, selectedElementCategory]);

	useEffect(() => {
		if (forceRedraw !== selectedElementCategory) {
			resetStartingFacets(spellFacets);
			setIsRotating(true, true);
			setForceRedraw(selectedElementCategory);
		}
	}, [forceRedraw, resetStartingFacets, selectedElementCategory, setIsRotating, spellFacets]);

	return {
		constants,
		isRotating,
		cover,
		elementId,
		impetusId,
		durationId,
		originId,
		areaOfEffectId,
		setTargetAmounts,
		setIsRotating,
		setCover,
		setFacet,
		setForceRedraw
	};
}
