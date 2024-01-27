import { Fragment } from "react";

import { AreaTerrain } from "./Areas/AreaTerrain";
import { useHexmapStore } from "../../../hooks/apiStores/useHexmapStore";


export function Areas(): JSX.Element {
	const [areas] = useHexmapStore(state => [state.areas]);

	const validAreas = Array.from(areas);

	return (
		<Fragment>
			{validAreas.map((keyValue, index) => <AreaTerrain key={index} area={keyValue[1]} />)}
		</Fragment>
	);
}
