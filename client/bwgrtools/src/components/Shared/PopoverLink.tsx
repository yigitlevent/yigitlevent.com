import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { MouseEvent, useState } from "react";


function GetSkillRestrictionString(skill: BwgrSkill): string {
	if (skill.restriction?.onlyStock) {
		const attribute = (skill.restriction.onlyWithAbility) ? ` with ${skill.restriction.onlyWithAbility[1]} ` : " ";
		const type = (skill.restriction.onlyAtBurn) ? " in character burning" : "";
		return `${skill.restriction.onlyStock[1]}${attribute}only${type}.`;
	}

	return "N/A";
}

function SkillPop({ skill }: { skill: BwgrSkill; }): React.JSX.Element {
	return (
		<Grid container spacing={1} columns={2}>
			<Grid size={{ xs: 2 }}>
				<Typography variant="h6">{skill.name}</Typography>
			</Grid>

			{skill.roots
				? <Grid size={{ xs: 2, md: 1 }}>
					<Typography variant="caption">Root: {skill.roots.map(v => v[1]).join("/")}</Typography>
				</Grid>
				: null}

			<Grid size={{ xs: 2, md: 1 }}>
				<Typography variant="caption">Type: {skill.type[1]}</Typography>
			</Grid>

			<Grid size={{ xs: 2 }}>
				<Typography variant="caption">Tools: {skill.tool.tool}{skill.tool.description ? ` ${skill.tool.description}` : ""}</Typography>
			</Grid>

			<Grid size={{ xs: 2 }}>
				<Typography variant="caption">Restrictions: {GetSkillRestrictionString(skill)}</Typography>
			</Grid>

			{skill.description
				? <Grid size={{ xs: 2 }}>
					{skill.description.split("<br>").map(v => <Typography key={v} variant="body2">{v}</Typography>)}
				</Grid>
				: null}
		</Grid>
	);
}

function TraitPop({ trait }: { trait: BwgrTrait; }): React.JSX.Element {
	return (
		<Grid container spacing={1} columns={3}>
			<Grid size={{ xs: 3 }}>
				<Typography variant="h6">{trait.name}</Typography>
			</Grid>

			<Grid size={{ sm: 3, md: 1 }}>
				<Typography variant="caption">Type: {trait.type[1]}</Typography>
			</Grid>

			{trait.cost !== 0
				? <Grid size={{ sm: 3, md: 1 }}>
					<Typography variant="caption">
						Cost: {trait.cost}
					</Typography>
				</Grid>
				: null}

			{trait.stock
				? <Grid size={{ sm: 3, md: 1 }}>
					<Typography variant="caption">Stock: {trait.stock[1]}</Typography>
				</Grid>
				: <Grid size={{ sm: 3, md: 1 }}>
					<Typography variant="caption">Stock: Any</Typography>
				</Grid>}

			{trait.description
				? <Grid size={{ xs: 3 }}>
					{trait.description.split("<br>").map(v => <Typography key={v} variant="body2" sx={{ textIndent: "8px" }}>{v}</Typography>)}
				</Grid>
				: null}
		</Grid>
	);
}

function Pop({ anchor, data, onClose }: { anchor: HTMLElement | null; data: BwgrSkill | BwgrTrait; onClose: () => void; }): React.JSX.Element {
	return (
		<Popover
			open={Boolean(anchor)}
			onClose={onClose}
			anchorEl={anchor}
			anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
			transformOrigin={{ vertical: "top", horizontal: "left" }}
		>
			<Grid container spacing={1} sx={{ maxWidth: "400px", padding: "12px 16px" }} columns={2}>
				{"flags" in data ? <SkillPop skill={data} /> : <TraitPop trait={data} />}
			</Grid>
		</Popover>
	);
}

export function PopoverLink({ data, noColor }: { data: BwgrSkill | BwgrTrait; noColor?: boolean; }): React.JSX.Element {
	const [anchor, setAnchor] = useState<HTMLElement | null>(null);

	const closePopover = (): void => { setAnchor(null); };
	const openPopover = (event: MouseEvent<HTMLElement>): void => {
		setAnchor(event.currentTarget);
	};

	return (
		<Link underline="hover" onMouseDown={openPopover} color={noColor ? "text.primary" : "primary.main"}>
			{data.name}
			<Pop anchor={anchor} data={data} onClose={closePopover} />
		</Link>
	);
}
