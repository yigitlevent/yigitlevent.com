import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Box from "@mui/material/Box";
import Button, { ButtonProps } from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";


export function AbilityButton(props: ButtonProps): React.JSX.Element {
	const handle = (e: React.MouseEvent<HTMLButtonElement>, callback?: (event: React.MouseEvent<HTMLButtonElement>) => void): void => {
		e.preventDefault();
		if (callback) callback(e);
	};

	return (
		<Button
			{...props}
			size="small"
			variant="outlined"
			sx={{ minWidth: "30px", width: "30px", display: "inline-block", marginRight: 1, padding: 0 }}
			onClick={e => { handle(e, props.onClick); }}
			onContextMenu={e => { handle(e, props.onContextMenu); }}
		/>
	);
}


export function AbilityButtonWithArrows(props: ButtonProps): React.JSX.Element {
	const handle = (e: React.MouseEvent<HTMLButtonElement>, callback?: (event: React.MouseEvent<HTMLButtonElement>) => void): void => {
		e.preventDefault();
		if (callback) callback(e);
	};

	return (
		<Box
			sx={{
				display: "inline-grid",
				gridTemplateColumns: "30px",
				gridTemplateRows: "30px auto 30px"
			}}
		>
			<IconButton onClick={e => { handle(e, props.onClick); }}>
				<ArrowDropUpIcon />
			</IconButton>

			<Button
				{...props}
				size="small"
				variant="outlined"
				sx={{ minWidth: "30px", width: "30px", display: "inline-block", marginRight: 1 }}
				onClick={e => { handle(e, props.onClick); }}
				onContextMenu={e => { handle(e, props.onContextMenu); }}
			/>

			<IconButton onClick={e => { handle(e, props.onContextMenu); }}>
				<ArrowDropDownIcon />
			</IconButton>
		</Box>
	);
}
