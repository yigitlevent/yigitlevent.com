import { Box } from "@mantine/core";
import { Application, extend } from "@pixi/react";
import { Container, FederatedWheelEvent, Graphics, Sprite, Color } from "pixi.js";
import { type Graphics as GraphicsType } from "pixi.js";
import { useCallback, useRef, useState } from "react";
import seedrandom from "seedrandom";

import { Simplex2, Perlin2, Seed } from "../utils/Perlin";
import { Viewport, STATE } from "../utils/Viewport";


extend({
	Container,
	Graphics,
	Sprite,
	Viewport
});


interface Vector2D {
	x: number;
	y: number;
}

interface Noises {
	density: number;
}

type StellarClassType =
	| "O"
	| "B"
	| "A"
	| "F"
	| "G"
	| "K"
	| "M";


const StellarClassTypes: Record<StellarClassType, { baseRadius: number; color: string; }> = {
	O: { baseRadius: 60, color: "#91b5fe" },
	B: { baseRadius: 30, color: "#a1c0fe" },
	A: { baseRadius: 18, color: "#d5e0fe" },
	F: { baseRadius: 12, color: "#f8f4fd" },
	G: { baseRadius: 9, color: "#fdece2" },
	K: { baseRadius: 6, color: "#fcd8be" },
	M: { baseRadius: 3, color: "#fcb27e" }
};

interface Star {
	position: Vector2D;
	noises: Noises;
	stellarClassType: StellarClassType;

}

const StellarTypeCounter: Record<StellarClassType, number> = {
	O: 0,
	B: 0,
	A: 0,
	F: 0,
	G: 0,
	K: 0,
	M: 0
};

export function Map({ randomizer }: { randomizer: seedrandom.PRNG; }): React.JSX.Element {
	const [isAppReady, setIsAppReady] = useState(false);
	const viewportRef = useRef<Viewport>(null);
	const parentRef = useRef(null);

	const drawCallback = useCallback((graphics: GraphicsType) => {
		Seed(123456);

		graphics.clear();

		const width = 1000000;
		const height = 1000000;
		const starCount = 100000;

		const stars: Star[] = [];

		const norm = (n: number): number => (n + 1) / 2;

		while (stars.length < starCount) {
			const pos: Vector2D = {
				x: randomizer() * width,
				y: randomizer() * height
			};

			const density1 = norm(Perlin2(pos.x / width, pos.y / height));
			const density2 = norm(Perlin2(pos.x / width / width, pos.y / height / height));
			const density3 = norm(Perlin2(pos.x / width / width / width, pos.y / height / height / height));
			const density = density1 * 0.5 + density2 * 0.3 + density3 * 0.2;

			const classValue = norm(Perlin2(pos.x, pos.y)) * 0.1 + density * 0.1 + Math.random() * 0.9;

			let stellarClassType: StellarClassType = "M";
			if (classValue < 0.08) stellarClassType = "O";
			else if (classValue < 0.1) stellarClassType = "B";
			else if (classValue < 0.12) stellarClassType = "A";
			else if (classValue < 0.16) stellarClassType = "F";
			else if (classValue < 0.2) stellarClassType = "G";
			else if (classValue < 0.35) stellarClassType = "K";

			StellarTypeCounter[stellarClassType] += 1;

			if (density > 0.3) {
				stars.push({
					position: pos,
					noises: { density },
					stellarClassType: stellarClassType
				});
			}
		}
		console.log(StellarTypeCounter);

		stars.forEach(star => {
			const stellarClass = StellarClassTypes[star.stellarClassType];
			const colorNumber = Color.shared.setValue(stellarClass.color).setAlpha(1).toArray();

			graphics.setFillStyle({ color: colorNumber });
			graphics.circle(star.position.x, star.position.y, StellarClassTypes[star.stellarClassType].baseRadius * 10);
			graphics.fill();
		});
	}, [randomizer]);

	/* onWheel={() => { console.log(viewportRef.current?.scale); }} */

	return (
		<Box ref={parentRef} style={{ width: "100%", height: "100%" }}>
			<Application
				autoStart
				sharedTicker
				resizeTo={parentRef}
				onInit={app => {
					STATE.pixiApp = app;
					setIsAppReady(true);
				}}
			>
				{isAppReady && (
					<pixiViewport ref={viewportRef}>
						<pixiContainer>
							<pixiGraphics draw={drawCallback} />
						</pixiContainer>
					</pixiViewport>
				)}
			</Application>
		</Box>
	);
}
