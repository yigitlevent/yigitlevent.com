import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Fragment } from "react";

import { useRulesetStore } from "../../../hooks/apiStores/useRulesetStore";
import { PopoverLink } from "../../Shared/PopoverLink";


export function LifepathTraits({ lifepath }: { lifepath: BwgrLifepath; }): React.JSX.Element {
	const { getTrait } = useRulesetStore();

	const lifepathTraits
		= lifepath.traits
			? lifepath.traits.map(traitId => getTrait(traitId))
			: undefined;


	const text = `${lifepath.pools.traitPool.toString()}${lifepath.pools.traitPool > 1 ? "pts: " : "pt: "}`;

	return (
		<Fragment>
			<b>Traits: </b>{text}

			{lifepathTraits
				? lifepathTraits.map((trait, i) => {
					return (
						<Paper key={i} elevation={2} sx={{ cursor: "pointer", padding: "0 4px", margin: "0 0 0 2px", width: "max-content", display: "inline-block" }}>
							<PopoverLink data={trait} />
						</Paper>
					);
				})
				: <Box sx={{ padding: "0 4px", display: "inline-block" }}>—</Box>}
		</Fragment>
	);
}
