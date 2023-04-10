import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { useRulesetStore } from "../../../hooks/apiStores/useRulesetStore";

import { PopoverLink } from "../../Shared/PopoverLink";


interface BlockTextProps {
	text: string;
	hasLeftPadding?: boolean;
}

export function BlockText({ text, hasLeftPadding }: BlockTextProps) {
	return (
		<Grid item>
			<Typography sx={{ paddingLeft: hasLeftPadding ? "10px" : undefined, paddingTop: "3px" }}>{text}</Typography>
		</Grid>
	);
}

interface BlockSkillPopoverProps {
	skillId: SkillId;
	checkbox?: {
		checked: boolean;
		disabled?: boolean;
		onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
	};
	deleteCallback?: () => void;
}

export function BlockSkillPopover({ skillId, checkbox, deleteCallback }: BlockSkillPopoverProps) {
	const { getSkill } = useRulesetStore();

	return (
		<Grid item>
			{checkbox
				? <Checkbox
					checked={checkbox.checked}
					disabled={checkbox.disabled}
					onChange={checkbox.onChange}
					sx={{ margin: "0 0 4px 0", padding: "0" }}
				/>
				: null
			}
			<Typography sx={{ cursor: "pointer", display: "inline-block", margin: "6px 0 0 8px" }}>
				<PopoverLink data={getSkill(skillId)} />
			</Typography>

			{deleteCallback
				? <IconButton color="primary" onClick={deleteCallback} sx={{ padding: 0, margin: "0 0 2px 6px" }}>
					<DeleteIcon />
				</IconButton>
				: null
			}
		</Grid>
	);
}

interface BlockTraitPopoverProps {
	traitId: TraitId;
	checkbox?: {
		checked: boolean;
		disabled?: boolean;
		onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
	};
	deleteCallback?: () => void;
}

export function BlockTraitPopover({ traitId, checkbox, deleteCallback }: BlockTraitPopoverProps) {
	const { getTrait } = useRulesetStore();

	return (
		<Grid item>
			{checkbox
				? <Checkbox
					checked={checkbox.checked}
					disabled={checkbox.disabled}
					onChange={checkbox.onChange}
					sx={{ margin: "0 0 4px 0", padding: "0" }}
				/>
				: null
			}
			<Typography sx={{ cursor: "pointer", display: "inline-block", margin: "6px 0 0 8px" }}>
				<PopoverLink data={getTrait(traitId)} />
			</Typography>

			{deleteCallback
				? <IconButton color="primary" onClick={deleteCallback} sx={{ padding: 0, margin: "0 0 2px 6px" }}>
					<DeleteIcon />
				</IconButton>
				: null
			}
		</Grid>
	);
}