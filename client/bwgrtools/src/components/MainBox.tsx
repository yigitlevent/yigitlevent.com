import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Menu } from "./Menu/Menu";
import { CharacterBurner } from "./Tools/CharacterBurner/CharacterBurner";
import { DiceRoller } from "./Tools/DiceRoller/DiceRoller";
import { DuelOfWitsPlanner } from "./Tools/DuelOfWitsPlanner/DuelOfWitsPlanner";
import { FightPlanner } from "./Tools/FightPlanner/FightPlanner";
import { LifepathLists } from "./Tools/LifepathLists/LifepathLists";
import { MagicWheel } from "./Tools/MagicWheel/MagicWheel";
import { MagicWheelAlt } from "./Tools/MagicWheel/MagicWheelAlt";
import { PracticePlanner } from "./Tools/PracticePlanner/PracticePlanner";
import { RangeAndCoverPlanner } from "./Tools/RangeAndCoverPlanner/RangeAndCoverPlanner";
import { ResourcesList } from "./Tools/ResourcesList/ResourcesList";
import { SkillLists } from "./Tools/SkillLists/SkillLists";
import { TraitLists } from "./Tools/TraitLists/TraitLists";
import { useRulesetStore } from "../hooks/apiStores/useRulesetStore";
import { useUserStore } from "../hooks/apiStores/useUserStore";
import { THEME } from "../theme/theme";


export function MainBox(): React.JSX.Element {
	const { user } = useUserStore();
	const { fetchState, fetchList, fetchData } = useRulesetStore();
	const matches = useMediaQuery(THEME.breakpoints.down("sm"));

	useEffect(() => {
		if (fetchState === "fetch-full") fetchList();
	}, [fetchList, fetchState]);

	useEffect(() => {
		if (fetchState === "fetch-data") fetchData();
	}, [fetchData, fetchState]);

	return (
		<Container maxWidth="lg" sx={{ margin: "10px auto" }}>
			<Box>
				<Typography variant="h2">BWGR Tools</Typography>
			</Box>

			<Grid>
				<Box sx={{ textAlign: "right" }}>{user ? `welcome, ${user.username}` : null}</Box>
			</Grid>

			<Menu bottom={matches} />

			<Paper sx={{ padding: "10px 20px" }}>
				{fetchState === "failed"
					? <Typography>Data fetching failed.</Typography>
					: null}

				{fetchState === "done"
					? <Routes>
						<Route path="/" element={<Navigate replace to="/diceroller" />} />
						<Route path="/diceroller" element={<DiceRoller />} />
						<Route path="/lifepaths" element={<LifepathLists />} />
						<Route path="/skills" element={<SkillLists />} />
						<Route path="/traits" element={<TraitLists />} />
						<Route path="/resources" element={<ResourcesList />} />
						<Route path="/practiceplanner" element={<PracticePlanner />} />
						<Route path="/magicwheel" element={<MagicWheel />} />
						<Route path="/magicwheelalt" element={<MagicWheelAlt />} />
						<Route path="/dowplanner" element={<DuelOfWitsPlanner />} />
						<Route path="/racplanner" element={<RangeAndCoverPlanner />} />
						<Route path="/fightplanner" element={<FightPlanner />} />
						<Route path="/characterburner" element={<CharacterBurner />} />
					</Routes>
					: <Typography>Loading</Typography>}
			</Paper>

			<Box sx={{ margin: "0 0 200px" }} />
		</Container>
	);
}
