import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import CasinoOutlinedIcon from "@mui/icons-material/CasinoOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import Fingerprint from "@mui/icons-material/Fingerprint";
import GroupWorkOutlinedIcon from "@mui/icons-material/GroupWorkOutlined";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import ModeStandbyOutlinedIcon from "@mui/icons-material/ModeStandbyOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import SportsKabaddiOutlinedIcon from "@mui/icons-material/SportsKabaddiOutlined";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import SvgIcon from "@mui/material/SvgIcon";
import { Fragment } from "react";

import { RouteButton } from "./RouteButton";
import { DrawerBox } from "../../Shared/DrawerBox";


export function Tools({ expanded }: { expanded: boolean; }): JSX.Element {
	const items: [string, string, typeof SvgIcon][] = [
		["Lifepaths List", "/lifepaths", Fingerprint],
		["Skills List", "/skills", GroupWorkOutlinedIcon],
		["Traits List", "/traits", CategoryOutlinedIcon],
		["Resources List", "/resources", PaidOutlinedIcon],
		["Practice Planner", "/practiceplanner", EventNoteOutlinedIcon],
		["Fight Planner", "/fightplanner", SportsKabaddiOutlinedIcon],
		["Range and Cover Planner", "/racplanner", ModeStandbyOutlinedIcon],
		["Duel of Wits Planner", "/dowplanner", QuestionAnswerOutlinedIcon],
		["Dice Roller", "/diceroller", CasinoOutlinedIcon],
		["Character Burner", "/characterburner", LocalFireDepartmentOutlinedIcon],
		["Magic Wheel", "/magicwheel", AutoAwesomeOutlinedIcon],
		["Magic Wheel Alt", "/magicwheelalt", AutoAwesomeOutlinedIcon]
	];

	return (
		<DrawerBox title={"Tools"} expanded={expanded}>
			<List disablePadding>
				{items.map((item, i) => {
					return (
						<Fragment key={i}>
							<RouteButton title={item[0]} route={item[1]} Icon={item[2]} />
							{[3, 7].includes(i) ? <Divider /> : null}
						</Fragment>
					);
				})}
			</List>
		</DrawerBox>
	);
}
