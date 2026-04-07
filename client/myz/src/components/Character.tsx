import { Container, Divider, Paper, Title } from "@mantine/core";

import { Attributes } from "./Character/Attributes";
import { Basics } from "./Character/Basics";
import { Extras } from "./Character/Extras";
import { Relationships } from "./Character/Relationships";
import { Skills } from "./Character/Skills";


export function Character(): React.JSX.Element {
	return (
		<Container style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
			<Title order={2} style={{ paddingBottom: "1rem" }}>Character</Title>

			<Paper shadow="xs" radius="xs" withBorder p="md">
				<Basics />
				<Divider my="md" />
				<Attributes />
				<Divider my="md" />
				<Skills />
				<Divider my="md" />
				<Extras />
				<Divider my="md" />
				<Relationships />
				<Divider my="md" />
				<Gear />
			</Paper>
		</Container>
	);
}
