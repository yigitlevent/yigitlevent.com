import { Fragment } from "react";


export function AreaTerrain(): JSX.Element {
	/*const getAnchors = useCallback((placement: HmAreaPlacement): [number, number] => {
		const anchor: [number, number] = [0.5, 0.5];
		if (placement === 0) return anchor;
		const change = 0.303;
		return [0.5, 0.5 - change];
	}, []);*/

	return (
		<Fragment>
			{/*texture?.valid
				&& <Sprite
					eventMode="none"
					texture={texture}
					anchor={getAnchors(area.placement)}
					x={area.coordinates.center.x}
					y={area.coordinates.center.y}
					width={map.settings.hexRadius * scaling}
					height={map.settings.hexRadius * scaling}
					angle={area.placement === 0 ? 0 : (area.placement - 1) * 60}
				/>*/}
		</Fragment>
	);
}
