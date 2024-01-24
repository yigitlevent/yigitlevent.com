import { Graphics, Sprite } from "@pixi/react";
import { Fragment } from "react";

import { useHexmapStore } from "../../../hooks/apiStores/useHexmapStore";
import { useTexturesStore } from "../../../hooks/featureStores/useTextureStore";


export function Hex({ hex }: { hex: HmHex; }): JSX.Element {
	const [textures] = useTexturesStore(state => [state.textures]);
	const [map, setHexHover, hexTypes, onHexPointerEvent]
		= useHexmapStore(state => [state.map, state.setHexHover, state.hexTypes, state.onHexPointerEvent]);

	const hexType = hexTypes[hex.typeId];

	return (
		<Fragment>
			<Graphics
				eventMode="static"
				draw={(graphics) => {
					const stroke = map.settings.hexStrokeStyle;
					graphics.clear();
					graphics.lineStyle(stroke.width, stroke.color, undefined, stroke.alignment);
					graphics.beginFill(hexType.fill.color);
					graphics.drawPolygon(hex.vertices);
					graphics.endFill();
				}}
				pointerdown={(e: PointerEvent) => onHexPointerEvent(e, hex)}
				pointermove={(e: PointerEvent) => onHexPointerEvent(e, hex)}
				onmouseenter={() => setHexHover(hex.id, true)}
				onmouseleave={() => setHexHover(hex.id, false)}
			/>

			{(hexType.texture && textures[hexType.texture]?.valid)
				&& <Sprite
					eventMode="none"
					texture={textures[hexType.texture]}
					anchor={[0.5, 0.5]}
					x={hex.center.x}
					y={hex.center.y}
					width={map.settings.hexRadius * 1.5}
					height={map.settings.hexRadius * 1.5}
				/>}

			{hex.state.isHovered
				&& <Graphics
					eventMode="none"
					draw={(graphics) => {
						graphics.clear();
						graphics.beginFill(hexType.fill.hover);
						graphics.drawPolygon(hex.vertices);
						graphics.endFill();
					}}
				/>}
		</Fragment>
	);
}
