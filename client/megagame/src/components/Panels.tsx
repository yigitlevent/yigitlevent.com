import { Container } from "@mantine/core";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { AdminPanel } from "./Panels/AdminPanel";
import { GamePanel } from "./Panels/GamePanel";
import { useMegagameStore } from "../hooks/useMegagameStore";


export function Panels(): React.JSX.Element {
	const { fetchMegagameState, fetchData } = useMegagameStore();

	useEffect(() => {
		if (fetchMegagameState === "waiting") fetchData(true);
	}, [fetchData, fetchMegagameState]);

	useEffect(() => {
		const i = setInterval(() => fetchData(false), 15000);
		return () => clearInterval(i);
	}, [fetchData]);

	return (
		<Container strategy="block" size={500} mt="lg">
			<Routes>
				<Route path="/" element={<GamePanel />} />
				<Route path="/admin" element={<AdminPanel />} />
			</Routes>
		</Container >
	);
}
