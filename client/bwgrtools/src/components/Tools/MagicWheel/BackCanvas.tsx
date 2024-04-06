import { createRef, useCallback, useEffect, useState } from "react";

import { MagicWheelConstants } from "../../../hooks/useMagicWheel";
import { THEME } from "../../../theme/theme";


export function BackCanvas({ constants }: { constants: MagicWheelConstants; }): JSX.Element {
	const canvasRef = createRef<HTMLCanvasElement>();
	const [context, setContext] = useState<CanvasRenderingContext2D>();

	const drawCircles = useCallback((): void => {
		if (context) {
			context.fillStyle = THEME.palette.grey[900];

			for (let i = 6; i >= 1; i--) {
				context.beginPath();
				context.arc(constants.canvasSize / 2, constants.canvasSize / 2, constants.circleOffset + (constants.circleRadius * i), 0, 2 * Math.PI);
				context.stroke();
				context.fill();
			}
		}
	}, [context, constants.canvasSize, constants.circleOffset, constants.circleRadius]);

	useEffect(() => {
		if (context) {
			context.clearRect(0, 0, constants.canvasSize, constants.canvasSize);
			drawCircles();
		}
	}, [context, drawCircles, constants.canvasSize]);

	useEffect(() => {
		setContext(canvasRef.current?.getContext("2d") as CanvasRenderingContext2D);
	}, [canvasRef]);

	return (
		<canvas
			ref={canvasRef}
			height={constants.canvasSize}
			width={constants.canvasSize}
			style={{ position: "absolute", left: 0, top: 0, zIndex: 101, width: "100%" }}
		>
			Your browser does not support canvas.
		</canvas>
	);
}
