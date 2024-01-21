import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";


export function ModalButton({ title, onClick }: { title: string; onClick: () => void; }): JSX.Element {
	return (
		<ListItem>
			<ListItemButton onClick={onClick}>
				{title}
			</ListItemButton>
		</ListItem>
	);
}
