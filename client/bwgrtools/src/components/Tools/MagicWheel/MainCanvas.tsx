import { createRef, useCallback, useEffect, useState } from "react";

import { useMagicWheelStore } from "../../../hooks/featureStores/useMagicWheelStore";
import { THEME } from "../../../theme/theme";


interface Props {
	currentAngles: number[];
	blockAngle: { [key: string]: number; };
	spellFacets: BwgrSpellFacets;
	getFacetMapping: (type: keyof BwgrSpellFacets) => { bandIndex: number; } & unknown;
}

export function MainCanvas({ currentAngles, blockAngle, spellFacets, getFacetMapping }: Props): JSX.Element {
	const canvasRef = createRef<HTMLCanvasElement>();
	const [context, setContext] = useState<CanvasRenderingContext2D>();
	const mwConstants = useMagicWheelStore().constants;

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
				const key = arrayKey as keyof BwgrSpellFacets;
				const i = getFacetMapping(key).bandIndex;

				for (const stringKey in spellFacets[key]) {
					const length = spellFacets[key][stringKey].name.length;

					const radius = mwConstants.circleRadius * (i + 1) + mwConstants.textOffset;
					const anglePerCharacter = 8 * (1 / radius);

					const stringStartAngle = ((blockAngle[key] - (anglePerCharacter * length)) / 2);
					const blockStartAngle = ((blockAngle[key] * -parseInt(stringKey) - (anglePerCharacter * 2)) / 2);

					context.save();
					context.translate(mwConstants.canvasSize / 2, mwConstants.canvasSize / 2);
					context.rotate(rotationArray[i] + stringStartAngle + blockStartAngle - (blockAngle[key] / 2));

					drawString(spellFacets[key][stringKey].name, radius, anglePerCharacter);

					context.restore();
				}
			}
		}
	}, [context, spellFacets, getFacetMapping, mwConstants.circleRadius, mwConstants.textOffset, mwConstants.canvasSize, blockAngle, drawString]);

	useEffect(() => {
		if (context) {
			context.clearRect(0, 0, mwConstants.canvasSize, mwConstants.canvasSize);
			drawText(currentAngles);
		}
	}, [context, blockAngle, currentAngles, drawText, mwConstants.canvasSize]);

	useEffect(() => {
		setContext(canvasRef.current?.getContext("2d") as CanvasRenderingContext2D);
	}, [canvasRef]);

	return (
		<canvas ref={canvasRef} height={mwConstants.canvasSize} width={mwConstants.canvasSize} style={{ position: "absolute", left: 0, top: 0, zIndex: 102, width: "100%" }}>
			Your browser does not support canvas.
		</canvas>
	);
}
