import { Accordion } from "@mantine/core";
import { Fragment } from "react/jsx-runtime";

import { AddRumor } from "./AdminPanel.AddRumor";
import { DeleteMegagames } from "./AdminPanel.DeleteMegagames";
import { SetMegagame } from "./AdminPanel.SetMegagame";
import { useMegagameStore } from "../../hooks/useMegagameStore";


export function AdminPanel(): React.JSX.Element {
	const { megagame } = useMegagameStore();

	return (
		<Accordion variant="separated" radius="xs" mt="md" chevronIconSize={20} defaultValue="add-rumor-form">
			{megagame === undefined
				? <SetMegagame />
				: <Fragment>
					<AddRumor />
					<DeleteMegagames />
				</Fragment>}
		</Accordion>
	);
}
