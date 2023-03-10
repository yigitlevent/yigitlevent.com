import { Fragment } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIosSharp from "@mui/icons-material/ArrowForwardIosSharp";

import { useCharacterBurnerStore } from "../../../../hooks/stores/useCharacterBurnerStore";

import { GenericGrid } from "../../../Shared/Grids";


export function ResourcesBlock({ openReModal }: { openReModal: (open: boolean) => void; }) {
	const { totals, spendings, removeResource, editResourceDescription, getResourceRemainings } = useCharacterBurnerStore();

	const resourceRemaining = getResourceRemainings();

	return (
		<GenericGrid columns={6} center="h">
			<Grid item xs={6}>
				<Typography variant="h4">Resources</Typography>
			</Grid>

			<Grid item xs={6} sm={5}>
				<Typography>Trait Points: {totals.resources.points}, Remaining: {resourceRemaining ? resourceRemaining.resourcePoints : -1}</Typography>
			</Grid>

			<Grid item xs={6} sm={1}>
				<Button variant="outlined" size="small" onClick={() => openReModal(true)} fullWidth>Add Resource</Button>
			</Grid>

			<Fragment>
				{Object.keys(spendings.resources).map((resourceKey, i) =>
					<Grid key={i} item xs={6} sm={3}>
						<Accordion disableGutters>
							<AccordionSummary
								expandIcon={<ArrowForwardIosSharp sx={{ fontSize: "0.9em" }} />}
								sx={{
									flexDirection: "row-reverse",
									"& .MuiAccordionSummary-content": { margin: "0" },
									"& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": { transform: "rotate(90deg)" }
								}}
							>
								<Typography sx={{ fontSize: "18px", margin: "0 0 0 12px" }}>
									{spendings.resources[resourceKey].name} ({spendings.resources[resourceKey].cost}rps)
								</Typography>
								<IconButton color="primary" onClick={() => removeResource(resourceKey)} sx={{ position: "absolute", right: "0", margin: "2px 12px 0 0", padding: 0 }}>
									<DeleteIcon />
								</IconButton>
							</AccordionSummary>
							<AccordionDetails sx={{ padding: "0 16px 16px" }}>
								<GenericGrid columns={2} spacing={[1, 0]} center sx={{ padding: "0", margin: "0" }}>
									<Grid item xs={2}>
										<Divider />
									</Grid>
									<Grid item xs={2}>
										<Typography variant="body2">Type: {spendings.resources[resourceKey].type}</Typography>
									</Grid>
									{spendings.resources[resourceKey].modifiers.length > 0
										? <Grid item xs={2}>
											<Typography variant="body2">Modifiers: {spendings.resources[resourceKey].modifiers.join(", ")}</Typography>
										</Grid>
										: null
									}
									<Grid item xs={2}>
										<TextField
											label="Description"
											variant="standard"
											value={spendings.resources[resourceKey].description}
											onChange={e => editResourceDescription(resourceKey, e.target.value)}
											fullWidth
										/>
									</Grid>
								</GenericGrid>
							</AccordionDetails>
						</Accordion>
					</Grid>
				)}
			</Fragment>
		</GenericGrid>
	);
}
