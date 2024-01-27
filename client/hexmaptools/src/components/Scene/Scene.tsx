import { Stage, Container } from "@pixi/react";

import { Areas } from "./Scene/Areas";
import { Hexes } from "./Scene/Hexes";
import { Names } from "./Scene/Names";
import { Shapes } from "./Scene/Shapes";
import { Viewport } from "./Viewport";
import { useHexmapStore } from "../../hooks/apiStores/useHexmapStore";


export function Scene({ height, width }: { height: number; width: number; }): JSX.Element {
	const map = useHexmapStore(state => state.map);

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
						<Hexes />
						<Areas />
						<Shapes />
						<Names />
					</Container>
					: null}
			</Viewport>
		</Stage>
	);
}
