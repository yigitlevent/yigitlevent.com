import { Container } from "@mantine/core";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { AdminPanel } from "./Panels/AdminPanel";
import { GamePanel } from "./Panels/GamePanel";
import { useMegagameStore } from "../hooks/useMegagameStore";
import { RulesPanel } from "./Panels/RulesPanel";


export function Panels(): React.JSX.Element {
	const { fetchMegagameState, fetchData } = useMegagameStore();

	useEffect(() => {
		if (fetchMegagameState === "waiting") fetchData(true);
	}, [fetchData, fetchMegagameState]);

	useEffect(() => {
		const i = setInterval(() => fetchData(false), 10000);
		return () => clearInterval(i);
	}, [fetchData]);

	return (
		<Container strategy="block" size={800} mt="lg">
			<Routes>
				<Route path="/" element={<GamePanel />} />
				<Route path="/rules" element={<RulesPanel />} />
				<Route path="/admin" element={<AdminPanel />} />
			</Routes>
		</Container >
	);
}
