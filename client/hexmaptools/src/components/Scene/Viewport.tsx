import { PixiComponent, useApp } from "@pixi/react";
import { Viewport as PixiViewport } from "pixi-viewport";
import { Application, EventSystem, ICanvas, IRenderer, ISystemConstructor } from "pixi.js";

import { useToolsStore } from "../../hooks/featureStores/useToolsStore";


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
			//ticker: app.ticker,
			events: app.renderer.events,
			disableOnContextMenu: true,
			passiveWheel: false
		});

		viewport
			.drag({ mouseButtons: "left" })
			.decelerate({ friction: 0.9, bounce: 0 })
			.pinch()
			.wheel({ wheelZoom: true, smooth: 10 })
			.clampZoom({ minScale: 0.2, maxScale: 2 });

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
			case "Select":
			case "Paint":
			case "Eyedrop":
				viewport.pause = true;
				break;
		}
	}
});

export function Viewport({ children }: ViewportProps): JSX.Element {
	const app = useApp();
	const [selectedTool] = useToolsStore(state => [state.selectedTool]);

	return (
		<PixiComponentViewport app={app} selectedTool={selectedTool}>
			{children}
		</PixiComponentViewport>
	);
}
