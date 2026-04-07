import { Box, Checkbox, SimpleGrid, Title } from "@mantine/core";

import { useCharacterStore } from "../../hooks/useCharacterStore";


interface AttributeBoxProps {
	title: AttributeName;
	attValue: number;
	setAttValue: (value: number) => void;
	penaltyTitle: string;
	penaltyValue: number;
	setDmgValue: (value: number) => void;
}

function AttributeBox({ title, attValue, setAttValue, penaltyTitle, penaltyValue, setDmgValue }: AttributeBoxProps): React.JSX.Element {
	return (
		<Box>
			<Title order={4} mb="sm">{title}</Title>

			<Box>
				{[1, 2, 3, 4, 5].map(boxValue => {
					return (
						<Checkbox
							key={"attribute-" + title + "-" + String(boxValue)}
							color="cyan"
							icon={() => <span />}
							checked={attValue >= boxValue}
							onClick={() => { setAttValue(boxValue); }}
							style={{ display: "inline-block", marginRight: "0.5rem" }}
						/>
					);
				})}
			</Box>

			{/* <Box>
				<Title order={6}>{penaltyTitle}</Title>

				{[1, 2, 3, 4, 5].map(boxValue => {
					return (
						<Checkbox
							key={"penalty-" + penaltyTitle + "-" + String(boxValue)}
							color="orange"
							icon={() => <span />}
							checked={penaltyValue >= boxValue}
							onClick={() => {
								if (penaltyValue === boxValue) setDmgValue(boxValue - 1);
								else setDmgValue(boxValue);
							}}
							style={{ display: "inline-block", marginRight: "0.5rem" }}
						/>
					);
				})}
			</Box> */}
		</Box>
	);
}

export function Attributes(): React.JSX.Element {
	const { character, setHasExtraMutation: setExtraMutation, setAttribute, setPenalty } = useCharacterStore();

	return (
		<Box>
			<Title order={3} mb="sm">
				Attributes

				<Checkbox
					label="Gain extra mutation"
					size="xs"
					checked={character.hasExtraMutation}
					onClick={() => { setExtraMutation(!character.hasExtraMutation); }}
					style={{ display: "inline-block", marginLeft: "2rem" }}
				/>
			</Title>

			<SimpleGrid cols={{ base: 1, xs: 2, sm: 4 }}>
				{Object.values(character.attributes).map(attribute => {
					return (
						<AttributeBox
							key={attribute.name}
							title={attribute.name}
							attValue={attribute.base}
							setAttValue={value => { setAttribute(attribute.name, value); }}
							penaltyTitle={attribute.penaltyName}
							penaltyValue={attribute.penalty}
							setDmgValue={value => { setPenalty(attribute.name, value); }}
						/>
					);
				})}
			</SimpleGrid>
		</Box>
	);
}
