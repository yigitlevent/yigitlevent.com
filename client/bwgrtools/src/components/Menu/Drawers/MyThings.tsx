import { Fragment, Suspense, useEffect } from "react";

import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { useCampaignStore } from "../../../hooks/apiStores/useCampaignStore";

import { DrawerBox } from "../../Shared/DrawerBox";


function Campaigns() {
	const { campaigns, getCampaigns } = useCampaignStore();

	useEffect(() => {
		getCampaigns();
	}, [getCampaigns]);

	return (
		<Fragment>

			<Grid container justifyContent="space-between">
				<Grid item>
					<Typography variant="h6">Campaigns</Typography>
				</Grid>

				<Grid item>
					<IconButton size="small"><AddCircleOutlineIcon /></IconButton>
				</Grid>
			</Grid>

			<Suspense fallback={<Skeleton variant="rounded" height="64px" sx={{ margin: "8px 0" }} />}>
				{campaigns && campaigns.length > 0
					? campaigns.map((v, i) =>
						<Box key={i}>{v.Id}</Box>
					)
					: <Typography variant="body2" sx={{ textAlign: "center", margin: "16px 0" }}>— empty list —</Typography>
				}
			</Suspense>
		</Fragment>
	);
}

function Invites() {
	return (
		<Fragment>
			<Typography variant="h6">Invites</Typography>

			<Suspense fallback={<Skeleton variant="rounded" height="64px" sx={{ margin: "8px 0" }} />}>
				<Typography variant="body2" sx={{ textAlign: "center" }}>— empty list —</Typography>
			</Suspense>
		</Fragment>
	);
}

export function MyThings({ expanded }: { expanded: boolean; }) {
	return (
		<DrawerBox title={"My Things"} expanded={expanded}>
			<Campaigns />


			<Invites />
		</DrawerBox>
	);
}
