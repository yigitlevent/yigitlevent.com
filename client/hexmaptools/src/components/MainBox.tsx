import Container from "@mui/joy/Container";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect } from "react";

import { Scene } from "./Scene/Scene";
import { useHexmapStore } from "../hooks/apiStores/useHexmapStore";
import { useDrawerStore } from "../hooks/useDrawerStore";
import { useWindowSize } from "../hooks/useWindowSize";
import { THEME } from "../theme/theme";


export function MainBox(): JSX.Element {
	const [loadHexmap] = useHexmapStore(state => [state.loadHexmap]);
	const [drawerWidth] = useDrawerStore(state => [state.drawerWidth]);
	const [width, height] = useWindowSize();
	const mediumDown = useMediaQuery(THEME.breakpoints.down("md"));

	//useEffect(() => {
	//	if (fetchState === "fetch-full") fetchList();
	//}, [fetchList, fetchState]);

	//useEffect(() => {
	//	if (fetchState === "fetch-data") fetchData();
	//}, [fetchData, fetchState]);

	useEffect(() => {
		loadHexmap();
	}, [loadHexmap]);

	return (
		<Container disableGutters sx={{ display: "inline", height: `${height}px`, width: `${width - (mediumDown ? 0 : drawerWidth)}px`, maxWidth: "none!important" }}>
			<Scene height={height} width={width - (mediumDown ? 0 : drawerWidth)} />
		</Container>
	);
}
