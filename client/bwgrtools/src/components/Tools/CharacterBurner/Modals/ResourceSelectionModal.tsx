import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Fragment, useCallback, useEffect, useState } from "react";

import { useRulesetStore } from "../../../../hooks/apiStores/useRulesetStore";
import { useCharacterBurnerBasicsStore } from "../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerBasics";
import { useCharacterBurnerResourceStore } from "../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerResource";
import { GetObstacleString } from "../../../../utils/GetMagicalObstacleString";
import { AbilityButton } from "../../../Shared/AbilityButton";
import { GenericGrid } from "../../../Shared/Grids";


interface SelectedCost {
	baseCost: number;
	modifiers: {
		[key: string]: {
			cost: number | `${number}/per`;
			selected: boolean;
		};
	};
}

export function ResourceSelectionModal({ isOpen, close }: { isOpen: boolean; close: () => void; }): JSX.Element {
	const { stock } = useCharacterBurnerBasicsStore();
	const ruleset = useRulesetStore();
	const { getResourcePools, addResource } = useCharacterBurnerResourceStore();

	const resourcePool = getResourcePools();

	const [resource, setResource] = useState<BwgrResource>(ruleset.resources.filter(x => x.stock[0] === stock[0])[0] as BwgrResource);
	const [resourceDesc, setResourceDesc] = useState("");
	const [costs, setCosts] = useState<SelectedCost>();
	const [numberOfWeapons, setNumberOfWeapons] = useState(1);

	const getStockResources = useCallback(() => {
		return ruleset.resources.filter(x => x.stock[0] === stock[0]);
	}, [ruleset.resources, stock]);

	const resetCosts = useCallback(() => {
		const newCosts: SelectedCost = { baseCost: 0, modifiers: {} };

		if (resource.variableCost) newCosts.baseCost = 0;
		else newCosts.baseCost = resource.costs[0][0];

		if (resource.modifiers) {
			for (const key in resource.modifiers) {
				const modifiers = resource.modifiers[key];
				newCosts.modifiers[resource.modifiers[key][2]] = { cost: modifiers[1] ? `${modifiers[0]}/per` : modifiers[0], selected: false };
			}
		}

		setCosts({ ...newCosts });
	}, [resource]);

	const modifyResource = useCallback((resource: BwgrResource) => {
		const res = getStockResources().find(v => v.id === resource.id);
		if (res) {
			setResourceDesc("");
			setResource(res);
			resetCosts();
		}
	}, [getStockResources, resetCosts]);

	const changeCost = useCallback((cost: number) => {
		const newCosts = JSON.parse(JSON.stringify(costs)) as SelectedCost;
		newCosts.baseCost = cost > 0 ? cost : 0;
		setCosts({ ...newCosts });
	}, [costs]);

	const changeModifier = useCallback((name: string) => {
		const newCosts = JSON.parse(JSON.stringify(costs)) as SelectedCost;
		newCosts.modifiers[name] = { ...newCosts.modifiers[name], selected: !newCosts.modifiers[name].selected };
		setCosts({ ...newCosts });
	}, [costs]);

	const getModifiers = useCallback((costs: SelectedCost) => {
		const modifiers: [string, number | `${number}/per`][] = Object.keys(costs.modifiers).filter(v => costs.modifiers[v].selected).map(v => [v, costs.modifiers[v].cost]);
		return modifiers;
	}, []);

	const getTotalCost = useCallback((modifiers: [string, number | `${number}/per`][]) => {
		if (costs) {
			let totalCost = costs.baseCost;
			const modifierCosts = modifiers.map(v => v[1]);
			if (modifierCosts.length > 0) {
				for (const key in modifiers) {
					const modCost = modifiers[key][1];
					if (typeof modCost === "number") totalCost += modCost;
					else if (typeof modCost === "string") totalCost += numberOfWeapons * parseInt(modCost.split("/")[0]);
				}
			}
			return totalCost < 1 ? 1 : totalCost;
		}
	}, [costs, numberOfWeapons]);

	const createResource = useCallback(() => {
		if (costs) {
			const modifiers = getModifiers(costs);
			const totalCost = getTotalCost(modifiers);

			if (totalCost !== undefined && totalCost <= resourcePool.remaining) {
				addResource({
					id: resource.id,
					name: resource.name,
					type: resource.type,
					modifiers: modifiers.map(v => v[0]),
					cost: totalCost,
					description: resourceDesc
				});
				close();
			}
		}
	}, [addResource, close, costs, getModifiers, getTotalCost, resource.id, resource.name, resource.type, resourceDesc, resourcePool.remaining]);

	useEffect(() => {
		resetCosts();
	}, [resource, resetCosts, numberOfWeapons]);

	return (
		<Modal open={isOpen} onClose={() => close()}>
			<Paper sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", maxWidth: "800px", width: "100%", maxHeight: "100svh", padding: "0 24px 24px", border: "none", overflow: "auto" }}>
				<GenericGrid columns={6} spacing={[1, 2]} center="v">
					<Grid item xs={6}>
						<FormControl fullWidth variant="standard">
							<Autocomplete
								value={resource}
								options={getStockResources().sort((a, b) => a.type[1].localeCompare(b.type[1]) || a.name.localeCompare(b.name))}
								getOptionLabel={(option) => option.name}
								groupBy={(option) => option.type[1]}
								renderInput={(params) => <TextField {...params} label="Chosen Resource" />}
								onChange={(_, v) => modifyResource(v)}
								fullWidth
								disableClearable
							/>
						</FormControl>
					</Grid>

					<Grid item xs={6}>
						<Divider>Type: {resource.type}</Divider>
					</Grid>

					{resource.costs.length === 1
						? <Grid item xs={6} sm={2}>
							<Typography variant="body2">Cost: {resource.costs[0][1]}</Typography>
						</Grid>
						: null}

					{resource.magical && resource.magical.obstacleDetails
						? <Fragment>
							<Grid item xs={6} sm={2}>
								<Typography variant="body2">Obstacle: {GetObstacleString(resource, resource.magical.obstacleDetails)}</Typography>
							</Grid>

							<Grid item xs={6} sm={2}>
								<Typography variant="body2">Actions: {resource.magical.actions}</Typography>
							</Grid>
						</Fragment>
						: null}

					{resource.magical
						? <Fragment>
							<Grid item xs={6} sm={2}>
								<Typography variant="body2">Origin: {resource.magical.origin}</Typography>
							</Grid>

							<Grid item xs={6} sm={2}>
								<Typography variant="body2">Element: {resource.magical.elements.join("/")}</Typography>
							</Grid>

							<Grid item xs={6} sm={2}>
								<Typography variant="body2">Duration: {resource.magical.duration}</Typography>
							</Grid>

							<Grid item xs={6} sm={4}>
								<Typography variant="body2">Area of Effect: {resource.magical.areaOfEffect}</Typography>
							</Grid>

							<Grid item xs={6} sm={2}>
								<Typography variant="body2">Impetus: {resource.magical.impetus.join("/")}</Typography>
							</Grid>
						</Fragment>
						: null}

					{resource.description
						? <Grid item xs={6}>
							{resource.description.split("<br>").map((v, i) => {
								if (resource.magical && i === 0) return <Typography key={i} variant="subtitle2">{v}</Typography>;
								return <Typography key={i} variant="body2">{v}</Typography>;
							})}
						</Grid>
						: null}

					{costs && resource.costs.length > 1
						? <Grid item xs={6}>
							<Typography variant="h6">Cost</Typography>

							<RadioGroup value={costs.baseCost} onChange={(_, v) => changeCost(parseInt(v))}>
								{resource.costs.map((v, i) =>
									<FormControlLabel key={i} label={`${v[1]} (${v[0]}rps)`} value={v[0]} control={<Radio />} />
								)}
							</RadioGroup>
						</Grid>
						: null}

					{costs && resource.variableCost
						? <Grid item xs={6}>
							<Typography sx={{ display: "inline", margin: "0 8px 0 0" }}>Cost</Typography>

							<AbilityButton
								onClick={e => { e.preventDefault(); changeCost(costs.baseCost + 1); }}
								onContextMenu={e => { e.preventDefault(); changeCost(costs.baseCost - 1); }}
							>
								{costs.baseCost}
							</AbilityButton>
						</Grid>
						: null}

					{costs && resource.modifiers
						? <Fragment>
							<Grid item xs={6}>
								<Typography variant="h6">Modifiers</Typography>
							</Grid>

							{resource.modifiers.map((v, i) =>
								(v[2] in costs.modifiers)
									? <Grid item key={i} xs={2}>
										<FormControlLabel
											label={`${v[2]} (${v[0]}rps)`}
											checked={costs.modifiers[v[2]].selected}
											onChange={() => changeModifier(v[2])}
											control={<Checkbox />}
										/>
									</Grid>
									: null
							)}
						</Fragment>
						: null}

					{costs && resource.modifiers && resource.modifiers.some(v => typeof v[1] === "string")
						? <Grid item xs={6}>
							<Typography variant="h6">Number of Weapons</Typography>

							<AbilityButton
								onClick={e => { e.preventDefault(); setNumberOfWeapons((v) => v + 1); }}
								onContextMenu={e => { e.preventDefault(); setNumberOfWeapons((v) => v - 1); }}
							>
								{numberOfWeapons}
							</AbilityButton>
						</Grid>
						: null}

					<Grid item xs={6}>
						<TextField label="Add description (optional)" variant="standard" value={resourceDesc} onChange={e => setResourceDesc(e.target.value)} fullWidth />
					</Grid>

					{costs
						? <Grid item>
							<Typography sx={{ marginTop: 2, marginBottom: 2 }}>Total Cost: {getTotalCost(getModifiers(costs))}</Typography>
						</Grid>
						: null}

					<Grid item>
						<Button variant="outlined" size="medium" onClick={() => createResource()}>Add Resource</Button>
					</Grid>
				</GenericGrid>
			</Paper>
		</Modal>
	);
}
