import { Graphics } from "@pixi/react";

import { useHexmapStore } from "../../../../hooks/apiStores/useHexmapStore";
import { useToolsStore } from "../../../../hooks/featureStores/useToolsStore";


export function HexBiome({ hex }: { hex: HmHex; }): JSX.Element {
	const [selectedPaintTool] = useToolsStore(state => [state.selectedPaintTool]);
	const [biomes, setHexHover, onHexPointerEvent] = useHexmapStore(state => [state.biomes, state.setHexHover, state.onHexPointerEvent]);

	const hexBiome = biomes[hex.type.biomeId];

	return (
		<Graphics
			eventMode={selectedPaintTool === "Hex" ? "static" : "none"}
			draw={(graphics) => {
				graphics.clear();
				graphics.beginFill(hexBiome.fill.color);
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
