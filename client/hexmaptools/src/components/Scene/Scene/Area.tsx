/*
export function Area({ area }: { area: HmHexArea; }): JSX.Element {
	const [showInnerRegions, setHexHover, hexTypes, onClick, onRightClick]
		= useHexmapStore(state => [state.showInnerRegions, state.setHexHover, state.hexTypes, state.onClick, state.onRightClick]);

	return (
		<Graphics
			eventMode="static"
			draw={(graphics) => {
				graphics.clear();
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
*/
