import CheckIcon from "@mui/icons-material/Check";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { useRulesetStore } from "../../../hooks/apiStores/useRulesetStore";
import { DrawerBox } from "../../Shared/DrawerBox";


export function RulesetSelector({ expanded }: { expanded: boolean; }): JSX.Element {
	const { rulesets, checkRulesets, checkExactRulesets, toggleDataset } = useRulesetStore();

	return (
		<DrawerBox title={"Datasets"} expanded={expanded}>
			{rulesets.filter(ruleset => !ruleset.isExpansion).map((ruleset, i) => (
				<List key={i} disablePadding>
					<ListItemButton onClick={() => toggleDataset(ruleset.id)}>
						<ListItemIcon sx={{ margin: 0 }}>
							{checkRulesets([ruleset.id]) ? <CheckIcon color="success" /> : <CloseIcon color="error" />}
						</ListItemIcon>

						<ListItemText primary={ruleset.name} sx={{ margin: "0 0 2px -10px" }} />

						{ruleset.isOfficial
							? <CheckCircleOutlineIcon titleAccess="Official" fontSize="small" />
							: null}
					</ListItemButton>

					{ruleset.expansionIds
						? <List disablePadding sx={{ marginLeft: 4 }}>
							{ruleset.expansionIds.map((expansionId, ii) => {
								const expansion = rulesets.find(v => v.id === expansionId);

								return (
									expansion
										? <ListItemButton key={ii} onClick={() => toggleDataset(expansion.id)} disabled={!checkRulesets([ruleset.id])}>
											<ListItemIcon sx={{ margin: 0 }}>
												{checkExactRulesets([ruleset.id, expansion.id]) ? <CheckIcon color="success" /> : <CloseIcon color="error" />}
											</ListItemIcon>

											<ListItemText primary={expansion.name} sx={{ margin: "0 0 2px -10px" }} />

											{ruleset.isOfficial
												? <CheckCircleOutlineIcon titleAccess="Official" fontSize="small" />
												: null}
										</ListItemButton>
										: null
								);
							})}
						</List>
						: null}
				</List>
			)
			)}
		</DrawerBox>
	);
}
