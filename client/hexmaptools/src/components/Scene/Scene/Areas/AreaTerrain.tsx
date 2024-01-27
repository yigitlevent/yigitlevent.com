import { Sprite } from "@pixi/react";
import { Fragment, useCallback } from "react";

import { useHexmapStore } from "../../../../hooks/apiStores/useHexmapStore";
import { useTexturesStore } from "../../../../hooks/featureStores/useTextureStore";


export function AreaTerrain({ area }: { area: HmArea; }): JSX.Element {
	const [textures, scaling] = useTexturesStore(state => [state.textures, state.textureScaling]);
	const [map] = useHexmapStore(state => [state.map]);

	const texture = textures[area.type.texture];

	const getAnchors = useCallback((placement: HmAreaPlacement): [number, number] => {
		const anchor: [number, number] = [0.5, 0.5];
		if (placement === 0) return anchor;
		const change = 0.303;
		return [0.5, 0.5 - change];
	}, []);

	/*const getAnchorsOld = useCallback((placement: HmAreaPlacement): [number, number] => {
		const anchor: [number, number] = [0.5, 0.5];

		if (placement === 0) return anchor;

		const yChange1 = 0.303;

		const xChange = yChange1 * Math.cos(DegreeToRadian(30 as Degree));
		const yChange2 = yChange1 * Math.sin(DegreeToRadian(30 as Degree));

		if (placement === 1 || placement === 4) anchor[0] = anchor[0] + 0;
		else if (placement === 2 || placement === 3) anchor[0] = anchor[0] + xChange;
		else if (placement === 5 || placement === 6) anchor[0] = anchor[0] - xChange;

		if (placement === 1) anchor[1] = anchor[1] - yChange1;
		else if (placement === 4) anchor[1] = anchor[1] + yChange1;
		else if (placement === 2 || placement === 6) anchor[1] = anchor[1] - yChange2;
		else if (placement === 3 || placement === 5) anchor[1] = anchor[1] + yChange2;

		return anchor;
	}, []);*/

	return (
		<Fragment>
			{texture?.valid
				&& <Sprite
					eventMode="none"
					texture={texture}
					anchor={getAnchors(area.placement)}
					x={area.coordinates.center.x}
					y={area.coordinates.center.y}
					width={map.settings.hexRadius * scaling}
					height={map.settings.hexRadius * scaling}
					angle={area.placement === 0 ? 0 : (area.placement - 1) * 60}
				/>}
		</Fragment>
	);
}
