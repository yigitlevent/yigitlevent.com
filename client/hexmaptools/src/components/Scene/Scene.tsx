import { Stage, Container } from "@pixi/react";

import { Area } from "./Scene/Area";
import { Hex } from "./Scene/Hex";
import { Viewport } from "./Viewport";
import { useHexmapStore } from "../../hooks/apiStores/useHexmapStore";


export function MainContainer({ position }: { position: [number, number]; }): JSX.Element {
	const [showInnerRegions, hexes, areas] = useHexmapStore(state => [state.showInnerRegions, state.hexes, state.areas]);

	return (
		<Container
			position={position}
			rightclick={(e) => console.log(e)}
		>
			{Array.from(hexes).map((keyValue, index) => <Hex key={index} hex={keyValue[1]} />)}
			{showInnerRegions && Array.from(areas).map((keyValue, index) => <Area key={index} area={keyValue[1]} />)}
		</Container>
	);
}

export function Scene({ height, width }: { height: number; width: number; }): JSX.Element {
	const [map] = useHexmapStore(state => [state.map]);

	const onClick = (event: HmViewportEvent) => {
		console.log({ event });
	};

	const onRightClick = (event: HmViewportEvent) => {
		console.log(event);
	};

	const onMove = (event: HmViewportEvent) => {
		//console.log(event);
		event;
	};

	return (
		<Stage
			height={height}
			width={width}
			style={{ display: "block", height: "100%", width: "100%" }}
			options={{ antialias: true, backgroundAlpha: 0 }}
		>
			<Viewport
				size={{ height, width }}
				onClick={onClick}
				onRightClick={onRightClick}
				onMove={onMove}
			>
				{map.size > 0 ? <MainContainer position={[width / 2, height / 2]} /> : null}
			</Viewport>
		</Stage>
	);
}
