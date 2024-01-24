import { Text } from "@pixi/react";
import { TextStyle } from "pixi.js";


export function HexName({ hex }: { hex: HmHex; }): JSX.Element {
	return (
		<Text
			text={hex.name}
			anchor={[0.5, 0]}
			x={hex.center.x}
			y={hex.center.y + 10}
			resolution={3}
			roundPixels
			style={
				new TextStyle({
					align: "center",
					fontFamily: "\"Source Sans Pro\"",
					fontSize: 16,
					fontWeight: "400",
					fill: "#ffffff",
					letterSpacing: 2,
					dropShadow: true,
					dropShadowColor: "#000",
					dropShadowAlpha: 1.0,
					dropShadowBlur: 3,
					dropShadowAngle: 0,
					dropShadowDistance: 0,
					stroke: "#000000",
					strokeThickness: 0.5
					//wordWrap: true,
					//wordWrapWidth: 440
				})
			}
		/>
	);

}
