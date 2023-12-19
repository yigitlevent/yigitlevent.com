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

export function BlockText({ text, hasLeftPadding }: BlockTextProps): JSX.Element {
	return (
		<Grid item>
			<Typography sx={{ paddingLeft: hasLeftPadding ? "10px" : undefined, paddingTop: "3px" }}>{text}</Typography>
		</Grid>
	);
}

interface BlockSkillPopoverProps {
	skill: [id: SkillId, name: string];
	checkbox?: {
		checked: boolean;
		disabled?: boolean;
		onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
		onClick?: () => void;
	};
	deleteCallback?: () => void;
}

export function BlockSkillPopover({ skill, checkbox, deleteCallback }: BlockSkillPopoverProps): JSX.Element {
	const { getSkill } = useRulesetStore();

	return (
		<Grid item>
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
				<PopoverLink data={getSkill(skill[0])} />
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
	trait: [id: TraitId, name: string];
	checkbox?: {
		checked: boolean;
		disabled?: boolean;
		onClick?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
	};
	deleteCallback?: () => void;
}

export function BlockTraitPopover({ trait, checkbox, deleteCallback }: BlockTraitPopoverProps): JSX.Element {
	const { getTrait } = useRulesetStore();

	return (
		<Grid item>
			{checkbox
				? <Checkbox
					checked={checkbox.checked}
					disabled={checkbox.disabled}
					onChange={checkbox.onClick}
					sx={{ margin: "0 0 4px 0", padding: "0" }}
				/>
				: null}

			<Typography sx={{ cursor: "pointer", display: "inline-block", margin: "6px 0 0 8px" }}>
				<PopoverLink data={getTrait(trait[0])} />
			</Typography>

			{deleteCallback
				? <IconButton color="primary" onClick={deleteCallback} sx={{ padding: 0, margin: "0 0 2px 6px" }}>
					<DeleteIcon />
				</IconButton>
				: null}
		</Grid>
	);
}
