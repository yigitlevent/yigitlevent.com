import { Blockquote, Box, Container } from "@mantine/core";
import { Camera } from "lucide-react";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { Login } from "./Login";
import { GamePanel } from "./Panels/GamePanel";
import { useMegagameStore } from "../hooks/apiStores/useMegagameStore";


export function Panels(): React.JSX.Element {
	const { fetchState, fetchData } = useMegagameStore();

	useEffect(() => {
		if (fetchState === "fetch-data") fetchData();
	}, [fetchData, fetchState]);

	return (
		<Container strategy="block" size={500} mt="lg">
			{fetchState === "done"
				? <Routes>
					<Route path="/" element={<Box>
						<GamePanel />
					</Box>} />

					<Route path="/login" element={<Box>
						<Login />
					</Box>} />
				</Routes>
				: fetchState === "failed"
					? <Blockquote color="red" radius="xs" iconSize={30} icon={<Camera color="black" size={48} />} mt="xl">
						There are no active megagames.
					</Blockquote>
					: <Blockquote color="yellow" radius="xs" iconSize={30} icon={<Camera color="black" size={48} />}>Loading</Blockquote>}
		</Container>
	);
}
