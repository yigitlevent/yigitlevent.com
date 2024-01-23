import { Graphics } from "@pixi/react";

import { useHexmapStore } from "../../../hooks/apiStores/useHexmapStore";
import { useToolsStore } from "../../../hooks/apiStores/usetToolsStore";


export function Area({ area }: { area: HmArea; }): JSX.Element {
	const [selectedPaintTool] = useToolsStore(state => [state.selectedPaintTool]);
	const [map, setAreaHover, areaTypes, onAreaPointerEvent]
		= useHexmapStore(state => [state.map, state.setAreaHover, state.areaTypes, state.onAreaPointerEvent]);

	return (
		<Graphics
			eventMode={selectedPaintTool === "Area" ? "static" : "none"}
			draw={(graphics) => {
				const areaType = areaTypes.find(v => v.id === area.typeId) as HmAreaType;
				const stroke = map.settings.areaStrokeStyle;

				graphics.clear();
				graphics.lineStyle(stroke.width, stroke.color, undefined, stroke.alignment);
				graphics.beginFill(area.state.isHovered ? areaType.fill.hover : areaType.fill.color);
				graphics.drawPolygon(area.vertices);
				graphics.endFill();
			}}
			pointerdown={(e: PointerEvent) => onAreaPointerEvent(e, area)}
			pointermove={(e: PointerEvent) => onAreaPointerEvent(e, area)}
			onmouseenter={() => setAreaHover(area.id, true)}
			onmouseleave={() => setAreaHover(area.id, false)}
		/>
	);
}
