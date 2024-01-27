import { Texture } from "@pixi/core";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import forest_0_center from "../../assets/tiles/forest/forest_0_center.png";
import forest_0_side from "../../assets/tiles/forest/forest_0_side.png";
import forest_10_center from "../../assets/tiles/forest/forest_10_center.png";
import forest_10_side from "../../assets/tiles/forest/forest_10_side.png";
import forest_11_center from "../../assets/tiles/forest/forest_11_center.png";
import forest_11_side from "../../assets/tiles/forest/forest_11_side.png";
import forest_12_center from "../../assets/tiles/forest/forest_12_center.png";
import forest_12_side from "../../assets/tiles/forest/forest_12_side.png";
import forest_13_center from "../../assets/tiles/forest/forest_13_center.png";
import forest_14_center from "../../assets/tiles/forest/forest_14_center.png";
import forest_15_center from "../../assets/tiles/forest/forest_15_center.png";
import forest_16_center from "../../assets/tiles/forest/forest_16_center.png";
import forest_17_center from "../../assets/tiles/forest/forest_17_center.png";
import forest_18_center from "../../assets/tiles/forest/forest_18_center.png";
import forest_19_center from "../../assets/tiles/forest/forest_19_center.png";
import forest_1_center from "../../assets/tiles/forest/forest_1_center.png";
import forest_1_side from "../../assets/tiles/forest/forest_1_side.png";
import forest_20_center from "../../assets/tiles/forest/forest_20_center.png";
import forest_21_center from "../../assets/tiles/forest/forest_21_center.png";
import forest_22_center from "../../assets/tiles/forest/forest_22_center.png";
import forest_23_center from "../../assets/tiles/forest/forest_23_center.png";
import forest_24_center from "../../assets/tiles/forest/forest_24_center.png";
import forest_25_center from "../../assets/tiles/forest/forest_25_center.png";
import forest_26_center from "../../assets/tiles/forest/forest_26_center.png";
import forest_27_center from "../../assets/tiles/forest/forest_27_center.png";
import forest_28_center from "../../assets/tiles/forest/forest_28_center.png";
import forest_29_center from "../../assets/tiles/forest/forest_29_center.png";
import forest_2_center from "../../assets/tiles/forest/forest_2_center.png";
import forest_2_side from "../../assets/tiles/forest/forest_2_side.png";
import forest_30_center from "../../assets/tiles/forest/forest_30_center.png";
import forest_31_center from "../../assets/tiles/forest/forest_31_center.png";
import forest_32_center from "../../assets/tiles/forest/forest_32_center.png";
import forest_3_center from "../../assets/tiles/forest/forest_3_center.png";
import forest_3_side from "../../assets/tiles/forest/forest_3_side.png";
import forest_4_center from "../../assets/tiles/forest/forest_4_center.png";
import forest_4_side from "../../assets/tiles/forest/forest_4_side.png";
import forest_5_center from "../../assets/tiles/forest/forest_5_center.png";
import forest_5_side from "../../assets/tiles/forest/forest_5_side.png";
import forest_6_center from "../../assets/tiles/forest/forest_6_center.png";
import forest_6_side from "../../assets/tiles/forest/forest_6_side.png";
import forest_7_center from "../../assets/tiles/forest/forest_7_center.png";
import forest_7_side from "../../assets/tiles/forest/forest_7_side.png";
import forest_8_center from "../../assets/tiles/forest/forest_8_center.png";
import forest_8_side from "../../assets/tiles/forest/forest_8_side.png";
import forest_9_center from "../../assets/tiles/forest/forest_9_center.png";
import forest_9_side from "../../assets/tiles/forest/forest_9_side.png";
import hills_hex from "../../assets/tiles/hills_hex.png";
import mountains_hex from "../../assets/tiles/mountains_hex.png";
import nothing from "../../assets/tiles/nothing.png";
import plains_hex from "../../assets/tiles/plains_hex.png";


// eslint-disable-next-line react-refresh/only-export-components
const List: [HmTextureName, string][] = [
	["nothing", nothing],
	["plains_hex", plains_hex],
	["hills_hex", hills_hex],
	["mountains_hex", mountains_hex],
	["forest_0_center", forest_0_center],
	["forest_1_center", forest_1_center],
	["forest_2_center", forest_2_center],
	["forest_3_center", forest_3_center],
	["forest_4_center", forest_4_center],
	["forest_5_center", forest_5_center],
	["forest_6_center", forest_6_center],
	["forest_7_center", forest_7_center],
	["forest_8_center", forest_8_center],
	["forest_9_center", forest_9_center],
	["forest_10_center", forest_10_center],
	["forest_11_center", forest_11_center],
	["forest_12_center", forest_12_center],
	["forest_13_center", forest_13_center],
	["forest_14_center", forest_14_center],
	["forest_15_center", forest_15_center],
	["forest_16_center", forest_16_center],
	["forest_17_center", forest_17_center],
	["forest_18_center", forest_18_center],
	["forest_19_center", forest_19_center],
	["forest_20_center", forest_20_center],
	["forest_21_center", forest_21_center],
	["forest_22_center", forest_22_center],
	["forest_23_center", forest_23_center],
	["forest_24_center", forest_24_center],
	["forest_25_center", forest_25_center],
	["forest_26_center", forest_26_center],
	["forest_27_center", forest_27_center],
	["forest_28_center", forest_28_center],
	["forest_29_center", forest_29_center],
	["forest_30_center", forest_30_center],
	["forest_31_center", forest_31_center],
	["forest_32_center", forest_32_center],
	["forest_0_side", forest_0_side],
	["forest_1_side", forest_1_side],
	["forest_2_side", forest_2_side],
	["forest_3_side", forest_3_side],
	["forest_4_side", forest_4_side],
	["forest_5_side", forest_5_side],
	["forest_6_side", forest_6_side],
	["forest_7_side", forest_7_side],
	["forest_8_side", forest_8_side],
	["forest_9_side", forest_9_side],
	["forest_10_side", forest_10_side],
	["forest_11_side", forest_11_side],
	["forest_12_side", forest_12_side]
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
