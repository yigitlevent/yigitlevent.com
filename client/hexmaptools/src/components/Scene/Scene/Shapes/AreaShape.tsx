import { Graphics } from "@pixi/react";

import { useHexmapStore } from "../../../../hooks/apiStores/useHexmapStore";
import { useToolsStore } from "../../../../hooks/featureStores/useToolsStore";


export function AreaShape({ area }: { area: HmArea; }): JSX.Element {
	const [selectedTool] = useToolsStore(state => [state.selectedTool]);
	const [map, setAreaHover, onAreaPointerEvent] = useHexmapStore(state => [state.map, state.setAreaHover, state.onAreaPointerEvent]);

	return (
		<Graphics
			eventMode={selectedTool === "Area Paint" ? "static" : "none"}
			draw={(graphics) => {
				const stroke = map.settings.areaStrokeStyle;
				const fill = map.settings.fill;

				graphics.clear();
				graphics.lineStyle(stroke.width, stroke.color, undefined, stroke.alignment);
				graphics.beginFill(area.state.isHovered ? fill.hover : fill.color);
				graphics.drawPolygon(area.coordinates.vertices);
				graphics.endFill();
			}}
			pointerdown={(e: PointerEvent) => onAreaPointerEvent(e, area)}
			onmouseenter={() => setAreaHover(area.id, true)}
			onmouseleave={() => setAreaHover(area.id, false)}
		/>
	);
}
