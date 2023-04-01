import { createRef, useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { THEME } from "../../../theme/theme";

import { MWCONST } from "./MagicWheel";


const Canvas = styled.canvas`
	position: absolute;
	left: 0;
	top: 0; 
	z-index: 102;
	width: 100%;
`;

interface Props {
	currentAngles: number[];
	blockAngle: { [key: string]: number; };
	spellFacets: SpellFacets;
	getFacetMapping: (type: keyof SpellFacets) => { bandIndex: number; } & any;
}

export function MainCanvas({ currentAngles, blockAngle, spellFacets, getFacetMapping }: Props): JSX.Element {
	const canvasRef = createRef<HTMLCanvasElement>();
	const [context, setContext] = useState<CanvasRenderingContext2D>();

	const drawString = useCallback((string: string, radius: number, anglePerCharacter: number): void => {
		if (context) {
			for (let i = 0; i < string.length; i++) {
				context.rotate(anglePerCharacter);

				context.save();

				context.translate(0, -1 * radius);
				context.font = "14px 'Code'";
				context.fillStyle = THEME.palette.primary.light;
				context.fillText(string[i].toLowerCase(), 0, 0);

				context.restore();
			}
		}
	}, [context]);

	const drawText = useCallback((rotationArray: number[]): void => {
		if (context) {
			for (const arrayKey in spellFacets) {
				const key = arrayKey as keyof SpellFacets;
				const i = getFacetMapping(key).bandIndex;

				for (const stringKey in spellFacets[key]) {
					const length = spellFacets[key][stringKey].name.length;

					const radius = MWCONST.circleRadius * (i + 1) + MWCONST.textOffset;
					const anglePerCharacter = 8 * (1 / radius);


					const stringStartAngle = ((blockAngle[key] - (anglePerCharacter * length)) / 2);
					const blockStartAngle = ((blockAngle[key] * -parseInt(stringKey) - (anglePerCharacter * 2)) / 2);

					context.save();
					context.translate(MWCONST.canvasSize / 2, MWCONST.canvasSize / 2);
					context.rotate(rotationArray[i] + stringStartAngle + blockStartAngle - (blockAngle[key] / 2));

					drawString(spellFacets[key][stringKey].name, radius, anglePerCharacter);

					context.restore();
				}
			}
		}
	}, [context, spellFacets, getFacetMapping, blockAngle, drawString]);

	useEffect(() => {
		if (context) {
			context.clearRect(0, 0, MWCONST.canvasSize, MWCONST.canvasSize);
			drawText(currentAngles);
		}
	}, [context, blockAngle, currentAngles, drawText]);

	useEffect(() => {
		setContext(canvasRef.current?.getContext("2d") as CanvasRenderingContext2D);
	}, [canvasRef]);

	return (
		<Canvas ref={canvasRef} height={MWCONST.canvasSize} width={MWCONST.canvasSize}>Your browser does not support canvas.</Canvas>
	);
}
