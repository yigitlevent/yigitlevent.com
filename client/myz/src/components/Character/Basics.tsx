import { Box, NativeSelect, NumberInput, SimpleGrid, TextInput, Title } from "@mantine/core";

import { Roles, SpecialistSkills, useCharacterStore } from "../../hooks/useCharacterStore";


export function Basics(): React.JSX.Element {
	const { character, setName, setAge, setRoleName, setFace, setBody, setClothings, setSpecialistSkill } = useCharacterStore();

	const selectedRole = Roles.find(role => role.name === character.roleName);

	return (
		<Box>
			<Title order={3} mb="sm">Basics</Title>

			<SimpleGrid cols={{ base: 1, xs: 2, sm: 3 }}>
				<TextInput
					label="Name"
					value={character.name}
					onChange={event => { setName(event.currentTarget.value); }}
				/>

				<NumberInput
					label="Age"
					value={character.age}
					onChange={value => { setAge(value as number); }}
				/>

				<NativeSelect
					label="Role"
					value={character.roleName}
					onChange={event => {
						const role = Roles.find(r => r.name === event.currentTarget.value);
						const specialistSkill = SpecialistSkills.find(skill => skill.name === role?.specialistSkillName);
						setFace("");
						setBody("");
						setClothings("");
						if (role && specialistSkill) {
							setRoleName(role.name);
							setSpecialistSkill(specialistSkill.name, specialistSkill.rank, specialistSkill.attribute);
						}
					}}
				>
					<option value="" />
					{Roles.map(role => (<option key={role.name} value={role.name}>{role.name}</option>))}
				</NativeSelect>

				<NativeSelect
					label="Face"
					value={character.appearance.face}
					onChange={event => { setFace(event.currentTarget.value); }}
					disabled={!selectedRole}
				>
					<option value="" />

					{selectedRole ? selectedRole.appearance.face.map(faceOption => (
						<option key={faceOption} value={faceOption}>
							{faceOption}
						</option>
					)) : null}
				</NativeSelect>

				<NativeSelect
					label="Body"
					value={character.appearance.body}
					onChange={event => { setBody(event.currentTarget.value); }}
					disabled={!selectedRole}
				>
					<option value="" />

					{selectedRole ? selectedRole.appearance.body.map(bodyOption => (
						<option key={bodyOption} value={bodyOption}>
							{bodyOption}
						</option>
					)) : null}
				</NativeSelect>

				<NativeSelect
					label="Clothings"
					value={character.appearance.clothings}
					onChange={event => { setClothings(event.currentTarget.value); }}
					disabled={!selectedRole}
				>
					<option value="" />

					{selectedRole ? selectedRole.appearance.clothing.map(clothingOption => (
						<option key={clothingOption} value={clothingOption}>
							{clothingOption}
						</option>
					)) : null}
				</NativeSelect>
			</SimpleGrid>
		</Box>
	);
}
