import { Box, NativeSelect, NumberInput, SimpleGrid, TextInput, Title } from "@mantine/core";

import { Roles, SpecialistSkills, useCharacterStore } from "../../hooks/useCharacterStore";


export function Gear(): React.JSX.Element {
	const { character, } = useCharacterStore();

	const selectedRole = Roles.find(role => role.name === character.roleName);

	return (
		<Box>
			<Title order={3} mb="sm">Basics</Title>

			<SimpleGrid cols={{ base: 1, xs: 2, sm: 3 }}>

				<div />
			</SimpleGrid>

		</Box>
	);
}
