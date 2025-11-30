import { Paper, Title, Text, NumberInput, Button, Blockquote, List } from "@mantine/core";
import { Info } from "lucide-react";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";


function SpiceBlow(): React.JSX.Element {
	const spiceBlowRegions = [
		// Open Desert
		"100", "101", "102", "103", "104", "200", "201", "202", "203", "204", "205", "206", "207", "300", "301", "302", "303", "304", "305", "306", "307", "308", "309", "310", "311", "312", "313", "314", "315", "400", "401", "402", "403", "404", "405", "406", "407", "408", "409", "410", "411", "412", "413", "414", "415"
	];

	const [spiceBlowCount, setSpiceBlowCount] = useState<number>(4);
	const [spiceBlowAmount, setSpiceBlowAmount] = useState<number>(8);

	const [createdSpiceBlows, setCreatedSpiceBlows] = useState<{ regionCode: string; amount: number; }[]>([]);

	return (
		<Paper shadow="md" radius="xs" p="xl" bd="1px solid rgba(0,0,0,0.1)" mt="md">
			<Title order={2} mb="md">Spice Blow</Title>

			<NumberInput
				label="Spice Blow Count"
				mb="xs"
				value={spiceBlowCount}
				onChange={newValue => { setSpiceBlowCount(Number(newValue)); }}
			/>

			<NumberInput
				label="Spice Blow Amount"
				mb="xs"
				leftSection={<Text>1D</Text>}
				value={spiceBlowAmount}
				onChange={newValue => { setSpiceBlowAmount(Number(newValue)); }}
			/>

			<Button
				variant="light"
				color="yellow"
				fullWidth
				onClick={() => {
					const selectedRegions = [];
					const usedIndices = new Set<number>();

					while (selectedRegions.length < spiceBlowCount) {
						const randomIndex = Math.floor(Math.random() * spiceBlowRegions.length);
						if (!usedIndices.has(randomIndex)) {
							usedIndices.add(randomIndex);
							selectedRegions.push(spiceBlowRegions[randomIndex]);
						}
					}

					const spiceBlows = selectedRegions.map(regionCode => {
						const amount = Math.floor(Math.random() * spiceBlowAmount) + 1;
						return { regionCode, amount };
					});

					setCreatedSpiceBlows(spiceBlows.sort((a, b) => a.regionCode.localeCompare(b.regionCode)));
				}}
			>
				Generate Spice Blows
			</Button>

			{createdSpiceBlows.length > 0 ? (
				<Blockquote
					color="yellow"
					radius="xs"
					iconSize={30}
					icon={<Info color="yellow" size={20} />}
					style={{ marginTop: 15 }}
				>
					<Title order={4}>Spice Blows</Title>

					<List>
						{createdSpiceBlows.map((spiceBlow, index) => (
							<List.Item key={index}>
								{spiceBlow.amount}
								{" "}
								spice at
								{" "}
								{spiceBlow.regionCode}
							</List.Item>
						))}
					</List>
				</Blockquote>
			) : null}
		</Paper>
	);
}

function StormMovement(): React.JSX.Element {
	const stormRegions = [
		// Open Desert
		"100", "101", "102", "103", "104", "200", "201", "202", "203", "204", "205", "206", "207", "300", "301", "302", "303", "304", "305", "306", "307", "308", "309", "310", "311", "312", "313", "314", "315", "400", "401", "402", "403", "404", "405", "406", "407", "408", "409", "410", "411", "412", "413", "414", "415",
		// Polar Desert
		"000", "001",
		// Hagga Basin
		"500", "501", "502", "503", "504", "505",
		// Mainland
		"A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09", "A10", "A11", "A12", "A13", "A14", "A15", "A16", "A17", "A18", "A19", "A20", "A31", "A32", "A33", "A34", "A35", "A36", "A37", "A38", "A39",
		// Eastern Rocks
		"E01", "E02", "E03", "E04",
		// Southern Rocks
		"S01",
		// Western Rocks
		"W01", "W02", "W03", "W04", "W05", "W06",
		// Northern Rocks
		"N01", "N02",
		// Polar Sink
		"P00"
	];

	const [coriolisStormMaxMove, setCoriolisStormMaxMove] = useState<number>(3);
	const [randomStormCount, setRandomStormCount] = useState<number>(5);

	const [coriolisStormMovement, setCoriolisStormMovement] = useState<number>(0);
	const [randomStormMovements, setRandomStormMovements] = useState<string[]>([]);

	return (
		<Paper shadow="md" radius="xs" p="xl" bd="1px solid rgba(0,0,0,0.1)" mt="md">
			<Title order={2} mb="md">Storm Movement</Title>

			<NumberInput
				label="Coriolis Storm Max Move"
				mb="xs"
				leftSection={<Text>1D</Text>}
				value={coriolisStormMaxMove}
				onChange={newValue => { setCoriolisStormMaxMove(Number(newValue)); }}
			/>

			<NumberInput
				label="Random Storm Count"
				mb="xs"
				value={randomStormCount}
				onChange={newValue => { setRandomStormCount(Number(newValue)); }}
			/>

			<Button
				variant="light"
				color="yellow"
				fullWidth
				onClick={() => {
					setCoriolisStormMovement(Math.floor(Math.random() * coriolisStormMaxMove) + 1);

					const selectedRegions = new Set<string>();

					while (selectedRegions.size < randomStormCount) {
						const randomIndex = Math.floor(Math.random() * stormRegions.length);
						selectedRegions.add(stormRegions[randomIndex]);
					}

					setRandomStormMovements(Array.from(selectedRegions).sort());
				}}
			>
				Generate Storm Movements
			</Button>

			{randomStormMovements.length > 0 ? (
				<Blockquote
					color="yellow"
					radius="xs"
					iconSize={30}
					icon={<Info color="yellow" size={20} />}
					style={{ marginTop: 15 }}
				>
					<Title order={4}>Storm Movements</Title>

					<List>
						<List.Item>
							Coriolis Storms move
							{coriolisStormMovement}
							{" "}
							space(s)
						</List.Item>

						{randomStormMovements.map((regionCode, index) => (
							<List.Item key={index}>
								Random Storm at
								{regionCode}
							</List.Item>
						))}
					</List>
				</Blockquote>
			) : null}
		</Paper>
	);
}

export function DuneActions(): React.JSX.Element {
	return (
		<Fragment>
			<SpiceBlow />
			<StormMovement />
		</Fragment>
	);
}
