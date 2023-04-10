import { Fragment } from "react";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { useCharacterBurnerStoreOld } from "../../../../hooks/oldStores/useCharacterBurnerStoreOld";

import { GenericGrid } from "../../../Shared/Grids";
import { AbilityButton } from "../../../Shared/AbilityButton";
import { BlockText } from "../../CharacterBurner/BlockText";


export function AttributesBlock() {
	const { totals, spendings, getAttributeShade, getAttributeExponent, changeAttributeShade } = useCharacterBurnerStoreOld();

	return (
		<GenericGrid columns={6} center spacing={[0, 2]}>
			<Grid item xs={6}>
				<Typography variant="h4">Attributes</Typography>
			</Grid>

			<Fragment>
				{Attributes
					.filter(v => (v.requiredTrait && totals.traits.commonList.includes(v.requiredTrait)) || Object.keys(spendings.attributes).includes(v.name))
					.map((v, i) =>
						<Grid key={i} item xs={6} sm={3} md={2}>
							<GenericGrid columns={5} center="h" hasBackground={1}>
								<BlockText text={v.name} hasLeftPadding />
								<Grid item>
									{v.hasShade
										? <AbilityButton
											name={v.name}
											disabled={getAttributeExponent(v.name) < 6}
											onClick={e => changeAttributeShade(e, v.name, 5)}
											onContextMenu={e => changeAttributeShade(e, v.name, -5)}
										>
											{getAttributeShade(v.name)}
										</AbilityButton>
										: null
									}
									<AbilityButton name={v.name} disabled>
										{getAttributeExponent(v.name)}
									</AbilityButton>
								</Grid>
							</GenericGrid>
						</Grid>
					)}
			</Fragment>
		</GenericGrid>
	);
}
