import { Fragment, useState } from "react";

import Typography from "@mui/material/Typography";

import { Basics } from "./Sections/Basics";
import { Stats } from "./Sections/Stats";
import { LifepathSelection } from "./Modals/LifepathSelection";


export function CharacterBurner(): JSX.Element {
	const [currentModal, setCurrentModal] = useState<CharacterBurnerModals | null>(null);

	const openModal = (name: CharacterBurnerModals) => setCurrentModal(name);
	const closeModals = () => setCurrentModal(null);

	return (
		<Fragment>
			<Typography variant="h3">Character Burner</Typography>

			<Basics openModal={openModal} />
			<Stats />

			<LifepathSelection isOpen={currentModal === "lp"} close={closeModals} />
		</Fragment>
	);
}
