import { Box, Button, Paper, SimpleGrid, Title } from "@mantine/core";

import { Titlebox } from "./Titlebox";


export function RulesPanel(): React.JSX.Element {
	return (
		<Box style={{ width: "100%" }}>
			<Titlebox />

			<Paper shadow="md" radius="xs" p="xl" bd="1px solid rgba(0,0,0,0.1)" mt="md">
				<Title order={2} mb="md">
					Dune: Megagame
				</Title>

				<SimpleGrid cols={2}>
					<Button
						component="a"
						href="/rulebooks/Dune Megagame Rules [en].pdf"
						target="_blank"
						rel="noopener noreferrer"
						variant="light"
						color="yellow"
					>
						English
					</Button>

					<Button
						component="a"
						href="/rulebooks/Dune Megagame Rules [tr].pdf"
						target="_blank"
						rel="noopener noreferrer"
						variant="light"
						color="yellow"
					>
						Türkçe
					</Button>
				</SimpleGrid>
			</Paper>
		</Box>
	);
}
