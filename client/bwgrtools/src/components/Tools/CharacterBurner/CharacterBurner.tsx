import { Fragment, useState } from "react";

import Typography from "@mui/material/Typography";

import { LifepathSelection } from "./Modals/LifepathSelection";

import { Basics } from "./Sections/Basics";
import { Stats } from "./Sections/Stats";
import { Skills } from "./Sections/Skills";
import { Traits } from "./Sections/Traits";
import { Attributes } from "./Sections/Attributes";


export function CharacterBurner(): JSX.Element {
	const [currentModal, setCurrentModal] = useState<CharacterBurnerModals | null>(null);

	const openModal = (name: CharacterBurnerModals) => setCurrentModal(name);
	const closeModals = () => setCurrentModal(null);

	return (
		<Fragment>
			<Typography variant="h3">Character Burner</Typography>

			<Basics openModal={openModal} />
			<Stats />
			<Skills />
			<Traits />
			<Attributes />
			{/* TODO
			
			<Resources />
			<Tolerances />
			<Beliefs />
			<Instincts />
			*/}

			<LifepathSelection isOpen={currentModal === "lp"} close={closeModals} />
			{/*
			<AnswerQuestions />
			<ChooseResources />
			<ChooseGeneralSkills />
			<ChooseGeneralLifepaths />
			<ChooseSpecial /> --- StockSpecific, SpecialLifepaths, SpecialSkills
			*/}
		</Fragment>
	);
}
