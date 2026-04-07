import { ActionIcon, Box, Checkbox, Group, SimpleGrid, TextInput, Title } from "@mantine/core";
import { Plus, Minus } from "lucide-react";

import { useCharacterStore } from "../../hooks/useCharacterStore";


export function Relationships(): React.JSX.Element {
	const { character, setRelationship, removeRelationship, setIHate, setINeedToProtect, setMyBigDream } = useCharacterStore();

	return (
		<Box>
			<Title order={3} mb="sm">
				Relationships

				<ActionIcon
					variant="light"
					size="sm"
					ml="sm"
					disabled={character.relationships.length >= 6}
					onClick={() => { setRelationship(character.relationships.length, { name: "", relationship: "", isBuddy: false }); }}
				>
					<Plus />
				</ActionIcon>

				<ActionIcon
					variant="light"
					size="sm"
					ml="xs"
					disabled={character.relationships.length <= 1}
					onClick={() => { removeRelationship(character.relationships.length - 1); }}
				>
					<Minus />
				</ActionIcon>
			</Title>

			<SimpleGrid cols={{ base: 1 }}>
				{character.relationships.map((_, index) => (
					<Group key={index} grow wrap="wrap" preventGrowOverflow={false}>
						<TextInput
							label="Name"
							style={{ flexGrow: 1 }}
							value={character.relationships[index].name}
							onChange={event => { setRelationship(index, { ...character.relationships[index], name: event.currentTarget.value }); }}
						/>

						<TextInput
							label="Relationship"
							style={{ flexGrow: 5 }}
							value={character.relationships[index].relationship}
							onChange={event => { setRelationship(index, { ...character.relationships[index], relationship: event.currentTarget.value }); }}
						/>

						<Checkbox
							label="buddy?"
							style={{ flexGrow: 1 }}
							checked={character.relationships[index].isBuddy}
							disabled={character.relationships.filter(rel => rel.isBuddy).length >= 1 && !character.relationships[index].isBuddy}
							onChange={event => { setRelationship(index, { ...character.relationships[index], isBuddy: event.currentTarget.checked }); }}
						/>
					</Group>
				))}

				<Title order={4} mt="md" mb={-12}>I hate...</Title>

				<Group grow wrap="wrap" preventGrowOverflow={false}>
					<TextInput
						placeholder="name"
						style={{ flexGrow: 1 }}
						value={character.iHate.name}
						onChange={event => { setIHate(event.currentTarget.value, undefined); }}
					/>

					<TextInput
						placeholder="relationship"
						style={{ flexGrow: 5 }}
						value={character.iHate.relationship}
						onChange={event => { setIHate(undefined, event.currentTarget.value); }}
					/>
				</Group>

				<Title order={4} mt="md" mb={-12}>I need to protect...</Title>

				<Group grow wrap="wrap" preventGrowOverflow={false}>
					<TextInput
						placeholder="name"
						style={{ flexGrow: 1 }}
						value={character.iNeedToProtect.name}
						onChange={event => { setINeedToProtect(event.currentTarget.value, undefined); }}
					/>

					<TextInput
						placeholder="relationship"
						style={{ flexGrow: 5 }}
						value={character.iNeedToProtect.relationship}
						onChange={event => { setINeedToProtect(undefined, event.currentTarget.value); }}
					/>
				</Group>

				<Title order={4} mt="md" mb={-12}>My big dream...</Title>

				<Group grow wrap="wrap" preventGrowOverflow={false}>
					<TextInput
						placeholder="description"
						style={{ flexGrow: 5 }}
						value={character.myBigDream.description}
						onChange={event => { setMyBigDream(event.currentTarget.value); }}
					/>
				</Group>
			</SimpleGrid>
		</Box>
	);
}
