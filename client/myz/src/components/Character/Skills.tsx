import { Box, Checkbox, SimpleGrid, Title, Text } from "@mantine/core";
import { Fragment } from "react/jsx-runtime";

import { useCharacterStore } from "../../hooks/useCharacterStore";


interface SkillBoxProps {
	name: string;
	attribute: string;
	skillValue: number;
	setSkillValue: (value: number) => void;
}

function SkillBox({ name, attribute, skillValue, setSkillValue }: SkillBoxProps): React.JSX.Element {
	const attributeText = "(" + attribute + ")";

	return (
		<Box>
			<Title order={4} mb="sm">
				{name}

				<Text size="xs" ml="sm" style={{ display: "inline-block" }}>
					{attributeText}
				</Text>
			</Title>

			<Box>
				{[1, 2, 3, 4, 5].map(boxValue => {
					return (
						<Checkbox
							key={"skill-" + name + "-" + String(boxValue)}
							color="cyan"
							icon={() => <span />}
							checked={skillValue >= boxValue}
							onClick={() => { setSkillValue(boxValue); }}
							style={{ display: "inline-block", marginRight: "0.5rem" }}
						/>
					);
				})}
			</Box>
		</Box>
	);
}

function SpecialistSkill(): React.JSX.Element {
	const { character, setSpecialistSkill: setSpecialSkill } = useCharacterStore();

	if (!character.specialistSkill) return <Fragment />;
	return (
		<SkillBox
			name={character.specialistSkill.name}
			attribute={character.specialistSkill.attribute}
			skillValue={character.specialistSkill.rank}
			setSkillValue={(value: number) => {
				if (character.specialistSkill) setSpecialSkill(character.specialistSkill.name, value, character.specialistSkill.attribute);
			}}
		/>
	);
}

export function Skills(): React.JSX.Element {
	const { character } = useCharacterStore();

	return (
		<Box>
			<Title order={3} mb="sm">Skills</Title>

			<SimpleGrid cols={{ base: 1, xs: 2, sm: 4 }}>
				{Object.values(character.skills).map(skill => {
					return (
						<SkillBox
							key={skill.name}
							name={skill.name}
							attribute={skill.attribute}
							skillValue={skill.rank}
							setSkillValue={(value: number) => { useCharacterStore.getState().setSkill(skill.name, value); }}
						/>
					);
				})}

				<SpecialistSkill />
			</SimpleGrid>
		</Box>
	);
}
