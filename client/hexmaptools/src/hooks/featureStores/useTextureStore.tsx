import { Texture } from "@pixi/core";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import hills_hex from "../../assets/tiles/hills_hex.png";
import mountains_1_hex from "../../assets/tiles/mountains_1_hex.png";
import mountains_2_hex from "../../assets/tiles/mountains_2_hex.png";
import mountains_3_hex from "../../assets/tiles/mountains_3_hex.png";
import mountains_4_hex from "../../assets/tiles/mountains_4_hex.png";
import mountains_5_hex from "../../assets/tiles/mountains_5_hex.png";
import mountains_6_hex from "../../assets/tiles/mountains_6_hex.png";
import mountains_7_hex from "../../assets/tiles/mountains_7_hex.png";
import mountains_8_hex from "../../assets/tiles/mountains_8_hex.png";
import mountains_hex from "../../assets/tiles/mountains_hex.png";
import nothing from "../../assets/tiles/nothing.png";
import plains_hex from "../../assets/tiles/plains_hex.png";


// eslint-disable-next-line react-refresh/only-export-components
const List: [HmTextureName, string][] = [
	["nothing", nothing],
	["plains_hex", plains_hex],
	["hills_hex", hills_hex],
	["mountains_hex", mountains_hex],
	["mountains_1_hex", mountains_1_hex],
	["mountains_2_hex", mountains_2_hex],
	["mountains_3_hex", mountains_3_hex],
	["mountains_4_hex", mountains_4_hex],
	["mountains_5_hex", mountains_5_hex],
	["mountains_6_hex", mountains_6_hex],
	["mountains_7_hex", mountains_7_hex],
	["mountains_8_hex", mountains_8_hex]
];

// eslint-disable-next-line react-refresh/only-export-components
const Aa: [HmTextureName, Texture][]
	= (await Promise
		.all(List.map(input => Texture.fromURL(input[1], { resolution: 1 })))
		.then(results => results.map((result, index) => { return [List[index][0], result]; })));


interface ToolsState {
	textureScaling: number;
	images: { [key: string]: string; };
	textures: { [key: string]: Texture; };
}

export const useTexturesStore = create<ToolsState>()(
	devtools(
		() => ({
			textureScaling: 2.008,
			images: Object.fromEntries(List),
			textures: Object.fromEntries(Aa)
		}),
		{ name: "useTexturesStore", serialize: true }
	)
);
