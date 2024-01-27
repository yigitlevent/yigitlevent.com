import { Resource, Texture } from "pixi.js";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import forest_full_area0 from "../../assets/tiles/forest_full_area0.png";
import forest_full_area1 from "../../assets/tiles/forest_full_area1.png";
import forest_full_area2 from "../../assets/tiles/forest_full_area2.png";
import forest_full_area3 from "../../assets/tiles/forest_full_area3.png";
import forest_full_area4 from "../../assets/tiles/forest_full_area4.png";
import forest_full_area5 from "../../assets/tiles/forest_full_area5.png";
import forest_full_area6 from "../../assets/tiles/forest_full_area6.png";
import forest_outer_horizontal_area0 from "../../assets/tiles/forest_outer_horizontal_area0.png";
import forest_outer_horizontal_area1 from "../../assets/tiles/forest_outer_horizontal_area1.png";
import forest_outer_horizontal_area2 from "../../assets/tiles/forest_outer_horizontal_area2.png";
import forest_outer_horizontal_area3 from "../../assets/tiles/forest_outer_horizontal_area3.png";
import forest_outer_horizontal_area4 from "../../assets/tiles/forest_outer_horizontal_area4.png";
import forest_outer_horizontal_area5 from "../../assets/tiles/forest_outer_horizontal_area5.png";
import forest_outer_horizontal_area6 from "../../assets/tiles/forest_outer_horizontal_area6.png";
import forest_outer_left_area0 from "../../assets/tiles/forest_outer_left_area0.png";
import forest_outer_left_area1 from "../../assets/tiles/forest_outer_left_area1.png";
import forest_outer_left_area2 from "../../assets/tiles/forest_outer_left_area2.png";
import forest_outer_left_area3 from "../../assets/tiles/forest_outer_left_area3.png";
import forest_outer_left_area4 from "../../assets/tiles/forest_outer_left_area4.png";
import forest_outer_left_area5 from "../../assets/tiles/forest_outer_left_area5.png";
import forest_outer_left_area6 from "../../assets/tiles/forest_outer_left_area6.png";
import forest_outer_right_area0 from "../../assets/tiles/forest_outer_right_area0.png";
import forest_outer_right_area1 from "../../assets/tiles/forest_outer_right_area1.png";
import forest_outer_right_area2 from "../../assets/tiles/forest_outer_right_area2.png";
import forest_outer_right_area3 from "../../assets/tiles/forest_outer_right_area3.png";
import forest_outer_right_area4 from "../../assets/tiles/forest_outer_right_area4.png";
import forest_outer_right_area5 from "../../assets/tiles/forest_outer_right_area5.png";
import forest_outer_right_area6 from "../../assets/tiles/forest_outer_right_area6.png";
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
	["forest_full_area0", forest_full_area0],
	["forest_full_area1", forest_full_area1],
	["forest_full_area2", forest_full_area2],
	["forest_full_area3", forest_full_area3],
	["forest_full_area4", forest_full_area4],
	["forest_full_area5", forest_full_area5],
	["forest_full_area6", forest_full_area6],
	["forest_outer_horizontal_area0", forest_outer_horizontal_area0],
	["forest_outer_horizontal_area1", forest_outer_horizontal_area1],
	["forest_outer_horizontal_area2", forest_outer_horizontal_area2],
	["forest_outer_horizontal_area3", forest_outer_horizontal_area3],
	["forest_outer_horizontal_area4", forest_outer_horizontal_area4],
	["forest_outer_horizontal_area5", forest_outer_horizontal_area5],
	["forest_outer_horizontal_area6", forest_outer_horizontal_area6],
	["forest_outer_left_area0", forest_outer_left_area0],
	["forest_outer_left_area1", forest_outer_left_area1],
	["forest_outer_left_area2", forest_outer_left_area2],
	["forest_outer_left_area3", forest_outer_left_area3],
	["forest_outer_left_area4", forest_outer_left_area4],
	["forest_outer_left_area5", forest_outer_left_area5],
	["forest_outer_left_area6", forest_outer_left_area6],
	["forest_outer_right_area0", forest_outer_right_area0],
	["forest_outer_right_area1", forest_outer_right_area1],
	["forest_outer_right_area2", forest_outer_right_area2],
	["forest_outer_right_area3", forest_outer_right_area3],
	["forest_outer_right_area4", forest_outer_right_area4],
	["forest_outer_right_area5", forest_outer_right_area5],
	["forest_outer_right_area6", forest_outer_right_area6]
];

// eslint-disable-next-line react-refresh/only-export-components
const Aa: [string, Texture<Resource>][]
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
		{ name: "useTexturesStore" }
	)
);
