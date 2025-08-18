import { Paper, Title, Accordion, Text } from "@mantine/core";
import { Fragment } from "react/jsx-runtime";

import { useMegagameStore } from "../../hooks/useMegagameStore";
import { Localisation } from "../../utils/Localization";


export function Events({ lang, cycleCount }: { lang: "en" | "tr"; cycleCount: number; }): React.JSX.Element {
	const { megagame } = useMegagameStore();

	if (!megagame) return <Fragment />;

	return (
		<Paper shadow="md" radius="xs" p="xl" bd="1px solid rgba(0,0,0,0.1)" mt="md">
			<Title order={3} mb="sm">
				{Localisation.events[lang]}
			</Title>

			{megagame.events.filter(event => cycleCount % event.cycleInterval === 0).length > 0
				? <Accordion variant="separated" radius="xs" chevronIconSize={20}>
					{megagame.events
						.filter(event => cycleCount % event.cycleInterval === 0)
						.map(event => (
							<Accordion.Item key={event.name.tr} value={event.name.tr}>
								<Accordion.Control>{event.name[lang]}</Accordion.Control>
								<Accordion.Panel>{event.description[lang]}</Accordion.Panel>
							</Accordion.Item>
						))}
				</Accordion>
				: <Text>{Localisation.noEvents[lang]}</Text>}
		</Paper>
	);
}
