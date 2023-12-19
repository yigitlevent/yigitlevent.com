import Button, { ButtonProps } from "@mui/material/Button";


export function AbilityButton(props: ButtonProps): JSX.Element {
	const handle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, callback?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) => {
		e.preventDefault();
		if (callback) callback(e);
	};

	return (
		<Button
			{...props}
			size="small"
			variant="outlined"
			sx={{ minWidth: "30px", width: "30px", display: "inline-block", marginRight: 1 }}
			onClick={e => handle(e, props.onClick)}
			onContextMenu={e => handle(e, props.onContextMenu)}
		/>
	);
}
