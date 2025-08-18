import { Accordion, Text, Button, TextInput, Select } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useState } from "react";

import { useMegagameStore } from "../../hooks/useMegagameStore";


export function SetMegagame(): React.JSX.Element {
	const { fetchData } = useMegagameStore();

	const [megagameName, setMegagameName] = useState("");
	const [megagameType, setMegagameType] = useState<string | null>("dune");
	const [megagameStart, setMegagameStart] = useState<string | null>(null);
	const [megagameEnd, setMegagameEnd] = useState<string | null>(null);
	const [cycleStart, setCycleStart] = useState<number>(2025);
	const [cycleMinutes, setCycleMinutes] = useState<number>(5);
	const [events, setEvents] = useState<SetMegagameRequestEvent[]>([]);

	const getTimeString = (dateString: string): string => {
		return new Date(dateString).toISOString();
	};

	return (
		<Accordion.Item key={"set-megagame-form"} value={"set-megagame-form"}>
			<Accordion.Control>Create Megagame</Accordion.Control>

			<Accordion.Panel>
				<TextInput label="Name" value={megagameName} onChange={(event) => setMegagameName(event.currentTarget.value)} mb="sm" />
				<Select label="Type" data={["wod", "dune"]} value={megagameType} onChange={setMegagameType} mb="sm" />
				<DateTimePicker label="Start Date/Time" value={megagameStart} onChange={setMegagameStart} mb="sm" />
				<DateTimePicker label="End Date/Time" value={megagameEnd} onChange={setMegagameEnd} mb="sm" />
				<TextInput label="Cycle Start" type="number" value={cycleStart.toString()} onChange={(event) => setCycleStart(Number(event.currentTarget.value))} mb="sm" />
				<TextInput label="Cycle Minutes" type="number" value={cycleMinutes.toString()} onChange={(event) => setCycleMinutes(Number(event.currentTarget.value))} mb="sm" />

				<Button
					onClick={() => {
						setEvents([...events, {
							name: {
								en: "Event " + (events.length + 1),
								tr: "Olay " + (events.length + 1)
							},
							description: {
								en: "",
								tr: ""
							},
							cycleInterval: 1
						}]);
					}}
					fullWidth
					mb="sm"
				>
					Add New Event
				</Button>

				<Button
					onClick={() => {
						setEvents(events.filter((_, index) => index !== events.length - 1));
					}}
					fullWidth
					mb="sm"
				>
					Remove Last Event
				</Button>

				{events.length > 0
					? <Accordion variant="separated" radius="xs" chevronIconSize={20} defaultValue="add-rumor-form">
						{events.map((event, index) => (
							<Accordion.Item key={index} value={`${index}`}>
								<Accordion.Control>{event.name.en}</Accordion.Control>

								<Accordion.Panel>
									<TextInput label="Name EN" value={event.name.en} onChange={(e) => {
										const newEvents = [...events];
										newEvents[index].name.en = e.currentTarget.value;
										setEvents(newEvents);
									}} mb="sm" />

									<TextInput label="Name TR" value={event.name.tr} onChange={(e) => {
										const newEvents = [...events];
										newEvents[index].name.tr = e.currentTarget.value;
										setEvents(newEvents);
									}} mb="sm" />

									<TextInput label="Description EN" value={event.description.en} onChange={(e) => {
										const newEvents = [...events];
										newEvents[index].description.en = e.currentTarget.value;
										setEvents(newEvents);
									}} mb="sm" />

									<TextInput label="Description TR" value={event.description.tr} onChange={(e) => {
										const newEvents = [...events];
										newEvents[index].description.tr = e.currentTarget.value;
										setEvents(newEvents);
									}} mb="sm" />

									<TextInput label="Cycle Interval" type="number" value={event.cycleInterval.toString()} onChange={(e) => {
										const newEvents = [...events];
										newEvents[index].cycleInterval = Number(e.currentTarget.value);
										setEvents(newEvents);
									}} mb="sm" />
								</Accordion.Panel>
							</Accordion.Item>
						))}
					</Accordion>
					: <Text mb="sm">No events added yet.</Text>}

				<Button
					onClick={() => {
						const rq: SetMegagameRequest = {
							name: megagameName,
							type: megagameType as "wod" | "dune",
							timing: {
								start: getTimeString(megagameStart!),
								end: getTimeString(megagameEnd!)
							},
							cycle: {
								start: cycleStart,
								minutes: cycleMinutes
							},
							events: events
						};
						useMegagameStore.getState().createMegagame(rq);
						fetchData();
					}}
					fullWidth
					mt="md"
				>
					Set Megagame
				</Button>
			</Accordion.Panel>
		</Accordion.Item>
	);
}
