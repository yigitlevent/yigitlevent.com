import { Graphics } from "@pixi/react";

import { useHexmapStore } from "../../../hooks/apiStores/useHexmapStore";


export function Hex({ hex }: { hex: HmHex; }): JSX.Element {
	const [settings, setHexHover, hexTypes, onHexClick, onHexRightClick]
		= useHexmapStore(state => [state.settings, state.setHexHover, state.hexTypes, state.onHexClick, state.onHexRightClick]);

	return (
		<Graphics
			eventMode="static"
			draw={(graphics) => {
				const hexType = hexTypes.find(v => v.id === hex.typeId) as HmHexType;
				const stroke = settings.strokeStyle;

				graphics.clear();
				graphics.lineStyle(stroke.width, stroke.color, undefined, stroke.alignment);
				graphics.beginFill(hex.state.isHovered && (!settings.showHexAreas || !hex.state.isPainted) ? hexType.fill.hover : hexType.fill.color);
				graphics.drawPolygon(hex.vertices);
				graphics.endFill();
			}}
			click={() => onHexClick(hex)}
			rightclick={() => onHexRightClick(hex)}
			onmouseenter={() => setHexHover(hex.id, true)}
			onmouseleave={() => setHexHover(hex.id, false)}
		/>
	);
}
