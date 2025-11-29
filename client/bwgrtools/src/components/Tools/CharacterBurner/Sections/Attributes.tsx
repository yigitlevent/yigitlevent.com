import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { UniqueArrayItem } from "@utility/UniqueArray";
import { Fragment } from "react";

import { useCharacterBurnerAttributeStore } from "../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerAttribute";
import { AbilityButton } from "../../../Shared/AbilityButton";
import { GenericGrid } from "../../../Shared/Grids";
import { BlockText } from "../BlockText";


function Attribute({ attribute }: { attribute: UniqueArrayItem<BwgrAbilityId, BwgrCharacterAttribute>; }): React.JSX.Element {
	const { getAttribute, shiftAttributeShade } = useCharacterBurnerAttributeStore();

	const attributeDetails = getAttribute([attribute.id, attribute.name]);

	return (
		<Fragment>
			{attribute.hasShade
				? <AbilityButton
					name={attribute.name}
					disabled={attributeDetails.exponent < 6}
					onClick={() => { shiftAttributeShade(attribute.id); }}
					onContextMenu={() => { shiftAttributeShade(attribute.id); }}
				>
					{attributeDetails.shade}
				</AbilityButton>
				: null}

			<AbilityButton name={attribute.name} disabled>
				{attributeDetails.exponent}
			</AbilityButton>
		</Fragment>
	);
}

export function Attributes(): React.JSX.Element {
	const { attributes } = useCharacterBurnerAttributeStore();

	return (
		<GenericGrid columns={6} center spacing={[0, 2]} extraBottomMargin>
			<Grid size={{ xs: 6 }}>
				<Typography variant="h4">Attributes</Typography>
			</Grid>

			<Fragment>
				{attributes
					.map((attribute, i) => (
						<Grid key={i} size={{ xs: 6, sm: 3, md: 2 }}>
							<GenericGrid columns={5} center="h" hasBackground={1}>
								<BlockText text={attribute.name} hasLeftPadding />

								<Grid>
									<Attribute attribute={attribute} />
								</Grid>
							</GenericGrid>
						</Grid>
					)
					)}
			</Fragment>
		</GenericGrid>
	);
}
