import Typography from "@mui/material/Typography";
import { Fragment, useEffect, useState } from "react";


import { LifepathSelection } from "./Modals/LifepathSelection";
import { Attributes } from "./Sections/Attributes";
import { Basics } from "./Sections/Basics";
import { Skills } from "./Sections/Skills";
import { Stats } from "./Sections/Stats";
import { Traits } from "./Sections/Traits";
import { useCharacterBurnerAttributeStore } from "../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerAttribute";
import { useCharacterBurnerLifepathStore } from "../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerLifepath";
import { useCharacterBurnerSkillStore } from "../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerSkill";
import { useCharacterBurnerTraitStore } from "../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerTrait";


export function CharacterBurner(): JSX.Element {
	const { updateAvailableLifepaths } = useCharacterBurnerLifepathStore();
	const { skills } = useCharacterBurnerSkillStore();
	const { traits } = useCharacterBurnerTraitStore();
	const { attributes } = useCharacterBurnerAttributeStore();

	const [currentModal, setCurrentModal] = useState<CharacterBurnerModals | null>(null);

	const openModal = (name: CharacterBurnerModals) => setCurrentModal(name);
	const closeModals = () => setCurrentModal(null);

	useEffect(() => {
		updateAvailableLifepaths();
	}, [updateAvailableLifepaths]);

	return (
		<Fragment>
			<Typography variant="h3">Character Burner</Typography>

			<Basics openModal={openModal} />

			<Stats />

			{skills.length > 0 ? <Skills /> : null}

			{traits.length > 0 ? <Traits /> : null}

			{attributes.length > 0 ? <Attributes /> : null}

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
