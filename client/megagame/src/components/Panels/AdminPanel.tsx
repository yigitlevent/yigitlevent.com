import { ActionIcon, Box, Title } from "@mantine/core";
import { Undo2 } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import { DuneActions } from "./AdminPanel/DuneActions";
import { GenericActions } from "./AdminPanel/GenericActions";
import { SignInOut } from "./AdminPanel/SignInOut";
import { useMegagameStore } from "../../hooks/useMegagameStore";
import { useUserStore } from "../../hooks/useUserStore";


export function TitleWithActions(): React.JSX.Element {
	const { megagame } = useMegagameStore();
	const navigate = useNavigate();

	return (
		<Title order={1}>
			{megagame ? megagame.name : "Megagame"}

			<ActionIcon
				ml="md"
				variant="default"
				style={{ float: "right", margin: "10px 0" }}
				onClick={() => navigate("/")}
			>
				<Undo2 color="white" size={20} />
			</ActionIcon>
		</Title>
	);
}

export function AdminPanel(): React.JSX.Element {
	const { hasAccess } = useUserStore();

	return (
		<Box>
			<TitleWithActions />

			{hasAccess("Megagame Moderator" as UserAccess)
				? <Fragment>
					<DuneActions />
					<GenericActions />
				</Fragment>
				: null}

			<SignInOut />
		</Box>
	);
}
