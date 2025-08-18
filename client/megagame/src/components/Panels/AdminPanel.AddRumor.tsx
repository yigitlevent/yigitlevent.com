import { Accordion, Button, TextInput } from "@mantine/core";
import { Fragment, useState } from "react";

import { useMegagameStore } from "../../hooks/useMegagameStore";


export function AddRumor(): React.JSX.Element {
	const { fetchRumors } = useMegagameStore();

	const [rumorTextEn, setRumorTextEn] = useState("");
	const [rumorTextTr, setRumorTextTr] = useState("");

	return (
		<Fragment>
			<Accordion.Item key={"add-rumor-form"} value={"add-rumor-form"}>
				<Accordion.Control>Add Rumor</Accordion.Control>

				<Accordion.Panel>
					<TextInput label="Text EN" value={rumorTextEn} onChange={(event) => setRumorTextEn(event.currentTarget.value)} mb="sm" />
					<TextInput label="Text TR" value={rumorTextTr} onChange={(event) => setRumorTextTr(event.currentTarget.value)} mb="md" />

					<Button
						onClick={() => {
							useMegagameStore.getState().addRumor(rumorTextEn, rumorTextTr);
							setRumorTextEn("");
							setRumorTextTr("");
							fetchRumors();
						}}
						fullWidth
					>
						Create Rumor
					</Button>
				</Accordion.Panel>
			</Accordion.Item>

			<Accordion.Item key={"delete-megagames"} value={"delete-megagames"}>
				<Accordion.Control>Delete All Megagames</Accordion.Control>

				<Accordion.Panel>
					<Button
						onClick={() => {
							useMegagameStore.getState().deleteMegagames();
							setRumorTextEn("");
							setRumorTextTr("");
						}}
						fullWidth
					>
						ARE YOU SURE?
					</Button>
				</Accordion.Panel>
			</Accordion.Item>
		</Fragment>
	);
}
