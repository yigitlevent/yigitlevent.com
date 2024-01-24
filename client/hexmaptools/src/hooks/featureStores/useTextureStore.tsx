import { Resource, Texture } from "pixi.js";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import Hex_Desert_06_Plain from "../../assets/tiles/Hex_Desert_06_Plain.png";
import Hex_Desert_07_Hills from "../../assets/tiles/Hex_Desert_07_Hills.png";
import Hex_Desert_08_Mountains1 from "../../assets/tiles/Hex_Desert_08_Mountains1.png";
import Hex_Fields_06_Plain from "../../assets/tiles/Hex_Fields_06_Plain.png";
import Hex_Fields_07_Hills from "../../assets/tiles/Hex_Fields_07_Hills.png";
import Hex_Fields_08_Mountains from "../../assets/tiles/Hex_Fields_08_Mountains.png";
import Hex_Fields_09_Forest1 from "../../assets/tiles/Hex_Fields_09_Forest1.png";
import Hex_Snow_06_Plain from "../../assets/tiles/Hex_Snow_06_Plain.png";
import Hex_Snow_07_Hills from "../../assets/tiles/Hex_Snow_07_Hills.png";
import Hex_Snow_08_Mountains from "../../assets/tiles/Hex_Snow_08_Mountains.png";
import Hex_Snow_09_Forest1 from "../../assets/tiles/Hex_Snow_09_Forest1.png";
import Hex_Swamp_06_Plain from "../../assets/tiles/Hex_Swamp_06_Plain.png";
import Hex_Swamp_07_Plain2 from "../../assets/tiles/Hex_Swamp_07_Plain2.png";
import Hex_Swamp_08_Mountain from "../../assets/tiles/Hex_Swamp_08_Mountain.png";
import Hex_Swamp_09_Forest1 from "../../assets/tiles/Hex_Swamp_09_Forest1.png";
import Hex_Water_00_Basic from "../../assets/tiles/Hex_Water_00_Basic.png";


const List = [
	["Hex_Desert_06_Plain", Hex_Desert_06_Plain],
	["Hex_Desert_07_Hills", Hex_Desert_07_Hills],
	["Hex_Desert_08_Mountains1", Hex_Desert_08_Mountains1],

	["Hex_Fields_06_Plain", Hex_Fields_06_Plain],
	["Hex_Fields_07_Hills", Hex_Fields_07_Hills],
	["Hex_Fields_08_Mountains", Hex_Fields_08_Mountains],
	["Hex_Fields_09_Forest1", Hex_Fields_09_Forest1],

	["Hex_Snow_06_Plain", Hex_Snow_06_Plain],
	["Hex_Snow_07_Hills", Hex_Snow_07_Hills],
	["Hex_Snow_08_Mountains", Hex_Snow_08_Mountains],
	["Hex_Snow_09_Forest1", Hex_Snow_09_Forest1],

	["Hex_Swamp_06_Plain", Hex_Swamp_06_Plain],
	["Hex_Swamp_07_Plain2", Hex_Swamp_07_Plain2],
	["Hex_Swamp_08_Mountain", Hex_Swamp_08_Mountain],
	["Hex_Swamp_09_Forest1", Hex_Swamp_09_Forest1],

	["Hex_Water_00_Basic", Hex_Water_00_Basic]
];

const Aa: [string, Texture<Resource>][]
	= (await Promise
		.all(List.map(input => Texture.fromURL(input[1], { resolution: 1 })))
		.then(results => results.map((result, index) => { return [List[index][0], result]; })));


interface ToolsState {
	list: [string, string][];
	textures: { [key: string]: Texture; };
}

export const useTexturesStore = create<ToolsState>()(
	devtools(
		() => ({
			list: [
				["Hex_Desert_06_Plain", Hex_Desert_06_Plain],
				["Hex_Desert_07_Hills", Hex_Desert_07_Hills],
				["Hex_Desert_08_Mountains1", Hex_Desert_08_Mountains1],

				["Hex_Fields_06_Plain", Hex_Fields_06_Plain],
				["Hex_Fields_07_Hills", Hex_Fields_07_Hills],
				["Hex_Fields_08_Mountains", Hex_Fields_08_Mountains],
				["Hex_Fields_09_Forest1", Hex_Fields_09_Forest1],

				["Hex_Snow_06_Plain", Hex_Snow_06_Plain],
				["Hex_Snow_07_Hills", Hex_Snow_07_Hills],
				["Hex_Snow_08_Mountains", Hex_Snow_08_Mountains],
				["Hex_Snow_09_Forest1", Hex_Snow_09_Forest1],

				["Hex_Swamp_06_Plain", Hex_Swamp_06_Plain],
				["Hex_Swamp_07_Plain2", Hex_Swamp_07_Plain2],
				["Hex_Swamp_08_Mountain", Hex_Swamp_08_Mountain],
				["Hex_Swamp_09_Forest1", Hex_Swamp_09_Forest1],

				["Hex_Water_00_Basic", Hex_Water_00_Basic]
			],

			textures: Object.fromEntries(Aa)
		}),
		{ name: "useTexturesStore" }
	)
);
