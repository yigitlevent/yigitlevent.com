import { Graphics } from "@pixi/react";

import { useHexmapStore } from "../../../../hooks/apiStores/useHexmapStore";
import { useToolsStore } from "../../../../hooks/featureStores/useToolsStore";


export function HexShape({ hex }: { hex: HmHex; }): JSX.Element {
	const [selectedPaintTool] = useToolsStore(state => [state.selectedPaintTool]);
	const [map, setHexHover, onHexPointerEvent] = useHexmapStore(state => [state.map, state.setHexHover, state.onHexPointerEvent]);

	return (
		<Graphics
			eventMode={selectedPaintTool === "Hex" ? "static" : "none"}
			draw={(graphics) => {
				const stroke = map.settings.hexStrokeStyle;

				graphics.clear();
				graphics.lineStyle(stroke.width, stroke.color, undefined, stroke.alignment);
				graphics.beginFill(hex.state.isHovered ? "rgba(60, 60, 60, 0.1)" : "rgba(255, 255, 25, 0.0000001)");
				graphics.drawPolygon(hex.coordinates.vertices);
				graphics.endFill();
			}}
			pointerup={(e: PointerEvent) => onHexPointerEvent(e, hex)}
			pointermove={(e: PointerEvent) => onHexPointerEvent(e, hex)}
			onmouseenter={() => setHexHover(hex.id, true)}
			onmouseleave={() => setHexHover(hex.id, false)}
		/>
	);
}
