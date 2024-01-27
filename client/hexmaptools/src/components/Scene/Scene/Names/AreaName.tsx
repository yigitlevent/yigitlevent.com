import { Text } from "@pixi/react";
import { TextStyle } from "pixi.js";


export function AreaName({ area }: { area: HmArea; }): JSX.Element {
	return (
		<Text
			text={area.name}
			anchor={[0.5, 0.5]}
			x={area.coordinates.center.x}
			y={area.coordinates.center.y}
			resolution={3}
			roundPixels
			alpha={0.75}
			style={
				new TextStyle({
					align: "center",
					fontFamily: "\"Alegreya\"",
					fontSize: 20,
					fontWeight: "400",
					fill: "#ffffff",
					letterSpacing: 2,
					dropShadow: true,
					dropShadowColor: "#000000",
					dropShadowAlpha: 1.0,
					dropShadowBlur: 3,
					dropShadowAngle: 0,
					dropShadowDistance: 0,
					strokeThickness: 0.5
				})
			}
		/>
	);

}
