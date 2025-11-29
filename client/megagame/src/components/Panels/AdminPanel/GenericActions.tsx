import { Paper, Title, Button, TextInput, NumberInput, ActionIcon, Grid, Divider } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { CircleSlash } from "lucide-react";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";

import { useMegagameStore } from "../../../hooks/useMegagameStore";


function ResetMegagame(): React.JSX.Element {
	const { resetMegagame } = useMegagameStore();

	const timeZoneHours = (-(new Date().getTimezoneOffset() / 60)).toString().padStart(2, "0");

	const [startAt, setStartAt] = useState<string>(`2025-10-23 03:00:00+${timeZoneHours}`);
	const [endAt, setEndAt] = useState<string>(`2025-10-23 04:00:00+${timeZoneHours}`);
	const [name, setName] = useState<string>("Dune: Megagame");
	const [cycleStart, setCycleStart] = useState<number>(10195);
	const [cycleMinutes, setCycleMinutes] = useState<number>(10);
	const [events, setEvents] = useState<MegagameEvent[]>([
		{ cycleInterval: 1, type: "Spice toplama" },
		{ cycleInterval: 1, type: "Spice yaratımı" },
		{ cycleInterval: 1, type: "Yasa oylama sonu kontrolü" },
		{ cycleInterval: 2, type: "Fırtına hareketleri" },
		{ cycleInterval: 4, type: "CHOAM kar payları" },
		{ cycleInterval: 6, type: "Spacing Guild rüşveti" }
	]);

	return (
		<Paper shadow="md" radius="xs" p="xl" bd="1px solid rgba(0,0,0,0.1)" mt="md">
			<Title order={2} mb="md">Reset Megagame</Title>

			<TextInput
				placeholder="Enter megagame name..."
				label="Megagame Name"
				mb="xs"
				value={name}
				onChange={(event) => { setName(event.currentTarget.value); }}
			/>

			<DateTimePicker
				placeholder="Select start date and time..."
				label="Start Datetime"
				mb="xs"
				value={startAt}
				onChange={date => { if (date) setStartAt(date + `+${timeZoneHours}`); }}
			/>

			<DateTimePicker
				placeholder="Select end date and time..."
				label="End Datetime"
				mb="xs"
				value={endAt}
				onChange={date => { if (date) setEndAt(date + `+${timeZoneHours}`); }}
			/>

			<NumberInput
				placeholder="Enter cycle start..."
				label="Cycle Start"
				mb="xs"
				value={cycleStart}
				onChange={newValue => { setCycleStart(Number(newValue)); }}
			/>

			<NumberInput
				placeholder="Enter cycle duration (minutes)..."
				label="Cycle Duration (minutes)"
				mb="xs"
				value={cycleMinutes}
				onChange={newValue => { setCycleMinutes(Number(newValue)); }}
			/>

			<Divider my="sm" />
			<Title order={4} mt="md" mb="xs">Events</Title>

			{events.map((event, index) => (
				<Grid key={index}>
					<Grid.Col span={3}>
						<NumberInput
							placeholder="Enter cycle interval..."
							label="Cycle Interval"
							mb="xs"
							value={event.cycleInterval}
							onChange={newValue => {
								const updatedEvents = [...events];
								updatedEvents[index].cycleInterval = Number(newValue);
								setEvents(updatedEvents);
							}}
						/>
					</Grid.Col>

					<Grid.Col span={8}>
						<TextInput
							placeholder="Enter event type..."
							label="Event Type"
							mb="xs"
							value={event.type}
							onChange={eventChange => {
								const updatedEvents = [...events];
								updatedEvents[index].type = eventChange.currentTarget.value;
								setEvents(updatedEvents);
							}}
						/>
					</Grid.Col>

					<Grid.Col span={1}>
						<ActionIcon
							variant="subtle"
							color="red"
							style={{ marginTop: 26 }}
							onClick={() => {
								const updatedEvents = events.filter((_, i) => i !== index);
								setEvents(updatedEvents);
							}}
						>
							<CircleSlash color="red" size={20} />
						</ActionIcon>
					</Grid.Col>
				</Grid>
			))}

			<Button
				variant="light"
				color="yellow"
				mb="xs"
				fullWidth
				onClick={() => {
					const newEvent: MegagameEvent = {
						cycleInterval: 1,
						type: "New Event"
					};
					setEvents([...events, newEvent]);
				}}
			>
				Add Event
			</Button>

			<Divider my="sm" />

			<Button
				variant="light"
				color="yellow"
				fullWidth
				onClick={() => {
					if (window.confirm("Are you sure you want to reset the megagame? This action cannot be undone.")) {
						resetMegagame({ startAt, endAt, name, cycleStart, cycleMinutes, events });
					}
				}}
			>
				Reset Megagame
			</Button>
		</Paper>
	);
}

function AddDeadline(): React.JSX.Element {
	const { megagame, createDeadlineItem } = useMegagameStore();

	const [deadlineType, setDeadlineType] = useState<string>("Yasa Tasarısı #1");

	if (!megagame) return <Fragment />;

	return (
		<Paper shadow="md" radius="xs" p="xl" bd="1px solid rgba(0,0,0,0.1)" mt="md">
			<Title order={2} mb="md">Add Deadline</Title>

			<TextInput
				placeholder="Enter deadline type..."
				label="Deadline Type"
				mb="xs"
				value={deadlineType}
				onChange={(event) => { setDeadlineType(event.currentTarget.value); }}
			/>

			<Button
				variant="light"
				color="yellow"
				fullWidth
				onClick={() => {
					if (window.confirm("Are you sure you want to add a deadline? This action cannot be undone.")) {
						createDeadlineItem({
							megagameId: megagame.id,
							type: deadlineType,
							deadline: new Date(Date.now() + 25 * 60 * 1000).toISOString()
						});
					}
				}}
			>
				Add Deadline
			</Button>
		</Paper>
	);
}

export function GenericActions(): React.JSX.Element {
	return (
		<Fragment>
			<AddDeadline />
			<ResetMegagame />
		</Fragment>
	);
}
