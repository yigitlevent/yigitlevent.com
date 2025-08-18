import { Accordion, Button } from "@mantine/core";
import { Fragment } from "react";

import { useMegagameStore } from "../../hooks/useMegagameStore";


export function DeleteMegagames(): React.JSX.Element {
	return (
		<Fragment>
			<Accordion.Item key={"delete-megagames-form"} value={"delete-megagames-form"}>
				<Accordion.Control>Delete Megagame</Accordion.Control>

				<Accordion.Panel>
					<Button
						onClick={() => useMegagameStore.getState().deleteMegagames()}
						fullWidth
					>
						DELETE ALL MEGAGAMES
					</Button>
				</Accordion.Panel>
			</Accordion.Item>
		</Fragment>
	);
}
