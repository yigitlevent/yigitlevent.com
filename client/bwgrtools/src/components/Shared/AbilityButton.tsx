import Button, { ButtonProps } from "@mui/material/Button";


export function AbilityButton(props: ButtonProps): JSX.Element {
	const handle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
	};

	return <Button
		{...props}
		size="small"
		variant="outlined"
		sx={{ minWidth: "30px", width: "30px", display: "inline-block", marginRight: 1 }}
		onClick={e => { handle(e); if (props.onClick) props.onClick(e); }}
		onContextMenu={e => { handle(e); if (props.onContextMenu) props.onContextMenu(e); }}
	/>;
}
