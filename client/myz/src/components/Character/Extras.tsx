import { Box, NativeSelect, SimpleGrid, Title } from "@mantine/core";

import { Mutations, Roles, Talents, useCharacterStore } from "../../hooks/useCharacterStore";


export function Extras(): React.JSX.Element {
	const { character, setTalent, setMutation, setExtraMutation } = useCharacterStore();

	const selectedRole = Roles.find(role => role.name === character.roleName);

	return (
		<Box>
			<Title order={3} mb="sm">Extras</Title>

			<SimpleGrid cols={{ base: 1, sm: 3 }}>
				<NativeSelect
					label="Talent"
					value={character.talentName}
					onChange={event => {
						const talent = Talents.find(r => r.name === event.currentTarget.value);
						if (talent) { setTalent(talent.name); }
					}}
				>
					<option value="" />

					{selectedRole ? selectedRole.talents.map(talentName => {
						const talent = Talents.find(t => t.name === talentName);
						if (!talent) return null;
						return (
							<option key={talent.name} value={talent.name}>
								{talent.name}
							</option>
						);
					}) : null}
				</NativeSelect>

				<NativeSelect
					label="Mutation"
					value={character.mutationName}
					onChange={event => {
						const mutation = Mutations.find(r => r.name === event.currentTarget.value);
						if (mutation) { setMutation(mutation.name); }
					}}
				>
					<option value="" />

					{Mutations.map(mutation => {
						return (
							<option key={mutation.name} value={mutation.name}>
								{mutation.name}
							</option>
						);
					})}
				</NativeSelect>

				{character.hasExtraMutation ? (
					<NativeSelect
						label="Extra Mutation"
						value={character.extraMutationName}
						onChange={event => {
							const mutation = Mutations.find(r => r.name === event.currentTarget.value);
							if (mutation) { setExtraMutation(mutation.name); }
						}}
					>
						<option value="" />

						{Mutations.map(mutation => {
							return (
								<option key={mutation.name} value={mutation.name}>
									{mutation.name}
								</option>
							);
						})}
					</NativeSelect>
				) : null}
			</SimpleGrid>
		</Box>
	);
}
