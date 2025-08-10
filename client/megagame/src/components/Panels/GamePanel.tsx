import { Accordion, ActionIcon, Box, List, Paper, Text, ThemeIcon, Title } from "@mantine/core";
import { IconCircleCheck, IconLanguage } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";

import { useMegagameStore } from "../../hooks/apiStores/useMegagameStore";


const Localisation = {
	cycleName: {
		en: "Year",
		tr: "Yıl"
	},
	cycleCount: {
		en: (count: number) => `Cycle ${count}`,
		tr: (count: number) => `Döngü ${count}`
	},
	noEvents: {
		en: "No events this year.",
		tr: "Bu yıl olay yok."
	},
	events: {
		en: "Events",
		tr: "Olaylar"
	},
	noRumors: {
		en: "No rumors.",
		tr: "Söylenti yok."
	},
	rumors: {
		en: "Rumors",
		tr: "Söylentiler"
	},
	countdownMinutesAndSeconds: {
		en: (minutes: number, seconds: number) => `${minutes} minutes and ${seconds} seconds until next cycle.`,
		tr: (minutes: number, seconds: number) => `${minutes} dakika ve ${seconds} saniye sonra yeni döngü başlayacak.`
	},
	countdownMinutes: {
		en: (minutes: number) => `${minutes} minutes until next cycle.`,
		tr: (minutes: number) => `${minutes} dakika sonra yeni döngü başlayacak.`
	},
	countdownSeconds: {
		en: (seconds: number) => `${seconds} seconds until next cycle.`,
		tr: (seconds: number) => `${seconds} saniye sonra yeni döngü başlayacak.`
	},
	countdownNewCycle: {
		en: "New cycle started.",
		tr: "Yeni döngü başladı."
	}
};

export function GamePanel(): React.JSX.Element {
	const { megagame, rumors, fetchRumors } = useMegagameStore();

	const [lang, setLang] = useState<"en" | "tr">("tr");

	const getSecondsSinceStart = useCallback(() => {
		const start = new Date(megagame.timing.start).getTime();
		const current = new Date();
		return Math.floor((current.getTime() - start) / 1000);
	}, [megagame.timing.start]);

	const getCycleCount = useCallback(() => {
		const secondsSinceStart = getSecondsSinceStart();
		return Math.floor(secondsSinceStart / 60 / megagame.cycle.minutes);
	}, [getSecondsSinceStart, megagame.cycle.minutes]);

	const getMinutesAndSecondsUntilNextCycle = useCallback(() => {
		const secondsUntilNextCycle = (megagame.cycle.minutes * 60 * (getCycleCount() + 1)) - getSecondsSinceStart();

		return {
			minutes: Math.floor(secondsUntilNextCycle / 60),
			seconds: Math.floor(secondsUntilNextCycle % 60)
		};
	}, [getCycleCount, getSecondsSinceStart, megagame.cycle.minutes]);

	const [cycleCount, setCycleCount] = useState(getCycleCount());
	const [countdown, setCountdown] = useState(getMinutesAndSecondsUntilNextCycle());

	const getCountdownText = useCallback(() => {
		if (countdown.minutes > 0 && countdown.seconds > 0) return Localisation.countdownMinutesAndSeconds[lang](countdown.minutes, countdown.seconds);
		else if (countdown.minutes > 0 && countdown.seconds === 0) return Localisation.countdownMinutes[lang](countdown.minutes);
		else if (countdown.minutes === 0 && countdown.seconds > 0) return Localisation.countdownSeconds[lang](countdown.seconds);
		else return Localisation.countdownNewCycle[lang];
	}, [countdown.minutes, countdown.seconds, lang]);

	useEffect(() => {
		const i = setInterval(() => {
			setCycleCount(getCycleCount());
			setCountdown(getMinutesAndSecondsUntilNextCycle());
		}, 100);

		const r = setInterval(() => {
			fetchRumors();
		}, 10000);

		return () => {
			clearInterval(i);
			clearInterval(r);
		};
	}, [fetchRumors, getCycleCount, getMinutesAndSecondsUntilNextCycle, getSecondsSinceStart]);

	return (
		<Box>
			<Title order={1}>
				{megagame.name}

				<ActionIcon
					ml="md"
					variant="default"
					onClick={() => setLang(lang === "en" ? "tr" : "en")}
				>
					<IconLanguage />
				</ActionIcon>
			</Title>

			<Paper shadow="md" radius="xs" p="xl" bd="1px solid rgba(0,0,0,0.1)" mt="md">
				<Title order={3} mb="sm">
					{Localisation.cycleName[lang]} {megagame.cycle.start + cycleCount} ({Localisation.cycleCount[lang](cycleCount)})
				</Title>

				<Text>
					{getCountdownText()}
				</Text>
			</Paper>

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

			<Paper shadow="md" radius="xs" p="xl" bd="1px solid rgba(0,0,0,0.1)" mt="md">
				<Title order={3} mb="sm">
					{Localisation.rumors[lang]}
				</Title>

				{rumors.length > 0
					? <List
						spacing="md"
						center
						icon={
							<ThemeIcon color="teal" size={16} radius="xl">
								<IconCircleCheck size={12} />
							</ThemeIcon>
						}
					>
						{rumors.map(rumor =>
							<List.Item key={rumor.id}>{rumor.text[lang]}</List.Item>
						)}
					</List>
					: <Text>{Localisation.noRumors[lang]}</Text>}
			</Paper>
		</Box>
	);
}
