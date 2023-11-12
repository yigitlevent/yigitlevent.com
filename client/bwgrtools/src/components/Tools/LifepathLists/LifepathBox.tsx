import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { LifepathRequirements } from "./LifepathRequirements";
import { LifepathSkills } from "./LifepathSkills";
import { LifepathTraits } from "./LifepathTraits";
import { useRulesetStore } from "../../../hooks/apiStores/useRulesetStore";


export function LifepathBox({ lifepath }: { lifepath: Lifepath; }): JSX.Element {
	const { settings, getSetting } = useRulesetStore();

	const getYears = (l: Lifepath) => {
		const years = typeof l.years === "number"
			? `${l.years}${l.years > 1 ? "yrs" : "yr"}`
			: l.years.join("-") + "yrs";
		return years;
	};

	const getResources = (l: Lifepath) => {
		const rps = `${l.pools.resourcePoints}${l.pools.resourcePoints > 1 ? "rps" : "rp"}`;
		return rps;
	};

	const getStatPools = (l: Lifepath) => {
		const statPoolsString = [];

		if (l.pools.eitherStatPool === 0 && l.pools.mentalStatPool === 0 && l.pools.physicalStatPool === 0) statPoolsString.push("—");
		else if (l.pools.eitherStatPool !== 0) statPoolsString.push(`${(l.pools.eitherStatPool > 0) ? "+" : ""}${l.pools.eitherStatPool}M/P`);
		else {
			if (l.pools.mentalStatPool !== 0) statPoolsString.push(`${(l.pools.mentalStatPool > 0) ? "+" : ""}${l.pools.mentalStatPool}M`);
			if (l.pools.physicalStatPool !== 0) statPoolsString.push(`${(l.pools.physicalStatPool > 0) ? "+" : ""}${l.pools.physicalStatPool}P`);
		}
		return statPoolsString.join(", ");
	};

	const getLeads = (l: Lifepath) => {
		const leads = (l.leads && l.leads.length > 0)
			? l.leads
				.filter(settingId => settings.findIndex(x => x.id === settingId) > -1)
				.map(settingId => {
					const s = getSetting(settingId);
					if (s) return s.nameShort;
					else throw new Error(`Setting of LeadId '${settingId}' cannot be found.`);
				})
			: ["—"];

		return leads.join(", ");
	};

	return (
		<Grid container rowSpacing={0} columnSpacing={0} columns={18}>
			<Grid item lg={6} md={12} sm={18} xs={18}>
				<Paper elevation={3} square sx={{ padding: "2px 6px 4px" }}>
					<Typography variant="body1">{lifepath.name}</Typography>
				</Paper>
			</Grid>

			<Grid item lg={1} md={2} sm={6} xs={6}>
				<Paper elevation={3} square sx={{ padding: "2px 6px 4px" }}>
					<Typography variant="caption">{getYears(lifepath)}</Typography>
				</Paper>
			</Grid>

			<Grid item lg={1} md={2} sm={6} xs={6}>
				<Paper elevation={3} square sx={{ padding: "2px 6px 4px" }}>
					<Typography variant="caption">{getResources(lifepath)}</Typography>
				</Paper>
			</Grid>

			<Grid item lg={1} md={2} sm={6} xs={6}>
				<Paper elevation={3} square sx={{ padding: "2px 6px 4px" }}>
					<Typography variant="caption">{getStatPools(lifepath)}</Typography>
				</Paper>
			</Grid>

			<Grid item lg={9} md={18} sm={18} xs={18}>
				<Paper elevation={3} square sx={{ padding: "2px 6px 4px" }}>
					<Typography variant="caption">{getLeads(lifepath)}</Typography>
				</Paper>
			</Grid>

			<Grid item md={16}>
				<Typography variant="caption">
					<LifepathSkills lifepath={lifepath} />
				</Typography>
			</Grid>

			<Grid item md={16}>
				<Typography variant="caption">
					<LifepathTraits lifepath={lifepath} />
				</Typography>
			</Grid>

			{lifepath.requirements
				? <Grid item md={16}>
					<Typography variant="caption">
						<LifepathRequirements lifepath={lifepath} />
					</Typography>
				</Grid>
				: null}
		</Grid>
	);
}
