import Box from "@mui/joy/Box";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

import { useHexmapStore } from "../../hooks/apiStores/useHexmapStore";
import { useTexturesStore } from "../../hooks/featureStores/useTextureStore";
import { useToolsStore } from "../../hooks/featureStores/useToolsStore";
import { THEME } from "../../theme/theme";


export function PaintTool(): JSX.Element {
	const [images] = useTexturesStore(state => [state.images]);
	const [biomes, terrains] = useHexmapStore(state => [state.biomes, state.terrains]);
	const [selectedTool, selectedBiome, selectedTerrain, setSelectedBiome, setSelectedTerrain]
		= useToolsStore(state => [state.selectedTool, state.selectedBiome, state.selectedTerrain, state.setSelectedBiome, state.setSelectedTerrain]);

	return (
		<Stack rowGap={1}>
			{selectedTool !== "Area Paint"
				&& <Select value={selectedBiome} onChange={(_, value) => setSelectedBiome(value as HmBiomeId)}>
					{biomes.map((biome, index) => <Option key={index} value={biome.id}>{biome.name}</Option>)}
				</Select>}


			<Select disabled={selectedBiome === 0 && selectedTool === "Hex Paint"} value={selectedTerrain} onChange={(_, value) => setSelectedTerrain(value as HmTerrainId)}>
				{terrains
					.filter(terrain => terrain.type === "Any" || selectedTool.toLowerCase().startsWith(terrain.type.toLowerCase()))
					.map((terrain, index) => <Option key={index} value={terrain.id}>{terrain.name}</Option>)}
			</Select>

			{(biomes[selectedBiome] && terrains[selectedTerrain])
				&& <Box sx={{ width: "100%" }}>
					<Typography level="body-sm" sx={{ width: "min-content", margin: "0 auto" }}>Preview</Typography>

					<Box
						sx={{
							height: "120px",
							width: "120px",
							margin: "0 auto",
							border: `1px solid ${THEME.colorSchemes.dark.palette.neutral.softActiveBg}`,
							background: selectedTool === "Area Paint" ? "beige" : biomes[selectedBiome].fill.color
						}}
					>
						<Box
							sx={{
								height: "120px",
								width: "120px",
								background: `no-repeat url(${images[terrains[selectedTerrain].textures[0]]}) center`,
								backgroundSize: "contain"
							}}
						/>
					</Box>
				</Box>}
		</Stack>
	);
}
