import { Blockquote, Box } from "@mantine/core";
import { Info } from "lucide-react";
import { Fragment } from "react";

import { Deadline } from "./GamePanel/Deadlines";
import { News } from "./GamePanel/News";
import { OrderQueues } from "./GamePanel/OrderQueues";
import { Timer } from "./GamePanel/Timer";
import { Titlebox } from "./Titlebox";
import { useMegagameStore } from "../../hooks/useMegagameStore";
import { Localisation } from "../../utils/Localization";


export function GamePanel(): React.JSX.Element {
	const { lang, fetchMegagameState } = useMegagameStore();

	return (
		<Box>
			<Titlebox />

			{fetchMegagameState === "waiting" || fetchMegagameState === "requesting"
				? <Blockquote color="yellow" radius="xs" iconSize={30} icon={<Info color="orange" size={20} />}>{Localisation.loading[lang]}</Blockquote>
				: null}

			{fetchMegagameState === "failed"
				? <Blockquote color="red" radius="xs" iconSize={30} icon={<Info color="red" size={20} />} mt="xl">
					{Localisation.failedToFetchMegagameData[lang]}
				</Blockquote>
				: null}

			{fetchMegagameState === "succeded"
				? <Fragment>
					<Timer />
					<Deadline />
					<News />
					<OrderQueues />
				</Fragment>
				: null}
		</Box>
	);
}
