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
	const [selectedPaintTool, selectedBiome, selectedTerrain, setSelectedPaintTool, setSelectedBiome, setSelectedTerrain]
		= useToolsStore(state => [state.selectedPaintTool, state.selectedBiome, state.selectedTerrain, state.setSelectedPaintTool, state.setSelectedBiome, state.setSelectedTerrain]);

	return (
		<Stack rowGap={1}>
			<Select value={selectedPaintTool} onChange={(_, value) => setSelectedPaintTool(value as HmPaintTool)}>
				<Option value={"Hex"}>Hex</Option>
				<Option value={"Area"}>Area</Option>
			</Select>

			<Select disabled={selectedPaintTool === "Area"} value={selectedBiome} onChange={(_, value) => setSelectedBiome(value as HmBiomeId)}>
				{biomes
					.map((biome, index) => <Option key={index} value={biome.id}>{biome.name}</Option>)}
			</Select>

			<Select disabled={selectedBiome === 0 && selectedPaintTool === "Hex"} value={selectedTerrain} onChange={(_, value) => setSelectedTerrain(value as HmTerrainId)}>
				{terrains
					.filter(terrain => terrain.type === "Any" || terrain.type === selectedPaintTool)
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
							background: selectedPaintTool === "Area" ? "beige" : biomes[selectedBiome].fill.color
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
