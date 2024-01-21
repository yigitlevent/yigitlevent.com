import { PixiComponent, useApp } from "@pixi/react";
import { Viewport as PixiViewport } from "pixi-viewport";
import { Application, EventSystem, ICanvas, IRenderer, ISystemConstructor } from "pixi.js";

import { useHexmapStore } from "../../hooks/apiStores/useHexmapStore";


interface ViewportProps {
	children?: React.ReactNode;
}

interface PixiComponentViewportProps extends ViewportProps {
	app: Application;
	selectedTool: HmDrawerTools;
}

const PixiComponentViewport = PixiComponent("Viewport", {
	create: ({ app }: PixiComponentViewportProps) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		if (!("events" in app.renderer)) (app.renderer as any).addSystem(EventSystem as unknown as ISystemConstructor<IRenderer<ICanvas>>, "events");

		const viewport = new PixiViewport({
			passiveWheel: false,
			ticker: app.ticker,
			events: app.renderer.events
		});

		viewport
			.drag({ wheel: false })
			.wheel({ wheelZoom: true, smooth: 10 })
			.clampZoom({ minScale: 0.2, maxScale: 2 })
			.pinch()
			.decelerate({ friction: 0.9, bounce: 0 });

		return viewport;
	},
	willUnmount: (viewport: PixiViewport) => {
		viewport.options.noTicker = true;
		viewport.destroy({ children: true });
	},
	applyProps: (viewport, _, newProps) => {
		switch (newProps.selectedTool) {
			case "Pan":
				viewport.pause = false;
				break;
			case "Pointer":
			case "Paint":
			case "Eyedropper":
				viewport.pause = true;
				break;
		}
	}
});

export function Viewport({ children }: ViewportProps): JSX.Element {
	const app = useApp();
	const selectedTool = useHexmapStore(state => state.tools.selectedTool);

	return (
		<PixiComponentViewport app={app} selectedTool={selectedTool}>
			{children}
		</PixiComponentViewport>
	);
}
