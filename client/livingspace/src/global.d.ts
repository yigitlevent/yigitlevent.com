import { PixiElements, type PixiReactElementProps } from "@pixi/react";

import { type Viewport } from "./Viewport";


declare global {
	namespace React {
		namespace JSX {
			interface IntrinsicElements extends PixiElements {
				pixiViewport: PixiReactElementProps<typeof Viewport>;
			}
		}
	}
}
