import "@pixi/events";
import { Graphics } from "@pixi/react";

import { useHexmapStore } from "../../../hooks/apiStores/useHexmapStore";


export function Hex({ hex }: { hex: HmHex; }): JSX.Element {
	const [showInnerRegions, setHexHover] = useHexmapStore(state => [state.showInnerRegions, state.setHexHover]);

	return (
		<Graphics
			eventMode="static"
			draw={(graphics) => {
				graphics.clear();
				if (hex.style.stroke) graphics.lineStyle(hex.style.stroke.width, hex.style.stroke.color, undefined, hex.style.stroke.alignment);
				if (hex.style.fill) graphics.beginFill(hex.state.isHovered && (!showInnerRegions || !hex.state.isPainted) ? hex.style.fill.hoverColor : hex.style.fill.color);
				graphics.drawPolygon(hex.vertices);
				if (hex.style.fill) graphics.endFill();
			}}
			click={() => console.log({ name: hex.name, hex })}
			onmouseenter={() => setHexHover(hex.id, true)}
			onmouseleave={() => setHexHover(hex.id, false)}
		/>
	);
}
