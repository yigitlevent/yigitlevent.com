import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { useRulesetStore } from "../../../hooks/apiStores/useRulesetStore";
import { PopoverLink } from "../../Shared/PopoverLink";


interface BlockTextProps {
	text: string;
	hasLeftPadding?: boolean;
}

export function BlockText({ text, hasLeftPadding }: BlockTextProps): React.JSX.Element {
	return (
		<Grid>
			<Typography sx={{ paddingLeft: hasLeftPadding ? "10px" : undefined, paddingTop: "3px" }}>{text}</Typography>
		</Grid>
	);
}

interface BlockSkillPopoverProps {
	skill: [id: BwgrSkillId, name: string];
	checkbox?: {
		checked: boolean;
		disabled?: boolean;
		onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
		onClick?: () => void;
	};
	deleteCallback?: () => void;
}

export function BlockSkillPopover({ skill, checkbox, deleteCallback }: BlockSkillPopoverProps): React.JSX.Element {
	const { getSkill } = useRulesetStore();

	const rulesetSkill = getSkill(skill[0]);

	return (
		<Grid>
			{checkbox
				? <Checkbox
					checked={checkbox.checked}
					disabled={checkbox.disabled}
					onChange={checkbox.onChange}
					onClick={checkbox.onClick}
					sx={{ margin: "0 0 4px 0", padding: "0" }}
				/>
				: null}

			<Typography sx={{ cursor: "pointer", display: "inline-block", margin: "6px 0 0 8px" }}>
				<PopoverLink data={rulesetSkill} />
			</Typography>

			{deleteCallback
				? <IconButton color="primary" onClick={deleteCallback} sx={{ padding: 0, margin: "0 0 2px 6px" }}>
					<DeleteIcon />
				</IconButton>
				: null}
		</Grid>
	);
}

interface BlockTraitPopoverProps {
	trait: [id: BwgrTraitId, name: string];
	checkbox?: {
		checked: boolean;
		disabled?: boolean;
		onClick?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
	};
	deleteCallback?: () => void;
}

export function BlockTraitPopover({ trait, checkbox, deleteCallback }: BlockTraitPopoverProps): React.JSX.Element {
	const { getTrait } = useRulesetStore();

	const rulesetTrait = getTrait(trait[0]);

	return (
		<Grid>
			{checkbox
				? <Checkbox
					checked={checkbox.checked}
					disabled={checkbox.disabled}
					onChange={checkbox.onClick}
					sx={{ margin: "0 0 4px 0", padding: "0" }}
				/>
				: null}

			<Typography sx={{ cursor: "pointer", display: "inline-block", margin: "6px 0 0 8px" }}>
				<PopoverLink data={rulesetTrait} />
			</Typography>

			{deleteCallback
				? <IconButton color="primary" onClick={deleteCallback} sx={{ padding: 0, margin: "0 0 2px 6px" }}>
					<DeleteIcon />
				</IconButton>
				: null}
		</Grid>
	);
}
