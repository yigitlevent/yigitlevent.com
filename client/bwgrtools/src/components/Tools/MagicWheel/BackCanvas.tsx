import { createRef, useCallback, useEffect, useState } from "react";

import { useMagicWheelStore } from "../../../hooks/featureStores/useMagicWheelStore";
import { THEME } from "../../../theme/theme";


export function BackCanvas(): JSX.Element {
	const canvasRef = createRef<HTMLCanvasElement>();
	const [context, setContext] = useState<CanvasRenderingContext2D>();
	const mwConstants = useMagicWheelStore().constants;

	const drawCircles = useCallback((): void => {
		if (context) {
			context.fillStyle = THEME.palette.grey[900];

			for (let i = 6; i >= 1; i--) {
				context.beginPath();
				context.arc(mwConstants.canvasSize / 2, mwConstants.canvasSize / 2, mwConstants.circleOffset + (mwConstants.circleRadius * i), 0, 2 * Math.PI);
				context.stroke();
				context.fill();
			}
		}
	}, [context, mwConstants.canvasSize, mwConstants.circleOffset, mwConstants.circleRadius]);

	useEffect(() => {
		if (context) {
			context.clearRect(0, 0, mwConstants.canvasSize, mwConstants.canvasSize);
			drawCircles();
		}
	}, [context, drawCircles, mwConstants.canvasSize]);

	useEffect(() => {
		setContext(canvasRef.current?.getContext("2d") as CanvasRenderingContext2D);
	}, [canvasRef]);

	return (
		<canvas
			ref={canvasRef}
			height={mwConstants.canvasSize}
			width={mwConstants.canvasSize}
			style={{ position: "absolute", left: 0, top: 0, zIndex: 101, width: "100%" }}
		>
			Your browser does not support canvas.
		</canvas>
	);
}
