import { Graphics } from "@pixi/react";

import { useHexmapStore } from "../../../../hooks/apiStores/useHexmapStore";
import { useToolsStore } from "../../../../hooks/featureStores/useToolsStore";


export function HexShape({ hex }: { hex: HmHex; }): JSX.Element {
	const [selectedTool] = useToolsStore(state => [state.selectedTool]);
	const [map, setHexHover, onHexPointerEvent] = useHexmapStore(state => [state.map, state.setHexHover, state.onHexPointerEvent]);

	return (
		<Graphics
			eventMode={selectedTool === "Hex Paint" ? "static" : "none"}
			draw={(graphics) => {
				const stroke = map.settings.hexStrokeStyle;
				const fill = map.settings.fill;

				graphics.clear();
				graphics.lineStyle(stroke.width, stroke.color, undefined, stroke.alignment);
				graphics.beginFill(hex.state.isHovered ? fill.hover : fill.color);
				graphics.drawPolygon(hex.coordinates.vertices);
				graphics.endFill();
			}}
			pointerdown={(e: PointerEvent) => onHexPointerEvent(e, hex)}
			pointermove={(e: PointerEvent) => onHexPointerEvent(e, hex)}
			onmouseenter={() => setHexHover(hex.id, true)}
			onmouseleave={() => setHexHover(hex.id, false)}
		/>
	);
}
