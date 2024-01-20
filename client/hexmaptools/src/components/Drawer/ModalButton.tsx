import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import SvgIcon from "@mui/material/SvgIcon";


export function ModalButton({ title, onClick, Icon }: { title: string; onClick: () => void; Icon: typeof SvgIcon; }): JSX.Element {
	return (
		<ListItem>
			<ListItemButton onClick={onClick}>
				<Icon />
				{title}
			</ListItemButton>
		</ListItem>
	);
}
