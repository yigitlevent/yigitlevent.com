import Typography from "@mui/material/Typography";
import { Fragment, useEffect, useState } from "react";

import { LifepathSelectionModal } from "./Modals/LifepathSelectionModal";
import { ResourceSelectionModal } from "./Modals/ResourceSelectionModal";
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
import { GeneralSkillModal } from "./Modals/GeneralSkillModal";
import { GeneralTraitModal } from "./Modals/GeneralTraitModal";
import { RandomLifepathsModal } from "./Modals/RandomLifepathsModal";
import { QuestionsModal } from "./Modals/QuestionsModal";
import { SpecialOptionsModal } from "./Modals/SpecialOptionsModal";


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
			{skills.length > 0 ? <Skills openModal={openModal} /> : null}
			{traits.length > 0 ? <Traits openModal={openModal} /> : null}
			{attributes.length > 0 ? <Attributes /> : null}

			{lifepaths.length > 0
				? <Fragment>
					<Resources openModal={openModal} />
					<Tolerances />
					<Beliefs />
					<Instincts />
				</Fragment>
				: null}


			<LifepathSelectionModal isOpen={currentModal === "lp"} close={closeModals} />
			<RandomLifepathsModal isOpen={currentModal === "randLp"} close={closeModals} />
			<ResourceSelectionModal isOpen={currentModal === "re"} close={closeModals} />
			<GeneralSkillModal isOpen={currentModal === "geSk"} close={closeModals} />
			<GeneralTraitModal isOpen={currentModal === "geTr"} close={closeModals} />
			<QuestionsModal isOpen={currentModal === "qu"} close={closeModals} />
			<SpecialOptionsModal isOpen={currentModal === "so"} close={closeModals} />

			{/* TODO
				<AnswerQuestions />
				<ChooseSpecial /> --- StockSpecific, SpecialLifepaths, SpecialSkills
			*/}
		</Fragment>
	);
}
