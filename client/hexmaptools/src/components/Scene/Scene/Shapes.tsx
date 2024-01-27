import { Fragment } from "react";

import { AreaShape } from "./Shapes/AreaShape";
import { HexShape } from "./Shapes/HexShape";
import { useHexmapStore } from "../../../hooks/apiStores/useHexmapStore";


export function Shapes(): JSX.Element {
	const [hexes, areas] = useHexmapStore(state => [state.hexes, state.areas]);

	const validHexes = Array.from(hexes);
	const validAreas = Array.from(areas);

	return (
		<Fragment>
			{validAreas.map((keyValue, index) => <AreaShape key={index} area={keyValue[1]} />)}
			{validHexes.map((keyValue, index) => <HexShape key={index} hex={keyValue[1]} />)}
		</Fragment>
	);
}
