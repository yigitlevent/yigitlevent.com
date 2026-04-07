import { Box, Container, Title } from "@mantine/core";

import { Ark } from "./components/Ark";
import { Character } from "./components/Character";


export function App(): React.JSX.Element {
	return (
		<Box style={{ width: "100dvw", height: "100dvh" }}>
			<Container style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
				<Title>Mutant Year Zero: Character Generator</Title>
			</Container>

			<Character />
			<Ark />
		</Box>
	);
}
