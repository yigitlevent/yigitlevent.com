import { PixiComponent, useApp } from "@pixi/react";
import { Viewport as PixiViewport } from "pixi-viewport";
import { Application, EventSystem, ICanvas, IRenderer, ISystemConstructor } from "pixi.js";


interface ViewportProps {
	children?: React.ReactNode;
	size: { height: number; width: number; };
	onClick: (event: HmViewportEvent) => void;
	onRightClick: (event: HmViewportEvent) => void;
	onMove: (event: HmViewportEvent) => void;
}

interface PixiComponentViewportProps extends ViewportProps {
	app: Application;
}

const PixiComponentViewport = PixiComponent("Viewport", {
	create: ({ app, size, onClick, onRightClick, onMove }: PixiComponentViewportProps) => {
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

		viewport.on("click", (event) => {
			const position = viewport.toWorld(event.global);
			onClick({
				mousePosition: { x: position.x - (size.width / 2), y: -(position.y - (size.height / 2)) }
			});
		});

		viewport.on("rightclick", (event) => {
			const position = viewport.toWorld(event.global);
			onRightClick({
				mousePosition: { x: position.x - (size.width / 2), y: -(position.y - (size.height / 2)) }
			});
		});

		viewport.on("mousemove", (event) => {
			const position = viewport.toWorld(event.global);
			onMove({
				mousePosition: { x: position.x - (size.width / 2), y: -(position.y - (size.height / 2)) }
			});
		});

		//viewport.addEventListener("click", (event) => console.log([event.view..x, event.global.y]));

		return viewport;
	},
	willUnmount: (viewport: PixiViewport) => {
		viewport.options.noTicker = true;
		viewport.destroy({ children: true });
	}
});

export function Viewport({ children, size, onClick, onRightClick, onMove }: ViewportProps): JSX.Element {
	const app = useApp();

	return (
		<PixiComponentViewport app={app} size={size} onClick={onClick} onRightClick={onRightClick} onMove={onMove}>
			{children}
		</PixiComponentViewport>
	);
}
