import { Navigate, Route, Routes } from "react-router-dom";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { DiceRoller } from "./Tools/DiceRoller/DiceRoller";
import { LifepathLists } from "./Tools/LifepathLists/LifepathLists";
import { SkillLists } from "./Tools/SkillLists/SkillLists";
import { TraitLists } from "./Tools/TraitLists/TraitLists";
import { PracticePlanner } from "./Tools/PracticePlanner/PracticePlanner";
import { MagicWheel } from "./Tools/MagicWheel/MagicWheel";
import { DuelOfWitsPlanner } from "./Tools/DuelOfWitsPlanner/DuelOfWitsPlanner";
import { RangeAndCoverPlanner } from "./Tools/RangeAndCoverPlanner/RangeAndCoverPlanner";
import { FightPlanner } from "./Tools/FightPlanner/FightPlanner";
import { ResourcesList } from "./Tools/ResourcesList/ResourcesList";
import { CharacterBurner } from "./Tools/CharacterBurner/CharacterBurner";
import { Menu } from "./Menu/Menu";
import { useSkillsStore } from "../hooks/apiStores/useSkillsStore";

let Once = true;

export function MainBox() {
	const store = useSkillsStore();

	if (Once) {
		store.fetchSkills();
		Once = false;
	}

	return (
		<Container maxWidth="lg" sx={{ margin: "10px auto" }}>
			<Menu />

			<Paper sx={{ padding: "10px 20px" }}>
				<Routes>
					<Route path="/" element={<Navigate replace to="/diceroller" />} />
					<Route path="/diceroller" element={<DiceRoller />} />
					<Route path="/lifepaths" element={<LifepathLists />} />
					<Route path="/skills" element={<SkillLists />} />
					<Route path="/traits" element={<TraitLists />} />
					<Route path="/resources" element={<ResourcesList />} />
					<Route path="/practiceplanner" element={<PracticePlanner />} />
					<Route path="/magicwheel" element={<MagicWheel />} />
					<Route path="/dowplanner" element={<DuelOfWitsPlanner />} />
					<Route path="/racplanner" element={<RangeAndCoverPlanner />} />
					<Route path="/fightplanner" element={<FightPlanner />} />
					<Route path="/characterburner" element={<CharacterBurner />} />
				</Routes>
			</Paper>

			<Box sx={{ margin: "0 0 200px" }} />
		</Container >
	);
}
