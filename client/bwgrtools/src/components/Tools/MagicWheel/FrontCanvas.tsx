import { createRef, useEffect, useState } from "react";

import burningwheel from "../../../assets/images/burningwheel.png";
import { MagicWheelConstants } from "../../../hooks/useMagicWheel";


export function FrontCanvas({ constants }: { constants: MagicWheelConstants; }): JSX.Element {
	const canvasRef = createRef<HTMLCanvasElement>();
	const [context, setContext] = useState<CanvasRenderingContext2D>();

	useEffect(() => {
		if (context) {
			context.clearRect(0, 0, constants.canvasSize, constants.canvasSize);

			context.fillStyle = "rgba(10, 0, 0, 0.33)";

			context.beginPath();
			context.moveTo(constants.canvasSize / 2, constants.canvasSize / 2);
			context.arc(constants.canvasSize / 2, constants.canvasSize / 2, constants.circleOffset + (constants.circleRadius * 6), -Math.PI * 7 / 18, Math.PI * 25 / 18);
			context.closePath();
			context.fill();

			context.beginPath();
			context.moveTo(constants.canvasSize / 2, constants.canvasSize / 2);
			context.arc(constants.canvasSize / 2, constants.canvasSize / 2, constants.circleOffset + (constants.circleRadius * 1), Math.PI * 25 / 18, -Math.PI * 7 / 18);
			context.closePath();
			context.fill();

			const img = new Image();
			img.addEventListener("load", () => {
				context.save();
				const xOffset = (constants.canvasSize / 2) - (constants.innerCircleRadius / 2);
				const yOffset = (constants.canvasSize / 2) - (constants.innerCircleRadius / 2);
				context.drawImage(img, xOffset, yOffset, constants.innerCircleRadius, constants.innerCircleRadius);
				context.restore();
			});
			img.src = burningwheel;
		}
	}, [context, constants.canvasSize, constants.innerCircleRadius, constants.circleOffset, constants.circleRadius]);

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
