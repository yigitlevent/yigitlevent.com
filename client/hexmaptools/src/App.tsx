import Box from "@mui/joy/Box";
import { useEffect } from "react";

import { Controls } from "./components/Controls";
import { Drawer } from "./components/Drawer";
import { MainBox } from "./components/MainBox";
import { useUserStore } from "./hooks/apiStores/useUserStore";


export function App(): JSX.Element {
	const { triedAuth, auth } = useUserStore();

	useEffect(() => {
		if (!triedAuth) { auth(); }
	}, [auth, triedAuth]);

	console.clear();

	return (
		<Box sx={{ display: "flex", minHeight: "100dvh" }}>
			<Controls />
			<Drawer />
			<MainBox />
		</Box>
	);
}
