import { createRef, useCallback, useEffect, useState } from "react";

import { useMagicWheelStore } from "../../../hooks/featureStores/useMagicWheelStore";
import { THEME } from "../../../theme/theme";


export function FrontCanvas({ show }: { show: boolean; }): JSX.Element {
	const canvasRef = createRef<HTMLCanvasElement>();
	const [context, setContext] = useState<CanvasRenderingContext2D>();
	const mwConstants = useMagicWheelStore().constants;

	const drawAntiWedge = useCallback((): void => {
		if (context) {
			context.fillStyle = THEME.palette.common.black;

			context.beginPath();
			context.moveTo(mwConstants.canvasSize / 2, mwConstants.canvasSize / 2);
			context.arc(mwConstants.canvasSize / 2, mwConstants.canvasSize / 2, mwConstants.circleOffset + (mwConstants.circleRadius * 6), -Math.PI * 7 / 18, Math.PI * 25 / 18);
			context.closePath();
			context.fill();
		}
	}, [context, mwConstants.canvasSize, mwConstants.circleOffset, mwConstants.circleRadius]);

	useEffect(() => {
		if (context) {
			context.clearRect(0, 0, mwConstants.canvasSize, mwConstants.canvasSize);
			if (show) drawAntiWedge();
		}
	}, [context, show, drawAntiWedge, mwConstants.canvasSize]);

	useEffect(() => {
		setContext(canvasRef.current?.getContext("2d") as CanvasRenderingContext2D);
	}, [canvasRef]);

	return (
		<canvas
			ref={canvasRef}
			height={mwConstants.canvasSize}
			width={mwConstants.canvasSize}
			style={{ position: "absolute", left: 0, top: 0, zIndex: 103, width: "100%" }}
		>
			Your browser does not support canvas.
		</canvas>
	);
}
