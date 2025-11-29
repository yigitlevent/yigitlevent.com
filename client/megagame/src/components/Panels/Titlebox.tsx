import { Title, ActionIcon, Modal, Button, TextInput, Box, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Languages, Shield, BookText, DicesIcon, Users } from "lucide-react";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { useLocation, useNavigate } from "react-router-dom";

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
				onChange={(event) => { setFactionCode(event.currentTarget.value); }}
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

export function Titlebox(): React.JSX.Element {
	const { lang, setLang, userType, megagame } = useMegagameStore();
	const [opened, modal] = useDisclosure(false);
	const navigate = useNavigate();
	const location = useLocation();

	const page
		= location.pathname === "/rules" ? Localisation.rulebooks[lang]
			: location.pathname === "/admin" ? Localisation.admin[lang]
				: Localisation.gamePage[lang];


	return (
		<Box>
			<Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<Title order={1}>
					{megagame ? megagame.name : "Megagame"}
				</Title>

				<Box>
					<ActionIcon
						ml="md"
						variant="default"
						style={{ float: "right", margin: "10px 0" }}
						onClick={() => { setLang(lang === "en" ? "tr" : "en"); }}
					>
						<Languages color="white" size={20} />
					</ActionIcon>

					<ActionIcon
						ml="md"
						variant="default"
						style={{ float: "right", margin: "10px 0" }}
						onClick={() => void navigate("/admin")}
						disabled={location.pathname === "/admin"}
					>
						<Shield color="white" size={20} />
					</ActionIcon>

					<ActionIcon
						ml="md"
						variant="default"
						style={{ float: "right", margin: "10px 0" }}
						onClick={() => void navigate("/rules")}
						disabled={location.pathname === "/rules"}
					>
						<BookText color="white" size={20} />
					</ActionIcon>

					<ActionIcon
						ml="md"
						variant="default"
						style={{ float: "right", margin: "10px 0" }}
						onClick={() => void navigate("/")}
						disabled={location.pathname === "/"}
					>
						<DicesIcon color="white" size={20} />
					</ActionIcon>

					<ActionIcon
						ml="md"
						variant="default"
						style={{ float: "right", margin: "10px 0" }}
						onClick={() => { modal.open(); }}
					>
						<Users color="white" size={20} />
					</ActionIcon>
				</Box>
			</Box>

			<Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<Title order={5}>{page}</Title>
				<Text>{Localisation.chosenFaction[lang]}: {userType}</Text>
			</Box>

			<Modal opened={opened} onClose={modal.close} title={Localisation.factionSelection[lang]} centered>
				<FactionSelectionModalContent closeModal={modal.close} />
			</Modal>
		</Box>
	);
}
