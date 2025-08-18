import { Blockquote, Container } from "@mantine/core";
import { Info } from "lucide-react";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { Login } from "./Login";
import { GamePanel } from "./Panels/GamePanel";
import { useMegagameStore } from "../hooks/useMegagameStore";
import { useUserStore } from "../hooks/useUserStore";
import { AdminPanel } from "./Panels/AdminPanel";


function ElementSwitcher() {
	const { fetchMegagameState, fetchData } = useMegagameStore();

	useEffect(() => {
		if (fetchMegagameState === "waiting") fetchData();
	}, [fetchData, fetchMegagameState]);

	const getRoute = () => {
		switch (fetchMegagameState) {
			case "waiting":
			case "requesting":
				return <Blockquote color="yellow" radius="xs" iconSize={30} icon={<Info color="orange" size={20} />}>Loading</Blockquote>;
			case "failed":
				return (
					<Blockquote color="red" radius="xs" iconSize={30} icon={<Info color="red" size={20} />} mt="xl">
						There are no active megagames.
					</Blockquote>
				);
			case "done":
				return <GamePanel />;
		}
	};

	return getRoute();
}

export function Panels(): React.JSX.Element {
	const { user } = useUserStore();

	return (
		<Container strategy="block" size={500} mt="lg">
			<Routes>
				<Route path="/" element={<ElementSwitcher />} />
				<Route path="/login" element={<Login />} />
			</Routes>

			{user?.userAccess.includes("Admin") ? <AdminPanel /> : null}
		</Container >
	);
}
