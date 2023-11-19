import ArrowForwardIosSharp from "@mui/icons-material/ArrowForwardIosSharp";
import DeleteIcon from "@mui/icons-material/Delete";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";

import { useCharacterBurnerResourceStore } from "../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerResource";
import { GenericGrid } from "../../../Shared/Grids";


export function Resources({ openModal }: { openModal: (name: CharacterBurnerModals) => void; }): JSX.Element {
	const { resources, getResourcePoints, getSpending, removeResource, editResourceDescription } = useCharacterBurnerResourceStore();

	const total = getResourcePoints();
	const spending = getSpending();

	return (
		<GenericGrid columns={6} center="h">
			<Grid item xs={6}>
				<Typography variant="h4">Resources</Typography>
			</Grid>

			<Grid item xs={6} sm={5}>
				<Typography>Trait Points: {total}, Remaining: {total - spending}</Typography>
			</Grid>

			<Grid item xs={6} sm={1}>
				<Button variant="outlined" size="small" onClick={() => openModal("re")} fullWidth>Add Resource</Button>
			</Grid>

			<Fragment>
				{(Object.keys(resources) as Guid[]).map((resourceKey, i) => (
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
									{resources[resourceKey].name} ({resources[resourceKey].cost}rps)
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
										<Typography variant="body2">Type: {resources[resourceKey].type[1]}</Typography>
									</Grid>

									{resources[resourceKey].modifiers.length > 0
										? <Grid item xs={2}>
											<Typography variant="body2">Modifiers: {resources[resourceKey].modifiers.join(", ")}</Typography>
										</Grid>
										: null}

									<Grid item xs={2}>
										<TextField
											label="Description"
											variant="standard"
											value={resources[resourceKey].description}
											onChange={e => editResourceDescription(resourceKey, e.target.value)}
											fullWidth
										/>
									</Grid>
								</GenericGrid>
							</AccordionDetails>
						</Accordion>
					</Grid>
				)
				)}
			</Fragment>
		</GenericGrid>
	);
}
