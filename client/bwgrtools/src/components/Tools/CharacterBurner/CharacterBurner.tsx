import Typography from "@mui/material/Typography";
import { Fragment, useEffect, useState } from "react";


import { LifepathSelection } from "./Modals/LifepathSelection";
import { ResourceSelection } from "./Modals/ResourceSelection";
import { Attributes } from "./Sections/Attributes";
import { Basics } from "./Sections/Basics";
import { Beliefs } from "./Sections/Beliefs";
import { Instincts } from "./Sections/InstinctsBlock";
import { Resources } from "./Sections/Resources";
import { Skills } from "./Sections/Skills";
import { Stats } from "./Sections/Stats";
import { Tolerances } from "./Sections/Tolerances";
import { Traits } from "./Sections/Traits";
import { useCharacterBurnerAttributeStore } from "../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerAttribute";
import { useCharacterBurnerLifepathStore } from "../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerLifepath";
import { useCharacterBurnerSkillStore } from "../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerSkill";
import { useCharacterBurnerTraitStore } from "../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerTrait";


export function CharacterBurner(): JSX.Element {
	const { lifepaths, updateAvailableLifepaths } = useCharacterBurnerLifepathStore();
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

			{lifepaths.length > 0
				? <Fragment>
					<Resources openModal={openModal} />
					<Tolerances />
					<Beliefs />
					<Instincts />
				</Fragment>
				: null}



			<LifepathSelection isOpen={currentModal === "lp"} close={closeModals} />
			<ResourceSelection isOpen={currentModal === "re"} close={closeModals} />

			{/* TODO
				<AnswerQuestions />
				<ChooseGeneralSkills />
				<ChooseGeneralLifepaths />
				<ChooseSpecial /> --- StockSpecific, SpecialLifepaths, SpecialSkills
			*/}
		</Fragment>
	);
}
