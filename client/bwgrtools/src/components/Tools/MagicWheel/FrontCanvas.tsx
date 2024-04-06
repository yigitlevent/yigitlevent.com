import { createRef, useCallback, useEffect, useState } from "react";

import { MagicWheelConstants } from "../../../hooks/useMagicWheel";
import { THEME } from "../../../theme/theme";


export function FrontCanvas({ show, constants }: { show: boolean; constants: MagicWheelConstants; }): JSX.Element {
	const canvasRef = createRef<HTMLCanvasElement>();
	const [context, setContext] = useState<CanvasRenderingContext2D>();

	const drawAntiWedge = useCallback((): void => {
		if (context) {
			context.fillStyle = THEME.palette.common.black;

			context.beginPath();
			context.moveTo(constants.canvasSize / 2, constants.canvasSize / 2);
			context.arc(constants.canvasSize / 2, constants.canvasSize / 2, constants.circleOffset + (constants.circleRadius * 6), -Math.PI * 7 / 18, Math.PI * 25 / 18);
			context.closePath();
			context.fill();
		}
	}, [constants.canvasSize, constants.circleOffset, constants.circleRadius, context]);

	useEffect(() => {
		if (context) {
			context.clearRect(0, 0, constants.canvasSize, constants.canvasSize);
			if (show) drawAntiWedge();
		}
	}, [context, show, drawAntiWedge, constants.canvasSize]);

	useEffect(() => {
		setContext(canvasRef.current?.getContext("2d") as CanvasRenderingContext2D);
	}, [canvasRef]);

	return (
		<canvas
			ref={canvasRef}
			height={constants.canvasSize}
			width={constants.canvasSize}
			style={{ position: "absolute", left: 0, top: 0, zIndex: 103, width: "100%" }}
		>
			Your browser does not support canvas.
		</canvas>
	);
}
