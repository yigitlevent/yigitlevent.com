import { Navigate, Route, Routes } from "react-router-dom";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { DiceRoller } from "./Tools/DiceRoller/DiceRoller";
import { SkillLists } from "./Tools/SkillLists/SkillLists";
import { TraitLists } from "./Tools/TraitLists/TraitLists";
import { Menu } from "./Menu/Menu";
import { useRulesetStore } from "../hooks/apiStores/useRulesetStore";

let Once = true;

export function MainBox() {
	const store = useRulesetStore();

	if (Once) {
		// TODO: move this to a better place, think about how to actually do this properly
		store.fetchList();
		store.fetchData();
		Once = false;
	}

	return (
		<Container maxWidth="lg" sx={{ margin: "10px auto" }}>
			<Menu />

			<Paper sx={{ padding: "10px 20px" }}>
				<Routes>
					<Route path="/" element={<Navigate replace to="/diceroller" />} />
					<Route path="/diceroller" element={<DiceRoller />} />
					{/*<Route path="/lifepaths" element={<LifepathLists />} />*/}
					<Route path="/skills" element={<SkillLists />} />
					<Route path="/traits" element={<TraitLists />} />
					{/*<Route path="/resources" element={<ResourcesList />} />*/}
					{/*<Route path="/practiceplanner" element={<PracticePlanner />} />*/}
					{/*<Route path="/magicwheel" element={<MagicWheel />} />*/}
					{/*<Route path="/dowplanner" element={<DuelOfWitsPlanner />} />*/}
					{/*<Route path="/racplanner" element={<RangeAndCoverPlanner />} />*/}
					{/*<Route path="/fightplanner" element={<FightPlanner />} />*/}
					{/*<Route path="/characterburner" element={<CharacterBurner />} />*/}
				</Routes>
			</Paper>

			<Box sx={{ margin: "0 0 200px" }} />
		</Container >
	);
}
