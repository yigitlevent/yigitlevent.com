import { ActionIcon, Box, Title } from "@mantine/core";
import { Languages } from "lucide-react";
import { Fragment, useState } from "react";

import { Events } from "./GamePanel.Events";
import { Rumors } from "./GamePanel.Rumors";
import { Timer } from "./GamePanel.Timer";
import { useMegagameStore } from "../../hooks/useMegagameStore";
import { useTimer } from "../../hooks/useTimer";


export function GamePanel(): React.JSX.Element {
	const { megagame } = useMegagameStore();
	const { cycleCount, countdown } = useTimer();

	const [lang, setLang] = useState<"en" | "tr">("tr");

	if (!megagame) return <Fragment />;

	return (
		<Box>
			<Title order={1}>
				{megagame.name}

				<ActionIcon
					ml="md"
					variant="default"
					onClick={() => setLang(lang === "en" ? "tr" : "en")}
				>
					<Languages color="white" size={20} />
				</ActionIcon>
			</Title>

			<Timer lang={lang} cycleCount={cycleCount} countdown={countdown} />
			<Events lang={lang} cycleCount={cycleCount} />
			<Rumors lang={lang} />
		</Box>
	);
}
