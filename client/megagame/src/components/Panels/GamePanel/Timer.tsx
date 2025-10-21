import { Paper, Title, Text } from "@mantine/core";
import { Fragment, useCallback } from "react";

import { useMegagameStore } from "../../../hooks/useMegagameStore";
import { useTimer } from "../../../hooks/useTimer";
import { Localisation } from "../../../utils/Localization";


export function Timer(): React.JSX.Element {
	const { lang, megagame } = useMegagameStore();
	const { cycleCount, countdown } = useTimer();

	const getCountdownText = useCallback(() => {
		if (countdown.minutes > 0 && countdown.seconds > 0) return Localisation.countdownMinutesAndSeconds[lang](countdown.minutes, countdown.seconds);
		else if (countdown.minutes > 0 && countdown.seconds === 0) return Localisation.countdownMinutes[lang](countdown.minutes);
		else if (countdown.minutes === 0 && countdown.seconds > 0) return Localisation.countdownSeconds[lang](countdown.seconds);
		else return Localisation.countdownNewCycle[lang];
	}, [countdown.minutes, countdown.seconds, lang]);

	if (!megagame) return <Fragment />;

	return (
		<Paper shadow="md" radius="xs" p="xl" bd="1px solid rgba(0,0,0,0.1)" mt="md">
			<Title order={3} mb="sm">
				{Localisation.cycleName[lang]} {megagame.cycle.start + cycleCount} ({Localisation.cycleCount[lang](cycleCount)})
			</Title>

			<Text>{getCountdownText()}</Text>
		</Paper>
	);
}
