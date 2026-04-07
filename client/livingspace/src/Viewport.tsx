import { Viewport as BaseViewport, type IViewportOptions } from "pixi-viewport";
import { Application } from "pixi.js";


export const STATE: { pixiApp: Application | null; } = {
	pixiApp: null
};

export class Viewport extends BaseViewport {
	constructor(options: Omit<IViewportOptions, "events"> = {}) {
		if (!STATE.pixiApp) throw new Error("no pixi app");
		super({
			...options,
			events: STATE.pixiApp.renderer.events
		});
		this.drag().pinch().wheel().decelerate();
	}
}
