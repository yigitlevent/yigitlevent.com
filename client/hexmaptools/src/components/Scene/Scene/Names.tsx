import { Fragment } from "react";

import { AreaName } from "./Names/AreaName";
import { HexName } from "./Names/HexName";
import { useHexmapStore } from "../../../hooks/apiStores/useHexmapStore";


export function Names(): JSX.Element {
	const [hexes, areas, showNames] = useHexmapStore(state => [state.hexes, state.areas, state.showNames]);

	return (
		<Fragment>
			{(showNames === "Hex" || showNames === "Both")
				&& Array.from(hexes)
					.filter(kv => kv[1].name !== "")
					.map((keyValue, index) => <HexName key={index} hex={keyValue[1]} />)}

			{(showNames === "Area" || showNames === "Both")
				&& Array.from(areas)
					.filter(kv => kv[1].name !== "")
					.map((keyValue, index) => <AreaName key={index} area={keyValue[1]} />)}
		</Fragment>
	);
}
