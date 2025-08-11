import { Blockquote, Box, Container } from "@mantine/core";
import { Info } from "lucide-react";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { Login } from "./Login";
import { GamePanel } from "./Panels/GamePanel";
import { useMegagameStore } from "../hooks/useMegagameStore";
import { useUserStore } from "../hooks/useUserStore";
import { AdminPanel } from "./Panels/AdminPanel";


export function Panels(): React.JSX.Element {
	const { user } = useUserStore();
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
					? <Blockquote color="red" radius="xs" iconSize={30} icon={<Info color="red" size={20} />} mt="xl">
						There are no active megagames.
					</Blockquote>
					: <Blockquote color="yellow" radius="xs" iconSize={30} icon={<Info color="orange" size={20} />}>Loading</Blockquote>}


			{user?.userAccess.includes("Admin") ? <AdminPanel /> : null}
		</Container>
	);
}
