import { Box } from "@mantine/core";
import { useEffect } from "react";
import seedrandom from "seedrandom";

import { Map } from "./components/Map";
import { useUserStore } from "./hooks/useUserStore";


export function App(): React.JSX.Element {
	const { triedAuth, auth, setTriedAuth } = useUserStore();
	const randomizer = seedrandom("1234");

	useEffect(() => {
		if (!triedAuth) {
			setTriedAuth(true);
			auth();
		}
	}, [auth, setTriedAuth, triedAuth]);

	return (
		<Box style={{ width: "100dvw", height: "100dvh", overflow: "hidden" }}>
			<Map randomizer={randomizer} />
		</Box>
	);
}
