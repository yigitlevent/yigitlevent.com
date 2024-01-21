import { IconButton } from "@mui/joy";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import SvgIcon from "@mui/material/SvgIcon";


interface DrawerButtonProps {
	title: string;
	callback: () => void;
	Icon: typeof SvgIcon;
	noText?: boolean;
	selected?: boolean;
}

export function DrawerButton({ title, callback, Icon, noText, selected }: DrawerButtonProps): JSX.Element {
	return (
		noText
			? <IconButton title={title} onClick={callback} sx={{ aspectRatio: "1/1" }} variant={selected ? "solid" : "plain"}>
				<Icon />
			</IconButton>
			: <ListItem>

				<ListItemButton title={title} onClick={callback}>
					<Icon sx={{ aspectRatio: "1/1" }} />

					<ListItemContent>
						<Typography level="title-sm">{title}</Typography>
					</ListItemContent>
				</ListItemButton>
			</ListItem>
	);
}
