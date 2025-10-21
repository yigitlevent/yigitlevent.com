import { ActionIcon, Blockquote, Box, TextInput, Title, Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Languages, CircleUser, Info, Shield } from "lucide-react";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Deadline } from "./GamePanel/Deadlines";
import { News } from "./GamePanel/News";
import { OrderQueues } from "./GamePanel/OrderQueues";
import { Timer } from "./GamePanel/Timer";
import { useMegagameStore } from "../../hooks/useMegagameStore";
import { Localisation } from "../../utils/Localization";


export function FactionSelectionModalContent({ closeModal }: { closeModal: () => void; }): React.JSX.Element {
	const { lang, megagame, setUserType } = useMegagameStore();
	const [factionCode, setFactionCode] = useState<string>("");
	const [error, setError] = useState<string>("");

	return (
		<Fragment>
			<TextInput
				placeholder={Localisation.enterFactionCode[lang]}
				value={factionCode}
				onChange={(event) => setFactionCode(event.currentTarget.value)}
				error={error}
			/>

			<Button
				mt="md"
				variant="light"
				color="yellow"
				fullWidth
				onClick={() => {
					setError("");

					if (megagame) {
						const faction = megagame.factions.find(faction => faction.factionCode === factionCode);
						if (faction) {
							setUserType(faction.name);
							closeModal();
						}
						else setError(Localisation.invalidFactionCode[lang]);
					}
				}}
			>
				{Localisation.submit[lang]}
			</Button>
		</Fragment>
	);
}

export function TitleWithActions({ openModal }: { openModal: () => void; }): React.JSX.Element {
	const { lang, setLang, megagame } = useMegagameStore();
	const navigate = useNavigate();

	return (
		<Title order={1}>
			{megagame ? megagame.name : "Megagame"}

			<ActionIcon
				ml="md"
				variant="default"
				style={{ float: "right", margin: "10px 0" }}
				onClick={() => setLang(lang === "en" ? "tr" : "en")}
			>
				<Languages color="white" size={20} />
			</ActionIcon>

			<ActionIcon
				ml="md"
				variant="default"
				style={{ float: "right", margin: "10px 0" }}
				onClick={() => openModal()}
			>
				<CircleUser color="white" size={20} />
			</ActionIcon>

			<ActionIcon
				ml="md"
				variant="default"
				style={{ float: "right", margin: "10px 0" }}
				onClick={() => navigate("/admin")}
			>
				<Shield color="white" size={20} />
			</ActionIcon>
		</Title>
	);
}

function FactionBox(): React.JSX.Element {
	const { userType } = useMegagameStore();

	return (
		<Fragment>
			<Title order={3} style={{ marginTop: 20 }}>{userType}</Title>
		</Fragment>
	);
}

export function GamePanel(): React.JSX.Element {
	const { lang, fetchMegagameState } = useMegagameStore();
	const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);

	return (
		<Box>
			<TitleWithActions openModal={openModal} />
			<FactionBox />

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

			<Modal opened={opened} onClose={closeModal} title={Localisation.factionSelection[lang]} centered>
				<FactionSelectionModalContent closeModal={closeModal} />
			</Modal>
		</Box>
	);
}
