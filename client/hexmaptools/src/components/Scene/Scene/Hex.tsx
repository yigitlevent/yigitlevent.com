import { Graphics } from "@pixi/react";

import { useHexmapStore } from "../../../hooks/apiStores/useHexmapStore";


export function Hex({ hex }: { hex: HmHex; }): JSX.Element {
	const [map, setHexHover, hexTypes, onHexPointerEvent]
		= useHexmapStore(state => [state.map, state.setHexHover, state.hexTypes, state.onHexPointerEvent]);

	return (
		<Graphics
			eventMode="static"
			draw={(graphics) => {
				const hexType = hexTypes.find(v => v.id === hex.typeId) as HmHexType;
				const stroke = map.settings.hexStrokeStyle;

				graphics.clear();
				graphics.lineStyle(stroke.width, stroke.color, undefined, stroke.alignment);
				graphics.beginFill(hex.state.isHovered ? hexType.fill.hover : hexType.fill.color);
				graphics.drawPolygon(hex.vertices);
				graphics.endFill();
			}}
			pointerdown={(e: PointerEvent) => onHexPointerEvent(e, hex)}
			pointermove={(e: PointerEvent) => onHexPointerEvent(e, hex)}
			onmouseenter={() => setHexHover(hex.id, true)}
			onmouseleave={() => setHexHover(hex.id, false)}
		/>
	);
}
