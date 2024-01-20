import "@pixi/events";
import { Graphics } from "@pixi/react";

import { useHexmapStore } from "../../../hooks/apiStores/useHexmapStore";


export function Area({ area }: { area: HmHexArea; }): JSX.Element {
	const [showInnerRegions, setAreaHover] = useHexmapStore(state => [state.showInnerRegions, state.setAreaHover]);

	return (
		<Graphics
			eventMode="static"
			draw={(graphics) => {
				graphics.clear();
				if (area.style.stroke) graphics.lineStyle(area.style.stroke.width, area.style.stroke.color);
				if (area.style.fill) graphics.beginFill(area.state.isHovered && showInnerRegions ? area.style.fill.hoverColor : area.style.fill.color);
				graphics.drawPolygon(area.vertices);
				if (area.style.fill) graphics.endFill();
			}}
			click={() => console.log({ name: area.name, area })}
			onmouseenter={() => setAreaHover(area.id, true)}
			onmouseleave={() => setAreaHover(area.id, false)}
		/>
	);
}
