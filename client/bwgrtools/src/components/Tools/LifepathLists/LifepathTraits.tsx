import { Fragment } from "react";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { useRulesetStore } from "../../../hooks/apiStores/useRulesetStore";

import { PopoverLink } from "../../Shared/PopoverLink";


export function LifepathTraits({ lifepath }: { lifepath: Lifepath; }) {
	const { traits } = useRulesetStore();

	const lifepathTraits =
		lifepath.traits
			? lifepath.traits
				.map(traitId => {
					const trait = traits.find(v => v.id === traitId);
					if (trait) return trait;
					else throw new Error(`Trait of TraitId '${traitId}' cannot be found.`);
				})
			: undefined;

	return (
		<Fragment>
			<b>Traits: </b> {lifepath.pools.traitPool}{lifepath.pools.traitPool > 1 ? "pts: " : "pt: "}

			{lifepathTraits
				? lifepathTraits.map((trait, i) => {
					return (
						<Paper key={i} elevation={2} sx={{ cursor: "pointer", padding: "0 4px", margin: "0 0 0 2px", width: "max-content", display: "inline-block" }}>
							<PopoverLink data={trait} />
						</Paper>
					);
				})
				: <Box sx={{ padding: "0 4px", display: "inline-block" }}>—</Box>
			}
		</Fragment>
	);
}
