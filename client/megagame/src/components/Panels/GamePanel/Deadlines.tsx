import { Blockquote, ActionIcon, Title } from "@mantine/core";
import { CircleSlash, Info } from "lucide-react";
import { Fragment } from "react";

import { useDeadlineTimer } from "../../../hooks/useDeadlineTimer";
import { useMegagameStore } from "../../../hooks/useMegagameStore";
import { useUserStore } from "../../../hooks/useUserStore";
import { Localisation } from "../../../utils/Localization";


export function Deadline(): React.JSX.Element {
	const { lang, megagame, deleteDeadlineItem } = useMegagameStore();
	const { hasAccess } = useUserStore();
	const { deadlines } = useDeadlineTimer();

	if (!megagame) return <Fragment />;

	return (
		<Fragment>
			{megagame.deadlineItems.map(deadline => {
				const d = deadlines.find(d => d.id === deadline.id);
				if (!d) return null;

				return (
					<Blockquote
						key={deadline.id}
						color={d.deadlinePassed ? "red" : "yellow"}
						radius="xs"
						iconSize={30}
						icon={<Info color={d.deadlinePassed ? "red" : "yellow"} size={20} />}
						style={{ marginTop: 15 }}
					>
						<Title order={4}>{deadline.type}</Title>
						{Localisation.deadline[lang]}
						:
						{d.deadlinePassed ? Localisation.deadlinePassed[lang] : `${d.minutes}:${d.seconds}`}

						{hasAccess("Megagame Moderator" as UserAccess) ? (
							<ActionIcon
								ml="sm"
								variant="subtle"
								color="red"
								style={{ margin: "-1px 0 0 5px", display: "block", float: "right" }}
								onClick={() => { deleteDeadlineItem(deadline.id); }}
							>
								<CircleSlash color="red" size={20} />
							</ActionIcon>
						) : null}
					</Blockquote>
				);
			})}
		</Fragment>
	);
}
