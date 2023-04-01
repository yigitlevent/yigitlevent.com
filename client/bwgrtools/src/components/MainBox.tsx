import { Navigate, Route, Routes } from "react-router-dom";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { useRulesetStore } from "../hooks/apiStores/useRulesetStore";

import { DiceRoller } from "./Tools/DiceRoller/DiceRoller";
import { LifepathLists } from "./Tools/LifepathLists/LifepathLists";
import { SkillLists } from "./Tools/SkillLists/SkillLists";
import { TraitLists } from "./Tools/TraitLists/TraitLists";
import { ResourcesList } from "./Tools/ResourcesList/ResourcesList";
import { PracticePlanner } from "./Tools/PracticePlanner/PracticePlanner";
import { MagicWheel } from "./Tools/MagicWheel/MagicWheel";
import { Menu } from "./Menu/Menu";

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
				{store.fetching
					? <span>Loading</span>
					: <Routes>
						<Route path="/" element={<Navigate replace to="/diceroller" />} />
						<Route path="/diceroller" element={<DiceRoller />} />
						<Route path="/lifepaths" element={<LifepathLists />} />
						<Route path="/skills" element={<SkillLists />} />
						<Route path="/traits" element={<TraitLists />} />
						<Route path="/resources" element={<ResourcesList />} />
						<Route path="/practiceplanner" element={<PracticePlanner />} />
						<Route path="/magicwheel" element={<MagicWheel />} />
						{/* TODO: <Route path="/dowplanner" element={<DuelOfWitsPlanner />} />*/}
						{/* TODO: <Route path="/racplanner" element={<RangeAndCoverPlanner />} />*/}
						{/* TODO: <Route path="/fightplanner" element={<FightPlanner />} />*/}
						{/* TODO: <Route path="/characterburner" element={<CharacterBurner />} />*/}
					</Routes>
				}
			</Paper>

			<Box sx={{ margin: "0 0 200px" }} />
		</Container >
	);
}
