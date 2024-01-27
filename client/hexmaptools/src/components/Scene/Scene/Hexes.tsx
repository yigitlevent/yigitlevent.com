import { Fragment } from "react";

import { HexBiome } from "./Hexes/HexBiome";
import { HexTerrain } from "./Hexes/HexTerrain";
import { useHexmapStore } from "../../../hooks/apiStores/useHexmapStore";


export function Hexes(): JSX.Element {
	const [hexes] = useHexmapStore(state => [state.hexes]);

	const validHexes = Array.from(hexes);

	return (
		<Fragment>
			{validHexes.map((keyValue, index) => <HexBiome key={index} hex={keyValue[1]} />)}
			{validHexes.map((keyValue, index) => <HexTerrain key={index} hex={keyValue[1]} />)}
		</Fragment>
	);
}
