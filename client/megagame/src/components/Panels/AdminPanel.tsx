import { Box } from "@mantine/core";
import { Fragment } from "react";

import { DuneActions } from "./AdminPanel/DuneActions";
import { GenericActions } from "./AdminPanel/GenericActions";
import { SignInOut } from "./AdminPanel/SignInOut";
import { Titlebox } from "./Titlebox";
import { useUserStore } from "../../hooks/useUserStore";


export function AdminPanel(): React.JSX.Element {
	const { hasAccess } = useUserStore();

	return (
		<Box>
			<Titlebox />

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
