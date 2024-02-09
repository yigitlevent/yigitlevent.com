import { Sprite } from "@pixi/react";
import { Fragment } from "react";

import { useHexmapStore } from "../../../../hooks/apiStores/useHexmapStore";
import { useTexturesStore } from "../../../../hooks/featureStores/useTextureStore";


export function HexTerrain({ hex }: { hex: HmHex; }): JSX.Element {
	const [textures, scaling] = useTexturesStore(state => [state.textures, state.textureScaling]);
	const [map, terrains] = useHexmapStore(state => [state.map, state.terrains]);

	const hexTerrain = terrains[hex.type.terrainId];
	const texture = textures[hexTerrain.textures[0]];

	return (
		<Fragment>
			{(texture?.valid)
				&& <Sprite
					eventMode="none"
					texture={texture}
					anchor={[0.5, 0.5]}
					x={hex.coordinates.center.x}
					y={hex.coordinates.center.y}
					width={map.settings.hexRadius * scaling}
					height={map.settings.hexRadius * scaling}
				//filters={[new DropShadowFilter({ blur: 3, offset: { x: 0, y: 4 } })]}
				/>}
		</Fragment>
	);
}
