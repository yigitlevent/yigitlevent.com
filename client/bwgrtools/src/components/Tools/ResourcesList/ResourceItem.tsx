import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";

import { GetObstacleString } from "../../../utils/GetMagicalObstacleString";
import { GenericGrid } from "../../Shared/Grids";


export function ResourceItem({ resource }: { resource: BwgrResource; }): JSX.Element {
	const getAreaOfEffectDetails = (aoeDetails: { unit?: [id: DistanceUnitId, name: string] | undefined; modifier?: [id: UnitModifierId, name: string] | undefined; }) => {
		const texts = [];
		if (aoeDetails.unit) { texts.push(aoeDetails.unit[1]); }
		if (aoeDetails.modifier) { texts.push(aoeDetails.modifier[1]); }
		return ` (${texts.join(", ")})`;
	};

	const getText = (res: [cost: number, description: string] | [cost: number, isPer: boolean, description: string]): string => {
		if (res.length === 2) return `${res[1]}: ${res[0]}${res[0] > 1 ? "rps" : "rp"}`;
		else if (res.length === 3) return `${res[2]}: ${res[0]}${res[0] > 1 ? "rps" : "rp"} ${res[1] ? "per" : ""}`;
		else return "";
	};

	return (
		<GenericGrid columns={3}>
			<Grid item xs={2}>
				<Typography variant="h4">{resource.name}</Typography>
			</Grid>

			<Grid item xs={1}>
				<Typography sx={{ float: "right" }}>{resource.type[1]}</Typography>
			</Grid>

			<Grid item xs={resource.magical ? 1 : 3}>
				{resource.variableCost
					? <Typography variant="body2">variable</Typography>
					: resource.costs.every(v => v[1] === null)
						? resource.costs.map((res, i) =>
							<Typography variant="body2" key={i}>Resources: {res[0]}{res[0] > 1 ? "rps" : "rp"}</Typography>
						)
						: resource.costs.map((res, i) =>
							<Typography variant="body2" key={i}>{getText(res)}</Typography>
						)}
			</Grid>

			<Grid item xs={resource.magical ? 1 : 3}>
				{resource.modifiers.map((res, i) =>
					<Typography variant="body2" key={i}>{getText(res)}</Typography>
				)}
			</Grid>

			{resource.magical
				? <Fragment>
					<Grid item xs={1}>
						<Typography variant="body2">Actions: {resource.magical.doActionsMultiply ? "x" : ""}{resource.magical.actions}</Typography>
					</Grid>
				</Fragment>
				: null}

			{resource.magical?.obstacleDetails
				? <Grid item xs={3}>
					<Typography variant="body2">Obstacles: {GetObstacleString(resource, resource.magical.obstacleDetails)}</Typography>
				</Grid>
				: null}

			{resource.magical
				? <Fragment>
					<Grid item xs={3}><Divider /></Grid>

					<Grid item xs={1}>
						<Typography variant="body2">Origin: {resource.magical.origin[1]}</Typography>
					</Grid>

					<Grid item xs={1}>
						<Typography variant="body2">Element: {resource.magical.elements.map(x => x[1]).join("/")}</Typography>
					</Grid>

					<Grid item xs={1}>
						<Typography variant="body2">Duration: {resource.magical.duration[1]}</Typography>
					</Grid>

					<Grid item xs={1}>
						<Typography variant="body2">Area of Effect: {resource.magical.areaOfEffect[1]}
							{resource.magical.areaOfEffectDetails?.unit || resource.magical.areaOfEffectDetails?.modifier ? getAreaOfEffectDetails(resource.magical.areaOfEffectDetails) : ""}
						</Typography>
					</Grid>

					<Grid item xs={1}>
						<Typography variant="body2">Impetus: {resource.magical.impetus.map(x => x[1]).join("/")}</Typography>
					</Grid>
				</Fragment>
				: null}

			{resource.description
				? <Fragment>
					<Grid item xs={3}><Divider /></Grid>

					<Grid item xs={3}>
						{resource.description.split("<br>").map((v, i) => {
							if (resource.magical && i === 0) return <Typography key={i} variant="subtitle2">{v}</Typography>;
							return <Typography key={i} variant="body2">{v}</Typography>;
						})}
					</Grid>
				</Fragment>
				: null}
		</GenericGrid>
	);
}
