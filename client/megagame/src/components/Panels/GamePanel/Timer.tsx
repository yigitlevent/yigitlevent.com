import { Paper, Title, Text, List, Checkbox, Blockquote } from "@mantine/core";
import { Info } from "lucide-react";
import { Fragment, useCallback, useEffect } from "react";

import { useMegagameStore } from "../../../hooks/useMegagameStore";
import { useTimer } from "../../../hooks/useTimer";
import { useUserStore } from "../../../hooks/useUserStore";
import { Localisation } from "../../../utils/Localization";


function EventsList({ cycleCount }: { cycleCount: number; }): React.JSX.Element {
	const { lang, megagame, events, setEventState } = useMegagameStore();
	const { hasAccess } = useUserStore();

	if (!megagame || !events) return <Fragment />;

	const relevantEventItems = megagame.events.filter(eventItem => cycleCount % eventItem.cycleInterval === 0);

	return (
		<Blockquote
			color="yellow"
			radius="xs"
			iconSize={30}
			icon={<Info size={20} />}
			style={{ marginTop: 15, padding: "12px 18px 18px" }}
		>
			<Title order={4}>{Localisation.events[lang]}</Title>

			<List
				type="ordered"
			>
				{relevantEventItems.map((eventItem, index) => (
					<List.Item key={index}>
						{hasAccess("Megagame Moderator" as UserAccess) ? (
							<Checkbox
								label={eventItem.type}
								color="yellow"
								variant="outline"
								ml="4px"
								style={{ position: "relative", top: 4 }}
								checked={events[eventItem.type] || false}
								onChange={event => { setEventState(eventItem.type, event.target.checked); }}
							/>
						) : <Text>{eventItem.type}</Text>}
					</List.Item>
				))}
			</List>
		</Blockquote>
	);
}


export function Timer(): React.JSX.Element {
	const { lang, megagame, resetEventStates } = useMegagameStore();
	const { cycleCount, countdown } = useTimer();

	useEffect(() => {
		resetEventStates();
	}, [cycleCount, resetEventStates]);

	const getCountdownText = useCallback(() => {
		if (countdown.minutes > 0 && countdown.seconds > 0) return Localisation.countdownMinutesAndSeconds[lang](countdown.minutes, countdown.seconds);
		else if (countdown.minutes > 0 && countdown.seconds === 0) return Localisation.countdownMinutes[lang](countdown.minutes);
		else if (countdown.minutes === 0 && countdown.seconds > 0) return Localisation.countdownSeconds[lang](countdown.seconds);
		else return Localisation.countdownNewCycle[lang];
	}, [countdown.minutes, countdown.seconds, lang]);

	if (!megagame) return <Fragment />;

	return (
		<Paper shadow="md" radius="xs" p="xl" bd="1px solid rgba(0,0,0,0.1)" mt="md">
			<Title order={2} mb="md">
				{Localisation.cycleName[lang]}
				{" "}
				{megagame.cycle.start + cycleCount}
				{" "}
				(
				{Localisation.cycleCount[lang](cycleCount)}
				)
			</Title>

			<Text>{getCountdownText()}</Text>
			<EventsList cycleCount={cycleCount} />
		</Paper>
	);
}
