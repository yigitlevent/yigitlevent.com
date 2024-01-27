import { Graphics } from "@pixi/react";

import { useHexmapStore } from "../../../../hooks/apiStores/useHexmapStore";
import { useToolsStore } from "../../../../hooks/featureStores/useToolsStore";


export function AreaShape({ area }: { area: HmArea; }): JSX.Element {
	const [selectedPaintTool] = useToolsStore(state => [state.selectedPaintTool]);
	const [map, setAreaHover, onAreaPointerEvent] = useHexmapStore(state => [state.map, state.setAreaHover, state.onAreaPointerEvent]);

	return (
		<Graphics
			eventMode={selectedPaintTool === "Area" ? "static" : "none"}
			draw={(graphics) => {
				const stroke = map.settings.areaStrokeStyle;

				graphics.clear();
				graphics.lineStyle(stroke.width, stroke.color, undefined, stroke.alignment);
				graphics.beginFill(area.state.isHovered ? "rgba(60, 60, 60, 0.1)" : "rgba(255, 255, 25, 0.0000001)");
				graphics.drawPolygon(area.coordinates.vertices);
				graphics.endFill();
			}}
			pointerdown={(e: PointerEvent) => onAreaPointerEvent(e, area)}
			onmouseenter={() => setAreaHover(area.id, true)}
			onmouseleave={() => setAreaHover(area.id, false)}
		/>
	);
}
