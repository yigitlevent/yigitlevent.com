import { Stage, Container } from "@pixi/react";

import { AreaTerrain } from "./Scene/Areas/AreaTerrain";
import { HexBiome } from "./Scene/Hexes/HexBiome";
import { HexTerrain } from "./Scene/Hexes/HexTerrain";
import { Names } from "./Scene/Names";
import { AreaShape } from "./Scene/Shapes/AreaShape";
import { HexShape } from "./Scene/Shapes/HexShape";
import { Viewport } from "./Viewport";
import { useHexmapStore } from "../../hooks/apiStores/useHexmapStore";


export function Scene({ height, width }: { height: number; width: number; }): JSX.Element {
	const [map, hexes, areas] = useHexmapStore(state => [state.map, state.hexes, state.areas]);

	const validAreas = Array.from(areas);
	const validHexes = Array.from(hexes);

	return (
		<Stage
			height={height}
			width={width}
			style={{ display: "block", height: "100%", width: "100%" }}
			options={{ antialias: true, backgroundAlpha: 0, resolution: 2 }}
		>
			<Viewport>
				{map.id.length > -1
					? <Container position={[width / 2, height / 2]}>
						{validHexes.map((keyValue, index) => <HexBiome key={index} hex={keyValue[1]} />)}
						{validAreas.map((keyValue, index) => <AreaTerrain key={index} area={keyValue[1]} />)}
						{validHexes.map((keyValue, index) => <HexTerrain key={index} hex={keyValue[1]} />)}
						{validAreas.map((keyValue, index) => <AreaShape key={index} area={keyValue[1]} />)}
						{validHexes.map((keyValue, index) => <HexShape key={index} hex={keyValue[1]} />)}
						<Names />
					</Container>
					: null}
			</Viewport>
		</Stage>
	);
}
